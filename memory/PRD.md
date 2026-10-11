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
