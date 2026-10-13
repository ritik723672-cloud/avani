# Final Testing Checklist — AVANI Foundation

Legend: ✅ verified in the Emergent preview environment · 🖥️ must be run on your VPS after deployment

## Build & startup

- ✅ `yarn build` completes successfully (production build, no Emergent packages needed)
- ✅ Backend starts and `GET /api/` returns `{"message":"AVANI Foundation API"}`
- 🖥️ `sudo systemctl status avani-backend` shows active (running) as user `avani`
- 🖥️ `sudo nginx -t` passes; site loads over HTTPS

## Contact form & email

- ✅ Valid enquiry → saved in MongoDB, owner email to `hello@avanifoundation.org` sent (`email_sent:true`)
- ✅ Visitor auto-reply sent from `hello@avanifoundation.org` (`confirmation_sent:true`, `confirmation_from:hello@avanifoundation.org`)
- ✅ Emails sent via Hostinger SMTP (`smtp.hostinger.com:465`, SSL) — zero Emergent-proxy calls
- ✅ Enquiry stays saved even if email delivery fails (DB insert happens before sending)
- 🖥️ Submit the real form on your domain and confirm both inboxes receive mail

## Spam protection

- ✅ Honeypot field: submission with the hidden `website` field filled is silently dropped (not stored, no emails)
- ✅ Rate limit: more than 5 submissions per hour per IP → HTTP 429

## Database

- ✅ `enquiries` collection stores id, name, email, organisation, interest, message, created_at, confirmation_sent
- 🖥️ `scripts/backup_db.sh` produces a `.tar.gz` in `/opt/avani/backups`
- 🖥️ `scripts/restore_db.sh <file>` restores into MongoDB (test once on a scratch DB)

## SEO

- ✅ Title, description, canonical, OG/Twitter cards, JSON-LD in page source
- ✅ `/robots.txt`, `/sitemap.xml`, `/llms.txt` served as real files (correct content types)
- ✅ `/donate` has its own title/description/canonical
- 🖥️ After go-live: verify tags on `https://avanifoundation.org`, submit sitemap in Google Search Console, test a share in Facebook Sharing Debugger

## Security

- ✅ No credentials in source code or docs (placeholders only); secrets only in `backend/.env` (git-ignored)
- 🖥️ `.env` files `chmod 600`, owned by `avani`
- 🖥️ UFW firewall on; MongoDB bound to localhost; `CORS_ORIGINS` set to your real domain
