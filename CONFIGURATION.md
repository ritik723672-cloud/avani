# Configuration Reference — which file holds which setting

## Secrets & runtime config (never commit real values)

| File | Contains |
|---|---|
| `backend/.env` | ALL runtime secrets and settings: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `ENQUIRY_RECIPIENT_EMAIL`, `EMAIL_BACKEND`, `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `AUTOREPLY_FROM`, `AUTOREPLY_REPLY_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_TLS`, `SMTP_USER`, `SMTP_PASSWORD`, `RESEND_API_KEY`, optional `ENQUIRY_RATE_LIMIT` / `ENQUIRY_RATE_WINDOW` |
| `frontend/.env` | `REACT_APP_BACKEND_URL` only — the public API origin, baked in at build time |

Templates with placeholders (safe to commit): `backend/.env.example`, `frontend/.env.example`.

## Email behaviour (backend/server.py reads these from backend/.env)

| Setting | Current value | Meaning |
|---|---|---|
| `EMAIL_BACKEND` | `smtp` | `smtp` = your own mail server (Hostinger). `resend` = Resend API. |
| `EMAIL_FROM` | `data@avanifoundation.org` | Sender of enquiry notification emails |
| `ENQUIRY_RECIPIENT_EMAIL` | `hello@avanifoundation.org` | Inbox that receives enquiries |
| `EMAIL_REPLY_TO` | `hello@avanifoundation.org` | Reply-To on enquiry notifications |
| `AUTOREPLY_FROM` | `hello@avanifoundation.org` | Sender of the visitor thank-you email. Must be authorized by your mail provider; if a send fails, the backend automatically falls back to `EMAIL_FROM` |
| `AUTOREPLY_REPLY_TO` | `data@avanifoundation.org` | Reply-To on the visitor thank-you email |
| `SMTP_*` | Hostinger | smtp.hostinger.com : 465, `SMTP_TLS=ssl` |

## Site content (frontend source)

| File | Contains |
|---|---|
| `frontend/src/data/site.js` | All section text, focus areas, nav links, image paths (`/assets/...`), contact email/location/Instagram |
| `frontend/src/components/Donate.jsx` | Donation details — `BANK` object (account name/number/IFSC/branch) and `UPI_ID` constant at the top of the file |
| `frontend/public/assets/` | All images (logo, photos, og-image, icons) — 100% local |
| `frontend/public/index.html` | SEO meta, Open Graph, JSON-LD |
| `frontend/public/robots.txt`, `sitemap.xml`, `llms.txt` | Crawler files |

## Infrastructure

| File | Contains |
|---|---|
| `deploy/nginx-avani.conf` | Nginx site config (static frontend + `/api` proxy) |
| `deploy/avani-backend.service` | systemd unit (runs backend as user `avani`) |
| `scripts/backup_db.sh` | MongoDB backup (mongodump + tar, keeps last 14) |
| `scripts/restore_db.sh` | MongoDB restore |

## Rule of thumb

- Passwords/keys → `backend/.env` only. Nowhere else.
- Text/photos/bank details → `frontend/src/data/site.js` or the relevant component.
- Server behaviour → `deploy/` files.
