import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Heart } from "lucide-react";
import { IMAGES, NAV_LINKS } from "../data/site";
import { scrollToId } from "../lib/scroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  const donate = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("avani:donate"));
    scrollToId("#contact");
  };

  return (
    <header
      data-testid="nav-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-avani-ivory/85 backdrop-blur-xl border-b border-avani-forest/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => go("#home")}
          className="flex items-center gap-3"
        >
          <img
            src={IMAGES.logo}
            alt="AVANI Foundation logo"
            className="h-11 w-11 object-cover object-top rounded-full border border-avani-gold/40 bg-white"
          />
          <span className="leading-none text-left">
            <span className="block font-serif text-xl tracking-[0.18em] text-avani-forest">
              AVANI
            </span>
            <span className="block text-[9px] tracking-[0.42em] text-avani-muted mt-0.5">
              FOUNDATION
            </span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => go(link.href)}
              className="text-[13px] font-medium tracking-wide text-avani-slate hover:text-avani-amber transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            data-testid="nav-partner-cta"
            onClick={() => go("#partner")}
            className="group flex items-center gap-2 rounded-full border border-avani-forest/25 px-5 py-2.5 text-[13px] font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft hover:border-avani-forest"
          >
            Partner With Us
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            data-testid="nav-donate-btn"
            onClick={donate}
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-emerald-600/25 transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4 fill-current" />
            Donate Now
          </button>
        </nav>

        <button
          data-testid="nav-mobile-menu-button"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-avani-forest p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-avani-ivory/95 backdrop-blur-xl border-b border-avani-forest/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => go(link.href)}
                  className="text-left font-serif text-2xl uppercase tracking-wide text-avani-forest"
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="nav-mobile-partner-cta"
                onClick={() => go("#partner")}
                className="mt-2 w-fit rounded-full bg-avani-forest text-avani-goldsoft px-6 py-3 text-sm font-semibold"
              >
                Partner With Us
              </button>
              <button
                data-testid="nav-mobile-donate-btn"
                onClick={donate}
                className="mt-2 w-fit flex items-center gap-2 rounded-full bg-emerald-600 text-white px-6 py-3 text-sm font-semibold"
              >
                <Heart className="w-4 h-4 fill-current" />
                Donate Now
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
