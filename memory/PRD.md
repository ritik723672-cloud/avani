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

## Iteration 10 (2026-07-11)
- All dark-green backgrounds switched to golden gradient (from-goldsoft via-gold to-amber) with deep-green text: marquee ribbon, Vision card, Focus Areas open card, Partner panel, Footer, Donate header + UPI card, Hero approach badge, Programmes pilot badge

## Known Issues
- Email delivery to data@avanifoundation.org FAILS: provider reports the mailbox is undeliverable (domain email not configured). Enquiries ARE stored in MongoDB regardless. Fix: user sets up email hosting for avanifoundation.org (MX records) OR provides an alternative inbox to put in ENQUIRY_RECIPIENT_EMAIL in /app/backend/.env
- Instagram / LinkedIn shown as "Coming soon" placeholders

## Backlog
- P0: Working recipient mailbox for enquiry emails (needs user's mail hosting or alternate address)
- P1: Real Instagram/LinkedIn URLs
- P1: Admin view for stored enquiries (user declined for now)
- P2: SEO/Open Graph/sitemap (farm-seo-setup skill), donate button, volunteer stories/impact counters, Hindi language toggle

## Next Tasks
1. Confirm working enquiry inbox with user
2. Add social links when available
3. SEO + social share cards before go-live
