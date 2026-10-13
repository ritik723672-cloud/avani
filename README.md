# AVANI Foundation Website

**Advancing Vision, Ambition and New Independence** — official website of AVANI Foundation, a women's empowerment initiative in Uttar Pradesh, India.

## Stack

- **Frontend**: React (CRA + craco), Tailwind CSS, framer-motion, Lenis smooth scrolling
- **Backend**: FastAPI (Python), contact-form enquiries stored in MongoDB and emailed to the foundation inbox
- **Database**: MongoDB (schemaless, auto-created — no migrations)
- **Email**: pluggable — your own SMTP server or Resend (see `backend/.env.example`)

## Project layout

```
backend/            FastAPI app (server.py), requirements.txt, .env(.example)
frontend/           React app (src/), public/assets/ (all images, local)
DEPLOYMENT.md       Full self-hosting / VPS deployment guide
scripts/            One-off utilities (not needed at runtime)
```

## Quick start (development)

```bash
# Backend
cd backend && python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in values
uvicorn server:app --host 127.0.0.1 --port 8001 --reload

# Frontend (new terminal)
cd frontend
cp .env.example .env   # set REACT_APP_BACKEND_URL=http://127.0.0.1:8001
yarn install && yarn start
```

## Production / VPS deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** — covers installation, build, environment setup, Nginx, HTTPS, email configuration, database schema, testing and restarts.

## Security

No API keys or passwords are stored in source code. All secrets live in `.env` files, which are git-ignored. Use `.env.example` files as templates.
