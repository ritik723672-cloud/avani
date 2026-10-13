# AVANI Foundation — VPS Deployment Guide

Complete guide to self-host the AVANI Foundation website (React frontend + FastAPI backend + MongoDB) on your own VPS, independent of Emergent.

---

## 1. Architecture

| Layer | Tech | Port |
|---|---|---|
| Frontend | React (CRA + craco), Tailwind, framer-motion, lenis | Static build served by Nginx |
| Backend | FastAPI (uvicorn) | 127.0.0.1:8001 |
| Database | MongoDB | 127.0.0.1:27017 |
| Email | SMTP **or** Resend (your own domain) | — |

All backend routes are prefixed with `/api`. Nginx serves the built frontend and proxies `/api` to the backend — one domain, no CORS pain.

## 2. Emergent dependencies — what changed

| Emergent service | Status |
|---|---|
| Emergent managed email proxy | **Removed.** Email now uses your own SMTP or Resend account (`EMAIL_BACKEND=smtp\|resend`). An `emergent` mode remains in code but is optional and only works on Emergent — leave it unused on your VPS. |
| Emergent-hosted images (customer-assets CDN) | **Removed.** All photos are bundled locally in `frontend/public/assets/`. |
| `@emergentbase/overlay`, `@emergentbase/visual-edits` dev packages | **Removed** from `package.json`. They were dev-preview-only; `craco.config.js` already skips them when absent. |
| `EMERGENT_LLM_KEY` | Only used by `/app/scripts/gen_donate_image.py` (one-off art generation). Not needed at runtime. Delete that script if you want zero references. |
| MongoDB | Standard local/self-hosted MongoDB — no Emergent dependency. |

Secrets: no API keys or passwords are hardcoded in source. Real values live only in `.env` files, which are git-ignored (see `/app/.gitignore`). If you exported the project with an existing `backend/.env`, it may contain an Emergent-managed key — delete that file on your VPS and create a fresh one from `.env.example`.

## 3. Prerequisites

- Ubuntu 22.04/24.04 VPS (1 GB RAM minimum, 2 GB recommended)
- A domain, e.g. `avanifoundation.org`, with DNS A records pointing to your VPS IP:
  - `avanifoundation.org → <VPS-IP>`
  - `www.avanifoundation.org → <VPS-IP>`

## 4. Server setup (one time)

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 + Yarn
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g yarn

# Python 3.11+
sudo apt install -y python3 python3-venv python3-pip

# MongoDB 7 (Ubuntu 24.04; for 22.04 use the jammy repo)
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl enable --now mongod

# Nginx + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx
```

## 5. Deploy the code

Upload the exported project to your VPS (e.g. `scp`, `git clone`, or rsync) to `/opt/avani`:

```bash
sudo mkdir -p /opt/avani
sudo chown $USER:$USER /opt/avani
# copy the project here so you have /opt/avani/backend and /opt/avani/frontend
```

### Backend

```bash
cd /opt/avani/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
nano .env   # fill in real values (see section 7)
```

Test-run once:

```bash
source venv/bin/activate
uvicorn server:app --host 127.0.0.1 --port 8001
# in another terminal: curl http://127.0.0.1:8001/api/
# expected: {"message":"AVANI Foundation API"}
```

### Frontend

```bash
cd /opt/avani/frontend
cp .env.example .env
nano .env   # set REACT_APP_BACKEND_URL=https://avanifoundation.org

yarn install
yarn build
# output goes to /opt/avani/frontend/build
```

> `REACT_APP_BACKEND_URL` is baked in at build time. If you change it, run `yarn build` again.

## 6. Run the backend with systemd

```bash
sudo tee /etc/systemd/system/avani-backend.service > /dev/null <<'EOF'
[Unit]
Description=AVANI Foundation API
After=network.target mongod.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/avani/backend
ExecStart=/opt/avani/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now avani-backend
sudo systemctl status avani-backend
```

## 7. Environment variables

All variables are documented with placeholders in `backend/.env.example` and `frontend/.env.example`.

**backend/.env**

| Variable | Purpose |
|---|---|
| `MONGO_URL` | MongoDB connection string, default `mongodb://localhost:27017` |
| `DB_NAME` | Database name, e.g. `avani_foundation` |
| `CORS_ORIGINS` | Allowed origins, e.g. `https://avanifoundation.org` |
| `ENQUIRY_RECIPIENT_EMAIL` | Inbox that receives enquiries, e.g. `hello@avanifoundation.org` |
| `EMAIL_BACKEND` | `smtp` or `resend` |
| `EMAIL_FROM` / `EMAIL_FROM_NAME` / `EMAIL_REPLY_TO` | Sender identity, e.g. `data@avanifoundation.org` / `AVANI Foundation` / reply-to `hello@avanifoundation.org` |
| `SMTP_HOST` `SMTP_PORT` `SMTP_TLS` `SMTP_USER` `SMTP_PASSWORD` | Your mail provider's SMTP settings (`SMTP_TLS=ssl` for port 465, `starttls` for 587) |
| `RESEND_API_KEY` | Only if `EMAIL_BACKEND=resend` |
| `AUTOREPLY_FROM` / `AUTOREPLY_REPLY_TO` | Sender / reply-to of the automatic thank-you email to visitors. With SMTP the provider must authorize `AUTOREPLY_FROM` (otherwise the backend falls back to `EMAIL_FROM` automatically) |

