import { IMAGES, NAV_LINKS, CONTACT } from "../data/site";
import { scrollToId } from "../lib/scroll";

export default function Footer() {
  return (
    <footer
      data-testid="footer-section"
      className="bg-avani-deep border-t border-avani-gold/15 py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="bg-avani-ivory rounded-xl p-1.5 inline-flex">
                <img
                  src={IMAGES.logo}
                  alt="AVANI Foundation logo"
                  className="h-12 w-12 object-cover object-top rounded-lg"
                />
              </span>
              <span className="leading-none">
                <span className="block font-serif text-2xl tracking-[0.18em] text-avani-ivory">
                  AVANI
                </span>
                <span className="block text-[9px] tracking-[0.42em] text-avani-gold mt-1">
                  FOUNDATION
                </span>
              </span>
            </div>
            <p className="mt-5 font-serif italic text-lg text-avani-goldsoft/80">
              Empowering women to shape their own futures.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-avani-gold">
              Quick Links
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <button
                data-testid="footer-link-about"
                onClick={() => scrollToId("#about")}
                className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
              >
                About Us
              </button>
              <button
                data-testid="footer-link-focus-areas"
                onClick={() => scrollToId("#focus-areas")}
                className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
              >
                Our Focus Areas
              </button>
              <button
                data-testid="footer-link-programmes"
                onClick={() => scrollToId("#programmes")}
                className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
              >
                Our Programmes
              </button>
              <button
                data-testid="footer-link-partner"
                onClick={() => scrollToId("#partner")}
                className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
              >
                Partner With Us
              </button>
              <button
                data-testid="footer-link-contact"
                onClick={() => scrollToId("#contact")}
                className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
              >
                Contact Us
              </button>
            </nav>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-avani-gold">
              Reach Us
            </p>
            <a
              data-testid="footer-email-link"
              href={`mailto:${CONTACT.email}`}
              className="mt-5 block text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
            >
              {CONTACT.email}
            </a>
            <p className="mt-2 text-sm text-avani-ivory/70">{CONTACT.location}</p>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-avani-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-avani-ivory/40">
            © 2026 AVANI Foundation. All rights reserved.
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-avani-gold/50">
            Advancing Vision · Ambition · New Independence
          </p>
        </div>
      </div>
    </footer>
  );
}
