import { useNavigate } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { IMAGES, CONTACT } from "../data/site";
import { scrollToId } from "../lib/scroll";

const QUICK_LINKS = [
  { label: "About Us", href: "#about", testId: "footer-link-about" },
  { label: "Our Focus Areas", href: "#focus-areas", testId: "footer-link-focus-areas" },
  { label: "Our Programmes", href: "#programmes", testId: "footer-link-programmes" },
  { label: "Partner With Us", href: "#partner", testId: "footer-link-partner" },
  { label: "Contact Us", href: "#contact", testId: "footer-link-contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  const go = (href) => {
    if (document.querySelector(href)) {
      scrollToId(href);
    } else {
      navigate("/");
    }
  };

  return (
    <footer
      data-testid="footer-section"
      className="bg-avani-cream border-t-2 border-avani-gold/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.logo}
              alt="AVANI Foundation logo"
              className="h-11 w-11 object-cover object-top rounded-full border border-avani-gold/40 bg-white"
            />
            <span className="leading-none">
              <span className="block font-serif text-lg tracking-[0.18em] text-avani-forest">
                AVANI
              </span>
              <span className="block text-[8px] tracking-[0.42em] text-avani-muted mt-0.5">
                FOUNDATION
              </span>
            </span>
            <span className="hidden sm:block h-8 w-px bg-avani-forest/15 mx-2" />
            <p className="hidden sm:block font-serif italic text-sm text-avani-muted max-w-[180px] leading-snug">
              Empowering women to shape their own futures.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.testId}
                data-testid={link.testId}
                onClick={() => go(link.href)}
                className="text-[13px] font-medium text-avani-slate hover:text-avani-amber transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a
              data-testid="footer-email-link"
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2.5 text-[13px] text-avani-slate hover:text-avani-amber transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-avani-forest text-avani-goldsoft">
                <Mail className="w-3.5 h-3.5" />
              </span>
              {CONTACT.email}
            </a>
            <p className="flex items-center gap-2.5 text-[13px] text-avani-muted">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-avani-forest text-avani-goldsoft">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              {CONTACT.location}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-avani-forest/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-avani-muted">
            © 2026 AVANI Foundation. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-avani-amber">
            Advancing Vision · Ambition · New Independence
          </p>
        </div>
      </div>
    </footer>
  );
}
