# AVANI Foundation — VPS Deployment Guide

Complete, tested guide to self-host the AVANI Foundation website (React frontend + FastAPI backend + MongoDB) on your own VPS, fully independent of Emergent.

Companion docs: **CONFIGURATION.md** (which file holds which setting) · **CHECKLIST.md** (final testing checklist) · **README.md** (quick start)

---

## 1. Architecture

| Layer | Tech | Where it runs |
|---|---|---|
| Frontend | React (CRA + craco), Tailwind, framer-motion, Lenis | Static build in `frontend/build`, served by Nginx |
| Backend | FastAPI + uvicorn, aiosmtplib (SMTP), httpx (Resend) | `127.0.0.1:8001`, systemd service `avani-backend`, user `avani` |
| Database | MongoDB | `127.0.0.1:27017` (localhost only) |
| Email | Hostinger SMTP (or Resend) via env vars | — |

All backend routes are prefixed with `/api`. Nginx serves the frontend and proxies `/api` to the backend — one domain, no CORS issues.

## 2. Emergent dependencies — status

| Emergent service | Status |
|---|---|
| Emergent managed email proxy | **Removed from the live path.** Email sends via your Hostinger SMTP (`EMAIL_BACKEND=smtp`). A legacy `emergent` mode still exists in `server.py` but is never used on your VPS — to delete it entirely, remove the `_send_emergent` function and the `EMERGENT_EMAIL_*` constants |
| Emergent-hosted images | **Removed.** All images are local in `frontend/public/assets/` (verified: zero external image URLs) |
| `@emergentbase/*` dev packages | **Removed** from `package.json`; `yarn build` verified without them |
| `EMERGENT_LLM_KEY` | Only used by `scripts/gen_donate_image.py` (a one-off art generator). Not needed at runtime — delete the script and the key if you want zero references |
| MongoDB | Plain self-hosted MongoDB — no Emergent dependency |

Secrets: nothing is hardcoded. Real values live only in `.env` files (git-ignored). If your exported copy contains an existing `backend/.env`, review it on the VPS and keep it private — or recreate it from `backend/.env.example`.

## 3. Prerequisites

- Ubuntu 22.04 or 24.04 VPS (1 GB RAM min, 2 GB recommended)
- Domain DNS A records pointing to your VPS IP:
  - `avanifoundation.org → <VPS-IP>`
  - `www.avanifoundation.org → <VPS-IP>`

## 4. Getting the code out of Emergent

- **Paid plan (recommended):** Chat input bar → **Save** → **Save to GitHub** → pick your repo/branch → then on the VPS: `git clone <repo-url> /opt/avani`
- **Any plan:** Top toolbar **Code** button → open the browser VS Code → copy the project files manually
- The code contains no Emergent lock-in: it is a standard React + FastAPI + MongoDB project

## 5. Server setup (one time)

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 + Yarn
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g yarn

# Python 3
sudo apt install -y python3 python3-venv python3-pip

# MongoDB 7
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl enable --now mongod

# Nginx + Certbot
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Dedicated non-root application user

```bash
sudo useradd -r -s /usr/sbin/nologin -d /opt/avani avani
sudo mkdir -p /opt/avani
```

Copy the project into `/opt/avani` (so you have `/opt/avani/backend`, `/opt/avani/frontend`, etc.), then:

```bash
sudo chown -R avani:avani /opt/avani
sudo chmod -R o-rwx /opt/avani/backend   # backend code+env readable only by avani
sudo chmod 755 /opt /opt/avani /opt/avani/frontend  # let Nginx reach the frontend build
```

## 6. Backend setup

```bash
sudo -u avani bash -c '
  cd /opt/avani/backend
  python3 -m venv venv
  venv/bin/pip install -r requirements.txt
  cp .env.example .env
'
sudo -u avani nano /opt/avani/backend/.env   # fill real values (section 8)
sudo -u avani chmod 600 /opt/avani/backend/.env
```

Quick smoke test:

```bash
sudo -u avani /opt/avani/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001 --app-dir /opt/avani/backend &
curl http://127.0.0.1:8001/api/
# expected: {"message":"AVANI Foundation API"}  — then Ctrl/C / kill the process
```

## 7. Frontend build

```bash
sudo -u avani bash -c '
  cd /opt/avani/frontend
  cp .env.example .env
'
sudo -u avani nano /opt/avani/frontend/.env   # REACT_APP_BACKEND_URL=https://avanifoundation.org

sudo -u avani bash -c 'cd /opt/avani/frontend && yarn install && yarn build'
# output: /opt/avani/frontend/build
```

> `REACT_APP_BACKEND_URL` is baked in at build time. Change it → run `yarn build` again.

## 8. Environment variables

All placeholders are in `backend/.env.example` and `frontend/.env.example`. See **CONFIGURATION.md** for the full reference. Key values for your Hostinger setup:

