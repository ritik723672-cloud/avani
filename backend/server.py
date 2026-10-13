from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
import aiosmtplib
from email.message import EmailMessage
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---- Email configuration (pluggable: smtp | resend | emergent) ----
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", "smtp").strip().lower()
ENQUIRY_RECIPIENT = os.environ["ENQUIRY_RECIPIENT_EMAIL"]
EMAIL_FROM = os.environ.get("EMAIL_FROM", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "AVANI Foundation")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

# Auto-reply (thank-you email to the visitor)
AUTOREPLY_FROM = os.environ.get("AUTOREPLY_FROM", "")
AUTOREPLY_REPLY_TO = os.environ.get("AUTOREPLY_REPLY_TO", "")

SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_TLS = os.environ.get("SMTP_TLS", "ssl").strip().lower()  # ssl (465) | starttls (587)
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_API_URL = "https://api.resend.com/emails"

# Legacy: only works when hosted on Emergent. Not needed for self-hosting.
EMERGENT_EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMERGENT_EMAIL_BASE_URL = "https://integrations.emergentagent.com"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r}")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r}")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r}")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r}")


async def _send_smtp(to: str, subject: str, html: str,
                     from_addr: str | None = None, reply_to: str | None = None) -> None:
    if not SMTP_HOST:
        raise HTTPException(status_code=500, detail="SMTP is not configured (SMTP_HOST missing)")
    sender = from_addr or EMAIL_FROM or SMTP_USER
    msg = EmailMessage()
    msg["From"] = f"{EMAIL_FROM_NAME} <{sender}>"
    msg["To"] = to
    msg["Subject"] = subject
    effective_reply_to = reply_to or EMAIL_REPLY_TO
    if effective_reply_to:
        msg["Reply-To"] = effective_reply_to
    msg.set_content("You received a new message from the AVANI Foundation website. Please view this message in an HTML-capable email client.")
    msg.add_alternative(html, subtype="html")
    try:
        if SMTP_TLS == "starttls":
            await aiosmtplib.send(msg, hostname=SMTP_HOST, port=SMTP_PORT,
                                  username=SMTP_USER, password=SMTP_PASSWORD, start_tls=True)
        else:
            await aiosmtplib.send(msg, hostname=SMTP_HOST, port=SMTP_PORT,
                                  username=SMTP_USER, password=SMTP_PASSWORD, use_tls=True)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"SMTP send failed (from={sender}): {str(e)}")
        raise HTTPException(status_code=502, detail="Failed to send email")


async def _send_resend(to: str, subject: str, html: str,
                       from_addr: str | None = None, reply_to: str | None = None) -> str | None:
    sender = from_addr or EMAIL_FROM
    if not RESEND_API_KEY or not sender:
        raise HTTPException(status_code=500, detail="Resend is not configured (RESEND_API_KEY / EMAIL_FROM missing)")
    payload = {
        "from": f"{EMAIL_FROM_NAME} <{sender}>",
        "to": [to],
        "subject": subject,
        "html": html,
    }
    effective_reply_to = reply_to or EMAIL_REPLY_TO
    if effective_reply_to:
        payload["reply_to"] = effective_reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                RESEND_API_URL,
                headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Resend send failed: {str(e)}")
        raise HTTPException(status_code=502, detail="Failed to send email")


async def _send_emergent(to: str, subject: str, html: str) -> str | None:
    if not EMERGENT_EMAIL_KEY:
        raise HTTPException(status_code=500, detail="Emergent email is not configured (EMERGENT_EMAIL_KEY missing)")
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMERGENT_EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMERGENT_EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Emergent email send failed: {str(e)}")
        raise HTTPException(status_code=502, detail="Failed to send email")


async def send_email(*, to: str, subject: str, html: str,
                     from_email: str | None = None, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    if EMAIL_BACKEND == "smtp":
        await _send_smtp(to, subject, html, from_addr=from_email, reply_to=reply_to)
        return None
    if EMAIL_BACKEND == "resend":
        return await _send_resend(to, subject, html, from_addr=from_email, reply_to=reply_to)
    if EMAIL_BACKEND == "emergent":
        return await _send_emergent(to, subject, html)
    raise HTTPException(status_code=500, detail=f"Unknown EMAIL_BACKEND: {EMAIL_BACKEND}")


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    organisation: Optional[str] = Field(default="", max_length=160)
    interest: str = Field(default="General enquiry", max_length=80)
    message: str = Field(min_length=10, max_length=3000)


def _enquiry_html(p: EnquiryCreate) -> str:
    rows = "".join(
        f'<tr><td style="padding:8px 16px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a9a94;width:140px">{label}</td>'
        f'<td style="padding:8px 16px;font-size:14px;color:#1C2826">{escape(value)}</td></tr>'
        for label, value in [
            ("Name", p.name),
            ("Email", p.email),
            ("Organisation", p.organisation or "—"),
            ("Interest", p.interest),
        ]
    )
    msg = escape(p.message).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EB;padding:32px 0;font-family:Arial,sans-serif">'
        '<tr><td align="center"><table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5dfd0">'
        '<tr><td style="background:#0F2E23;padding:24px 32px">'
        '<span style="color:#D4AF37;font-size:17px;letter-spacing:0.24em">AVANI FOUNDATION</span><br>'
        '<span style="color:#FDFBF7;font-size:12px">New website enquiry</span></td></tr>'
        f'<tr><td style="padding:16px 16px 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}</table></td></tr>'
        '<tr><td style="padding:12px 32px 20px">'
        '<p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8a9a94;margin:0 0 6px">Message</p>'
        f'<p style="font-size:14px;line-height:1.65;color:#1C2826;margin:0">{msg}</p></td></tr>'
        '<tr><td style="padding:14px 32px;border-top:1px solid #eee7d6;font-size:11px;color:#8a9a94">'
        f'Sent by the AVANI Foundation website contact form. You can reply directly to {escape(p.email)}.'
        '</td></tr></table></td></tr></table>'
    )


