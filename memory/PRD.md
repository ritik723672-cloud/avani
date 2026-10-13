# AVANI Foundation — Website PRD

## Original Problem Statement
Single-page website for AVANI Foundation ("Advancing Vision, Ambition and New Independence") — a women's empowerment initiative in Uttar Pradesh, India. Sections: Home (hero + Confidence→Capability→Career approach), About (Who We Are, Vision, Mission), 7 Focus Areas (incl. Women's Nutrition & Food Literacy), Who We Aim to Support, Programmes (pilot-first model), Partner With AVANI, Get Involved, Contact (hello@avanifoundation.org, Uttar Pradesh, India), Meet the Founder (Mani Pandey — Oxford, Symbiosis MBA, UN Women India, G20 EMPOWER), footer. Fonts: Cormorant Garamond headings (uppercase), Inter body/nav/buttons, Cormorant Garamond Italic highlights. User supplied 5 images (logo, hero girls-at-laptop, founder Oxford portrait, founder community event, women's circle).

## User Personas
- Potential partners (CSR teams, government, universities, NGOs)
- Mentors, trainers, volunteers
- Women and girls seeking skills/opportunities (and their communities)
- Foundation owner (Mani Pandey) receiving enquiries

## Core Requirements (static)
- Single-page scrolling site, smooth anchor navigation (Lenis)
- Editorial luxury aesthetic: deep forest green #0F2E23, warm ivory #FDFBF7, gold #D4AF37
- Kinetic hero with masked line-by-line reveal + parallax arch image
- Slow editorial marquee; framer-motion scroll reveals throughout
- Contact/enquiry form → POST /api/enquiries → store in MongoDB + email to data@avanifoundation.org (Emergent managed Resend)
- No admin panel (user choice); no authentication

## Implemented (2026-07-11)
- Full single-page site: Navbar (glass, mobile menu), Hero (masked reveal, parallax, arch-framed user photo, approach badge), Marquee, Approach (3 stages), About (Vision/Mission cards + women's circle photo), Focus Areas (7-item interactive accordion), Who We Support (6 cards), Programmes (dark section, 6 initiatives), Founder (dual photos, credentials), Partner + Get Involved panels, Contact form + details, Footer
- Backend: POST /api/enquiries (validation, MongoDB storage, server-side HTML email via Emergent managed Resend with guardrail gate), GET /api/ health
- Favicon: original SVG leaf/star mark; page title + meta description
- data-testid on all interactive elements

## Iteration 2 (2026-07-11)
- Headings switched to Playfair Display (reference-site look), body stays Inter
- Hero image replaced with new girl-with-tablet photo; girls-at-laptop photo moved to Programmes section (mid-page)
- Founder's second overlapping photo removed; pink-saree community photo moved to Get Involved panel
- Cards redesigned: numbered with gold top-bar accent, white surfaces, lift-on-hover (Support, Programmes, Approach)

## Iteration 3 (2026-07-11)
- Programmes section image changed to curated classroom photo (design_guidelines rural_girls_learning)
- Green "Donate Now" button added to navbar (desktop + mobile): scrolls to contact form and pre-fills interest "Donation / Support" + donation message. No payment gateway — donation enquiries go through the enquiry form

## Iteration 4 (2026-07-11)
- Dedicated /donate page (react-router): Bank Transfer card, UPI card with copy button, Scan & Pay QR card, receipt note. Donate Now in navbar now navigates to /donate
- Bank account number, IFSC, UPI ID (avanifoundation@upi) and QR are PLACEHOLDERS — waiting for real details from user
- Programmes image changed to women community gathering (curated); G20 delegates photo added as wide banner in Founder section

## Iteration 5 (2026-07-11) — REVERTED on user request ("undo")
- Palette lightening, black navbar wordmark and Focus Areas redesign were rolled back; site is back to deep forest green (#0F2E23), forest logo text, and the original Focus Areas accordion

## Iteration 6 (2026-07-11)
- Navbar wordmark AVANI FOUNDATION now black
- Focus Areas rebuilt as a 7-card bento grid: ghost serif numbers, icon chips, click-to-open card inverts to deep green with gold accents
- Donate page: all Hindi text removed (fully English); hero now features an AI-generated 3D render (Gemini Nano Banana via EMERGENT_LLM_KEY) of a hand dropping a gold coin into a green donation box, floating animation, saved at /app/frontend/public/assets/donate-coin.png. Regeneration script: /app/scripts/gen_donate_image.py

## Iteration 7 (2026-07-11)
- Site palette shifted to reference-style: light mint bg (#F0F6F0), near-black green headings, bright accent; then per user the bright-green accents became dark yellow/gold (leaf=#C59B27) — hero italic, primary buttons, donate italic
- Hero decluttered: second italic quote paragraph removed
- Donate page hero image removed entirely (page is now text + 3 cards); donate-coin.png / donate-coin-cut.png assets remain on disk unused

## Iteration 8 (2026-07-11)
- Removed redundant "Partner With Us" button from navbar (desktop + mobile); Partner nav link remains
- Hero headline reduced a size step (text-3xl/4xl/5xl)
- Programmes redesigned: 01→02→03 stage flow cards with arrows, image gets gold "Pilot-first" badge, initiative cards now have per-item lucide icons + gold numbers

## Iteration 9 (2026-07-11)
- Programmes section background changed from dark green to warm sand (#F4EBD8, avani.sand): white stage-flow cards, white initiative cards with sand icon chips, dark green "Pilot-first" badge, soft gold/moss glow blobs

## Iteration 10 (2026-07-11) — REVERTED on user request ("undo")
- Golden-gradient backgrounds were rolled back; marquee, Vision card, Focus Areas open card, Partner panel, Footer, Donate header/UPI card and badges are dark green again

## Iteration 11 (2026-07-11)
- Programmes section background now golden gradient (from-goldsoft via-gold to-amber) per user ("vo crazy tha"): white stage/cards pop on gold, dark green Pilot-first badge, deep-green text. Note: earlier "undo" had restored Programmes to its pre-sand dark version; golden replaces it directly

## Iteration 12 (2026-07-11)
- Footer redesigned: gold top border, "Ready to be part of the change?" CTA band (Partner + Donate buttons), 4-column layout (brand + socials, Quick Links, Explore, Reach Us), giant ghost AVANI watermark, bottom bar. Works on both Home and /donate

## Iteration 13 (2026-07-11)
- Footer made compact per user feedback: light cream single-strip (logo + tagline, inline quick links, email/location chips, thin bottom bar), matching the site's light mint + gold theme; big CTA band and watermark removed

## Iteration 14 (2026-07-12)
- Mobile optimization: hero image shorter with softer arch on phones (face centred via object-position), approach badge sits below image on mobile instead of overlapping, G20 banner caption smaller on mobile, About image height tuned for phones

## Iteration 15 (2026-07-12)
- Phone fixes: hero image now uses a clean rounded frame with 4:5 aspect on mobile (arch only on desktop), face-centred crop; Get Involved event photo taller with better crop on phones

## Iteration 16 (2026-07-13)
- Enquiry emails ACTIVATED: data@avanifoundation.org mailbox now accepts mail — verified end-to-end via POST /api/enquiries (email_sent: true)
- Instagram linked: @avani_impact → https://www.instagram.com/avani_impact in Contact section; LinkedIn remains "Coming soon"

## Iteration 17 (2026-07-13) — VPS self-hosting preparation
- Email system now pluggable: EMAIL_BACKEND=smtp|resend (own domain) in server.py; aiosmtplib added; legacy "emergent" mode kept for preview only
- All photos moved to frontend/public/assets/ (local, no Emergent CDN); only one Unsplash hotlink remains (programmes image)
- Removed @emergentbase/overlay + @emergentbase/visual-edits dev packages; production `yarn build` verified working without them
- Created backend/.env.example + frontend/.env.example, /app/DEPLOYMENT.md (full VPS guide: install, build, env, Nginx, HTTPS/certbot, systemd, MongoDB schema, email testing), new README.md
- .gitignore now covers all .env files; no keys hardcoded in source
- Preview still works with EMAIL_BACKEND=emergent (email_sent verified true)

## Iteration 18 (2026-07-13)
- Programmes Unsplash image downloaded + optimized (1600px, 276KB) to /assets/programmes.jpg — 100% of images now served locally (verified: zero external image URLs)
- Note: after removing @emergentbase packages the dev server needed one restart (stale injected module) — preview clean now

## Iteration 19 (2026-07-13) — SEO setup (farm-seo-setup skill)
- Static head: search title ("AVANI Foundation — Empowering Women Through Digital Skills"), 154-char description, canonical https://avanifoundation.org/, robots meta, full Open Graph + Twitter summary_large_image with real 1200×630 og-image.jpg (created from women-circle photo), apple-touch-icon 180×180, JSON-LD (NGO + founder Person Mani Pandey + sameAs Instagram), real noscript fallback
- public/robots.txt (explicit AI-crawler group + Disallow /api/ + sitemap ref), sitemap.xml (/ and /donate), llms.txt — all verified serving as real files under both Accept types
- Donate links converted to real <a href> (crawlable)
- Verified: JSON-LD parses, no scaffold leftovers, no placeholder/preview URLs, app renders fine
- Pending: /donate shares homepage title/meta (single static head); Google Search Console submission after go-live

## Iteration 20 (2026-07-13) — email config for self-hosting
- Contact form email addresses now fully env-driven: EMAIL_FROM=data@avanifoundation.org (sender), ENQUIRY_RECIPIENT_EMAIL=hello@avanifoundation.org (recipient), EMAIL_REPLY_TO=hello@avanifoundation.org
- hello@avanifoundation.org deliverability VERIFIED (provider accepted test mail) and real /api/enquiries flow returns email_sent:true to hello@
- .env.example updated (Hostinger SMTP example + mailbox-warning note); DEPLOYMENT.md table updated; zero hardcoded addresses in server.py

## Known Issues
- Email delivery to data@avanifoundation.org FAILS: provider reports the mailbox is undeliverable (domain email not configured). Enquiries ARE stored in MongoDB regardless. Fix: user sets up email hosting for avanifoundation.org (MX records) OR provides an alternative inbox to put in ENQUIRY_RECIPIENT_EMAIL in /app/backend/.env
- Instagram / LinkedIn shown as "Coming soon" placeholders

## Backlog
- P0: Real bank account details + UPI ID + QR for the Donate page (currently placeholders)
- P1: LinkedIn URL when available
- P1: Admin view for stored enquiries (user declined for now)
- P2: SEO/Open Graph/sitemap (farm-seo-setup skill), donate button, volunteer stories/impact counters, Hindi language toggle

## Next Tasks
1. Confirm working enquiry inbox with user
2. Add social links when available
3. SEO + social share cards before go-live