```env
EMAIL_BACKEND="smtp"
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_TLS="ssl"
SMTP_USER="data@avanifoundation.org"
SMTP_PASSWORD="<your Hostinger mailbox password>"
EMAIL_FROM="data@avanifoundation.org"
EMAIL_FROM_NAME="AVANI Foundation"
EMAIL_REPLY_TO="hello@avanifoundation.org"
ENQUIRY_RECIPIENT_EMAIL="hello@avanifoundation.org"
AUTOREPLY_FROM="hello@avanifoundation.org"
AUTOREPLY_REPLY_TO="data@avanifoundation.org"
```

**Sender authorization note:** the visitor thank-you email uses `AUTOREPLY_FROM` (`hello@`) as sender. This was tested and Hostinger accepted it (both mailboxes on the same account). If your provider ever rejects it, the backend automatically falls back to sending from `EMAIL_FROM` (`data@`) and logs a warning — no mail is lost. To make `hello@` a permanent authorized sender, ensure the mailbox exists in Hostinger (hPanel → Emails) or is an alias of the `data@` account.

Apply changes with: `sudo systemctl restart avani-backend`

## 9. systemd service

```bash
sudo cp /opt/avani/deploy/avani-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now avani-backend
sudo systemctl status avani-backend
```

## 10. Nginx

```bash
sudo cp /opt/avani/deploy/nginx-avani.conf /etc/nginx/sites-available/avani
sudo ln -s /etc/nginx/sites-available/avani /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 11. HTTPS (free, Let's Encrypt)

```bash
sudo certbot --nginx -d avanifoundation.org -d www.avanifoundation.org
sudo certbot renew --dry-run
```

## 12. Database — schema, backup, restore

MongoDB is schemaless — **no migrations needed**; the DB and collection are created on first write.

Collection `enquiries`: `id` (uuid), `name`, `email`, `organisation`, `interest`, `message`, `created_at` (ISO UTC), `confirmation_sent`, `confirmation_from`.

Every enquiry is stored **before** any email is attempted, so nothing is lost if email fails.

```bash
# Inspect
mongosh avani_foundation --eval 'db.enquiries.find().sort({created_at:-1}).limit(10)'

# Backup (keeps last 14 archives in /opt/avani/backups)
chmod +x /opt/avani/scripts/backup_db.sh /opt/avani/scripts/restore_db.sh
/opt/avani/scripts/backup_db.sh

# Daily 3 AM backup via cron
sudo crontab -e
# add:  0 3 * * * /opt/avani/scripts/backup_db.sh >> /var/log/avani-backup.log 2>&1

# Export to move data to another server
/opt/avani/scripts/backup_db.sh && scp /opt/avani/backups/avani-*.tar.gz user@other-server:/opt/avani/backups/

# Restore (WARNING: replaces existing collections)
/opt/avani/scripts/restore_db.sh /opt/avani/backups/avani-avani_foundation-<timestamp>.tar.gz
```

## 13. Testing after deployment

```bash
# 1. Backend health
curl https://avanifoundation.org/api/
# {"message":"AVANI Foundation API"}

# 2. Contact form end-to-end (sends both emails)
curl -X POST https://avanifoundation.org/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Test","email":"you@example.com","organisation":"Test","interest":"General enquiry","message":"Testing the deployed contact form."}'
# expected: {"status":"success",...,"email_sent":true,"confirmation_sent":true}

# 3. Check both inboxes: hello@ gets the enquiry, you@example.com gets the thank-you

# 4. Confirm it was stored
mongosh avani_foundation --eval 'db.enquiries.find().sort({created_at:-1}).limit(1)'

# 5. Logs if email_sent or confirmation_sent is false
journalctl -u avani-backend -n 100 --no-pager
```

Common causes: wrong `SMTP_PASSWORD`, `SMTP_TLS` mismatch (`ssl` for 465 / `starttls` for 587), or provider blocking the sender address.

## 14. Updating & restarting

```bash
# Backend code/config changes
sudo systemctl restart avani-backend
journalctl -u avani-backend -f        # live logs

# Frontend changes
sudo -u avani bash -c 'cd /opt/avani/frontend && yarn build'
sudo systemctl reload nginx

# Troubleshooting
sudo systemctl status avani-backend   # service state
sudo nginx -t                         # nginx config check
sudo tail -f /var/log/nginx/error.log # nginx errors
mongod --version && sudo systemctl status mongod
```

## 15. Production security checklist

- [ ] Backend runs as non-root user `avani` (systemd unit provided)
- [ ] `backend/.env` and `frontend/.env` are `chmod 600`, owned by `avani`, never committed (`.gitignore` covers them)
- [ ] `CORS_ORIGINS` set to `https://avanifoundation.org,https://www.avanifoundation.org` (not `*`)
- [ ] UFW: `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`
- [ ] MongoDB bound to localhost only (default) — port 27017 never exposed
- [ ] HTTPS via certbot, auto-renewal verified
- [ ] Spam protection active (built in): honeypot field + 5 submissions/hour/IP rate limit (tunable via `ENQUIRY_RATE_LIMIT` / `ENQUIRY_RATE_WINDOW`)
- [ ] Daily DB backup cron enabled