def _confirmation_html(name: str) -> str:
    n = escape(name)
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EB;padding:32px 0;font-family:Arial,sans-serif">'
        '<tr><td align="center"><table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5dfd0">'
        '<tr><td style="background:#0F2E23;padding:24px 32px">'
        '<span style="color:#D4AF37;font-size:17px;letter-spacing:0.24em">AVANI FOUNDATION</span><br>'
        '<span style="color:#FDFBF7;font-size:12px">Advancing Vision, Ambition and New Independence</span></td></tr>'
        '<tr><td style="padding:28px 32px">'
        f'<p style="font-size:15px;color:#1C2826;margin:0 0 14px">Dear {n},</p>'
        '<p style="font-size:14px;line-height:1.7;color:#1C2826;margin:0 0 14px">'
        'Thank you for reaching out to AVANI Foundation. We have successfully received your enquiry '
        'and appreciate your interest in supporting women\'s empowerment and inclusive development.</p>'
        '<p style="font-size:14px;line-height:1.7;color:#1C2826;margin:0 0 14px">'
        'Our team will review your message and get back to you if a response is required.</p>'
        '<p style="font-size:14px;line-height:1.7;color:#1C2826;margin:0">'
        'Thank you for being part of our journey towards creating meaningful opportunities and lasting impact.</p>'
        '</td></tr>'
        '<tr><td style="padding:20px 32px;border-top:1px solid #eee7d6">'
        '<p style="font-size:14px;color:#1C2826;margin:0">Warm regards,<br>'
        '<strong>AVANI Foundation</strong><br>'
        '<span style="color:#52635E">Uttar Pradesh, India<br>hello@avanifoundation.org</span></p>'
        '</td></tr></table></td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "AVANI Foundation API"}


@api_router.post("/enquiries")
async def create_enquiry(payload: EnquiryCreate):
    enquiry_id = str(uuid.uuid4())
    doc = {
        "id": enquiry_id,
        "name": payload.name,
        "email": payload.email,
        "organisation": payload.organisation or "",
        "interest": payload.interest,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "confirmation_sent": False,
    }
    await db.enquiries.insert_one(doc)

    # 1) Notify the foundation inbox
    email_sent = True
    try:
        await send_email(
            to=ENQUIRY_RECIPIENT,
            subject=f"New enquiry ({payload.interest}) — AVANI Foundation",
            html=_enquiry_html(payload),
        )
    except HTTPException as e:
        email_sent = False
        logger.error(f"Enquiry {enquiry_id} stored but owner email failed: {e.detail}")

    # 2) Auto-reply to the visitor (exactly once per enquiry)
    confirmation_sent = False
    confirmation_from = None
    preferred_from = AUTOREPLY_FROM or EMAIL_FROM or SMTP_USER
    reply_to = AUTOREPLY_REPLY_TO or EMAIL_REPLY_TO
    try:
        confirmation_from = preferred_from
        await send_email(
            to=payload.email,
            subject="Thank You for Contacting AVANI Foundation",
            html=_confirmation_html(payload.name),
            from_email=preferred_from,
            reply_to=reply_to,
        )
        confirmation_sent = True
    except HTTPException as e:
        logger.warning(
            f"Auto-reply as {preferred_from} failed ({e.detail}); "
            f"retrying with the authenticated mailbox"
        )
        fallback_from = EMAIL_FROM or SMTP_USER
        if fallback_from and fallback_from != preferred_from:
            try:
                confirmation_from = fallback_from
                await send_email(
                    to=payload.email,
                    subject="Thank You for Contacting AVANI Foundation",
                    html=_confirmation_html(payload.name),
                    from_email=fallback_from,
                    reply_to=reply_to,
                )
                confirmation_sent = True
            except HTTPException as e2:
                logger.error(f"Auto-reply for enquiry {enquiry_id} failed: {e2.detail}")

    if confirmation_sent:
        await db.enquiries.update_one(
            {"id": enquiry_id},
            {"$set": {"confirmation_sent": True, "confirmation_from": confirmation_from}},
        )

    return {
        "status": "success",
        "id": enquiry_id,
        "email_sent": email_sent,
        "confirmation_sent": confirmation_sent,
        "confirmation_from": confirmation_from,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