**frontend/.env** — only `REACT_APP_BACKEND_URL`.

Lock down permissions:

```bash
chmod 600 /opt/avani/backend/.env /opt/avani/frontend/.env
```

## 8. Email setup — two options

### Option A: SMTP (any provider for avanifoundation.org)

Use your domain's mail hosting (Zoho Mail, Google Workspace, your VPS panel's mail, Brevo, Amazon SES…). Example for a typical provider on port 465:

```env
EMAIL_BACKEND="smtp"
SMTP_HOST="smtp.zoho.com"
SMTP_PORT="465"
SMTP_TLS="ssl"
SMTP_USER="hello@avanifoundation.org"
SMTP_PASSWORD="<mailbox-password-or-app-password>"
EMAIL_FROM="hello@avanifoundation.org"
```

Restart after changes: `sudo systemctl restart avani-backend`.

### Option B: Resend with your own domain

1. Sign up at https://resend.com → Domains → Add `avanifoundation.org`
2. Add the DNS records Resend shows (SPF/DKIM) at your DNS provider, wait for "Verified"
3. Create an API key, then:

```env
EMAIL_BACKEND="resend"
RESEND_API_KEY="re_xxxxxxxx"
EMAIL_FROM="hello@avanifoundation.org"
```

## 9. Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/avani
```

```nginx
server {
    listen 80;
    server_name avanifoundation.org www.avanifoundation.org;

    root /opt/avani/frontend/build;
    index index.html;

    # Frontend (SPA): always fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Long cache for static assets
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Enable and start:

```bash
sudo ln -s /etc/nginx/sites-available/avani /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 10. HTTPS (free, Let's Encrypt)

```bash
sudo certbot --nginx -d avanifoundation.org -d www.avanifoundation.org
# follow the prompts; certbot edits the Nginx config and sets up auto-renewal
sudo certbot renew --dry-run   # verify auto-renewal works
```

## 11. Database schema & migrations

MongoDB is schemaless — **no migrations are needed**. The database and collections are created automatically on first write.

Collection: `enquiries`

| Field | Type | Notes |
|---|---|---|
| `id` | string (UUID) | app-generated primary identifier |
| `name` | string | 2–120 chars |
| `email` | string | validated email |
| `organisation` | string | optional |
| `interest` | string | e.g. "Partnership / CSR" |
| `message` | string | 10–3000 chars |
| `created_at` | string | ISO-8601 UTC timestamp |

Useful queries:

```bash
mongosh avani_foundation
> db.enquiries.find().sort({created_at:-1}).limit(10)
> db.enquiries.countDocuments()
```

Every enquiry is stored in MongoDB even if email delivery fails, so nothing is ever lost.

## 12. Testing after deployment

1. **Backend health**
   ```bash
   curl https://avanifoundation.org/api/
   # {"message":"AVANI Foundation API"}
   ```
2. **Contact form end-to-end** (also sends a real email):
   ```bash
   curl -X POST https://avanifoundation.org/api/enquiries \
     -H "Content-Type: application/json" \
     -d '{"name":"Deploy Test","email":"you@example.com","organisation":"Test","interest":"General enquiry","message":"Testing the deployed contact form email."}'
   # expected: {"status":"success","id":"...","email_sent":true}
   ```
3. Check the recipient inbox (`ENQUIRY_RECIPIENT_EMAIL`) — the enquiry email should arrive within seconds. Also confirm it landed in MongoDB with the `mongosh` query above.
4. If `email_sent` is `false`, read the backend log:
   ```bash
   journalctl -u avani-backend -n 100 --no-pager
   ```
   Common causes: wrong SMTP password/port, `SMTP_TLS` mismatch (ssl vs starttls), unverified Resend domain.
5. Open the website, submit the real contact form, and confirm the success toast + inbox delivery.

## 13. Updating & restarting

```bash
# Backend changes
sudo systemctl restart avani-backend
journalctl -u avani-backend -f      # live logs

# Frontend changes
cd /opt/avani/frontend && yarn build && sudo systemctl reload nginx
```

## 14. Security checklist

- [ ] `.env` files are `chmod 600` and never committed (`.gitignore` already covers them)
- [ ] `CORS_ORIGINS` set to your real domain(s), not `*`
- [ ] UFW firewall: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`
- [ ] MongoDB is bound to localhost only (default) — do not expose port 27017
- [ ] SMTP password is an app-password where supported (Gmail/Zoho)
