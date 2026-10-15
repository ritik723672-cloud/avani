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

## Iteration 21 (2026-07-13) — per-route meta completed + Emergent email proxy removed
- /donate now has its own title/description/canonical/OG via react-helmet-async Seo component; static home meta removed on donate (id-based swap), restored on home. Verified: exactly 1 description per route, works on direct load and SPA navigation. (Needed a frontend restart — dev server was serving cached index.html)
- Contact form email switched from Emergent proxy to real SMTP: EMAIL_BACKEND=smtp, SMTP_HOST=smtp.hostinger.com, port 465 SSL, SMTP_USER=data@avanifoundation.org. Verified in logs: backend now authenticates directly with Hostinger (535 auth error because SMTP_PASSWORD is EMPTY — waiting on user's Hostinger mailbox password). Emergent proxy no longer used; EMERGENT_EMAIL_KEY removed from backend/.env
- Until SMTP_PASSWORD is set, enquiries are still stored in MongoDB but NOT emailed (email_sent:false)

## Iteration 22 (2026-07-13) — SMTP live
- User provided Hostinger mailbox password; set in backend/.env SMTP_PASSWORD (env only, never in code/git)
- Live test: POST /api/enquiries → email_sent:true, no SMTP errors, zero Emergent-proxy calls. Sender: AVANI Foundation <data@avanifoundation.org> via smtp.hostinger.com:465 SSL → hello@avanifoundation.org
- Contact form emails are now 100% Emergent-independent

## Iteration 23 (2026-07-13) — visitor auto-reply live
- Automatic thank-you confirmation email to form visitors: Subject "Thank You for Contacting AVANI Foundation", branded HTML with user's exact copy, sent only after DB save, exactly once per enquiry (confirmation_sent flag in Mongo), graceful failure handling
- From: AVANI Foundation <hello@avanifoundation.org>, Reply-To: data@avanifoundation.org — VERIFIED: Hostinger authorized sending as hello@ (accepted on first attempt, no fallback needed)
- New env vars: AUTOREPLY_FROM, AUTOREPLY_REPLY_TO (documented in .env.example + DEPLOYMENT.md). Fallback to EMAIL_FROM built in if a future provider rejects AUTOREPLY_FROM
- Live test: email_sent:true, confirmation_sent:true, confirmation_from:hello@avanifoundation.org, zero errors

## Iteration 24 (2026-07-13) — FINAL VPS deployment preparation
- Spam protection added: hidden honeypot field (silent drop) + per-IP rate limit (5/hour → 429, tunable via ENQUIRY_RATE_LIMIT/WINDOW). Verified: 4 honeypot drops + 1 rate-limit block in logs; honeypot field visually hidden; design unchanged
- New files: deploy/nginx-avani.conf, deploy/avani-backend.service (non-root user `avani`), scripts/backup_db.sh + restore_db.sh (mongodump/mongorestore, keeps 14), CONFIGURATION.md (which file holds which setting), CHECKLIST.md (final testing checklist), DEPLOYMENT.md rewritten (non-root user, permissions, backup cron, troubleshooting, export steps)
- Final verification (all in preview): yarn build clean (11 assets), backend health OK, valid enquiry → email_sent:true + confirmation_sent:true via Hostinger SMTP, secret scan clean (password only in backend/.env)
- Export note: user is on trial plan — GitHub push is paid; VS Code editor reportedly doesn't open for them. They may need Emergent support for code export, or upgrade for Save-to-GitHub

## Iteration 25 (2026-07-14) — Admin CMS at /admin
- JWT admin auth (bcrypt, httpOnly cookies, 15-min access + 7-day refresh with transparent refresh, 5-attempt/15-min lockout), admin seeded from ADMIN_EMAIL/ADMIN_PASSWORD env
- Content editor for Donate page: account name/number, IFSC, bank & branch, UPI ID, QR image upload (base64 in MongoDB, max 2MB). Public GET /api/content/donate; Donate.jsx fetches live with placeholder fallbacks
- Verified end-to-end: seed, wrong-password 401, login, /me, protected PUT, public GET reflects, UI login → edit → QR upload → save → /donate shows changes. Test data reset to placeholders after verification
- robots.txt now disallows /admin

## Iteration 26 (2026-07-14) — CMS list editors (Focus Areas + Programmes) + image size hints
- Backend: SiteContent extended with focus_areas (icon/title/tagline/text, max 12) and initiatives (icon/text, max 12); PUT /api/admin/content/site validates (422 over 12), GET /api/content/site public
- Frontend: NEW /app/frontend/src/lib/icons.js — 25 curated lucide icons stored as string names, iconFor() resolver; site.js FOCUS_AREAS/INITIATIVES converted to icon-name strings
- content.jsx defaults + array merge (empty array → built-in 7 focus areas / 6 initiatives fallback)
- FocusAreas.jsx: renders content.focusAreas with repeating 5-pattern bento spans (any item count tiles); Programmes.jsx renders content.initiatives; Partner.jsx Get-Involved photo switched to CMS contentImg (was hardcoded IMAGES.founderEvent)
- Admin: Focus Areas + Programmes list editors (add/edit/delete/move up-down, icon dropdown with live preview); per-image-slot recommended size hints (hero 1000×1250 4:5, womenCircle 1200×1000, programmes 1200×800 3:2, founderPortrait 900×1100, founderEvent 1200×500, founderG20 1600×550) + QR 500×500 square hint
- Testing agent iteration_1: backend 8/8 pytest (/app/backend/tests/test_cms_lists.py), all frontend flows pass, test data cleaned

## Iteration 27 (2026-07-14) — Admin dashboard redesign (categorized, English-only, Branding category)
- User feedback: admin looked messy, remove Hindi, separate category per section, logo change option
- Admin.jsx rebuilt: 8-tab categorized dashboard (Overview, Branding & Logo, Donation Details, Contact & Social, Website Text, Focus Areas, Programmes, Website Photos) — sidebar on desktop, horizontal scrollable pills on mobile; ALL text now English
- Overview tab: 6 quick-access stat cards (logo status, donate live/placeholder, focus area count, initiatives count, customized photos x/7, contact email) + quick tips
- Sticky SaveBar per tab (dark pill, bottom-right) with "Unsaved changes" badge; donate saves via /admin/content/donate, everything else via /admin/content/site
- NEW Branding & Logo category: logo upload (site.images.logo, 400×400 square hint), preview, reset-to-default; Navbar + Footer now render logo via contentImg
- design_guidelines.json blueprint from design_agent; all legacy data-testids preserved + new admin-tab-{id}, admin-panel-{id}, admin-logo-*, admin-unsaved-badge, admin-overview-*
- Testing agent iteration_2: 100% pass (logo upload→homepage→reset verified, no Hindi chars, mobile OK, cleanup done)

## Known Issues
- Email delivery to data@avanifoundation.org FAILS: provider reports the mailbox is undeliverable (domain email not configured). Enquiries ARE stored in MongoDB regardless. Fix: user sets up email hosting for avanifoundation.org (MX records) OR provides an alternative inbox to put in ENQUIRY_RECIPIENT_EMAIL in /app/backend/.env
- Instagram / LinkedIn shown as "Coming soon" placeholders

## Iteration 28 (2026-07-15) — Zero "emergent" references in shippable code (user request)
- server.py: legacy `_send_emergent` email proxy + EMERGENT_EMAIL_KEY/EMERGENT_EMAIL_BASE_URL constants + "emergent" EMAIL_BACKEND branch fully removed (smtp | resend only)
- Deleted scripts/gen_donate_image.py (one-off generator, image already in assets); pip uninstall emergentintegrations + litellm; requirements.txt re-frozen — 0 references
- craco.config.js: @emergentbase overlay + visual-edits blocks removed (packages were already uninstalled; paths were dormant)
- Deleted unused scaffold frontend/src/constants/testIds/ (contained emergentLink + lint-rule comment; app uses inline data-testids)
- backend/tests/test_cms_lists.py: BASE_URL default now http://localhost:8001 (run with REACT_APP_BACKEND_URL env for HTTPS — Secure cookies need https)
- .env.example, DEPLOYMENT.md, CHECKLIST.md rewritten Emergent-free; DEPLOYMENT.md section 4 now says clone from own GitHub + delete hidden .emergent/ folder on VPS
- .gitconfig: neutral identity (AVANI Admin <admin@avanifoundation.org>)
- Kept intentionally: /app/.emergent/ (platform-critical, hidden, deletable on VPS), .gitignore pattern for it, .env values (git-ignored, never export), memory/PRD.md history
- Verified: pytest 8/8 (with REACT_APP_BACKEND_URL set), GET /api/ OK, content API OK, homepage + /admin render fine after frontend restart

## Backlog- P0: Real bank account details + UPI ID + QR for the Donate page (currently placeholders)
- P1: LinkedIn URL when available
- P1: Admin view for stored enquiries (user declined for now)
- P2: SEO/Open Graph/sitemap (farm-seo-setup skill), donate button, volunteer stories/impact counters, Hindi language toggle

## Next Tasks
1. Confirm working enquiry inbox with user
2. Add social links when available
3. SEO + social share cards before go-live
