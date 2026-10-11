import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";
import { IMAGES, CONTACT } from "../data/site";
import { scrollToId } from "../lib/scroll";

const QUICK_LINKS = [
  { label: "About Us", href: "#about", testId: "footer-link-about" },
  { label: "Our Focus Areas", href: "#focus-areas", testId: "footer-link-focus-areas" },
  { label: "Our Programmes", href: "#programmes", testId: "footer-link-programmes" },
  { label: "Partner With Us", href: "#partner", testId: "footer-link-partner" },
  { label: "Contact Us", href: "#contact", testId: "footer-link-contact" },
];

const EXPLORE_LINKS = [
  { label: "Our Approach", href: "#approach", testId: "footer-link-approach" },
  { label: "Who We Support", href: "#support", testId: "footer-link-support" },
  { label: "Meet the Founder", href: "#founder", testId: "footer-link-founder" },
  { label: "Get Involved", href: "#get-involved", testId: "footer-link-get-involved" },
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
      className="relative bg-avani-deep border-t-4 border-avani-gold overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-testid="footer-cta-band"
          className="py-12 border-b border-avani-ivory/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7"
        >
          <h3 className="font-serif uppercase text-2xl sm:text-3xl lg:text-4xl text-avani-ivory tracking-tight leading-snug max-w-xl">
            Ready to be{" "}
            <span className="italic normal-case text-avani-gold">
              part of the change?
            </span>
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              data-testid="footer-partner-btn"
              onClick={() => go("#partner")}
              className="group flex items-center gap-2.5 rounded-full bg-avani-gold px-7 py-3.5 text-sm font-semibold text-avani-deep transition-all duration-300 hover:bg-avani-goldsoft"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="footer-donate-btn"
              onClick={() => navigate("/donate")}
              className="flex items-center gap-2 rounded-full border border-avani-gold/40 px-7 py-3.5 text-sm font-semibold text-avani-goldsoft transition-all duration-300 hover:bg-avani-gold/10"
            >
              <Heart className="w-4 h-4 fill-current" />
              Donate
            </button>
          </div>
        </div>

        <div className="py-14 grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 max-w-sm">
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
            <div className="mt-7 flex items-center gap-3">
              <a
                data-testid="footer-social-email"
                href={`mailto:${CONTACT.email}`}
                aria-label="Email AVANI Foundation"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-avani-ivory/20 text-avani-ivory/70 transition-all duration-300 hover:bg-avani-gold hover:border-avani-gold hover:text-avani-deep"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span
                data-testid="footer-social-instagram"
                aria-label="Instagram — coming soon"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-avani-ivory/20 text-avani-ivory/40 cursor-default"
                title="Instagram — coming soon"
              >
                <Instagram className="w-4 h-4" />
              </span>
              <span
                data-testid="footer-social-linkedin"
                aria-label="LinkedIn — coming soon"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-avani-ivory/20 text-avani-ivory/40 cursor-default"
                title="LinkedIn — coming soon"
              >
                <Linkedin className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-avani-gold font-semibold">
              Quick Links
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.testId}
                  data-testid={link.testId}
                  onClick={() => go(link.href)}
                  className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-avani-gold font-semibold">
              Explore
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <button
                  key={link.testId}
                  data-testid={link.testId}
                  onClick={() => go(link.href)}
                  className="text-left text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-avani-gold font-semibold">
              Reach Us
            </p>
            <a
              data-testid="footer-email-link"
              href={`mailto:${CONTACT.email}`}
              className="mt-5 flex items-center gap-3 text-sm text-avani-ivory/70 hover:text-avani-goldsoft transition-colors"
            >
              <Mail className="w-4 h-4 text-avani-gold shrink-0" />
              {CONTACT.email}
            </a>
            <p className="mt-3 flex items-center gap-3 text-sm text-avani-ivory/70">
              <MapPin className="w-4 h-4 text-avani-gold shrink-0" />
              {CONTACT.location}
            </p>
          </div>
        </div>

        <div className="relative">
          <p
            aria-hidden="true"
            className="pointer-events-none select-none text-center font-serif uppercase leading-none tracking-[0.12em] text-avani-ivory/5 text-[22vw] lg:text-[13rem] -mb-[4vw] lg:-mb-14"
          >
            AVANI
          </p>
          <div className="relative border-t border-avani-ivory/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-avani-ivory/40">
              © 2026 AVANI Foundation. All rights reserved.
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-avani-gold/60">
              Advancing Vision · Ambition · New Independence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
