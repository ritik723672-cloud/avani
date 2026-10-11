import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FOCUS_AREAS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export default function FocusAreas() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="focus-areas"
      data-testid="focus-areas-section"
      className="bg-avani-ivory py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            overline="Our Focus Areas"
            title="Seven Paths to Independence"
            testId="focus-areas-heading"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-avani-muted lg:text-right">
              From digital livelihoods to nutrition and climate innovation —
              tap a card to explore each path toward{" "}
              <span className="font-serif italic text-avani-forest">
                her economic independence.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {FOCUS_AREAS.map((area, i) => {
            const Icon = area.icon;
            const isOpen = open === i;
            return (
              <Reveal key={area.title} delay={i * 0.06} className={SPANS[i]}>
                <button
                  data-testid={`focus-area-toggle-${i + 1}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={`group relative w-full h-full text-left rounded-[1.75rem] border p-7 sm:p-8 overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "bg-gradient-to-br from-avani-goldsoft via-avani-gold to-avani-amber border-avani-amber/50 shadow-2xl shadow-avani-amber/30 -translate-y-1"
                      : "bg-white border-avani-forest/10 hover:border-avani-gold/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-avani-forest/10"
                  }`}
                >
                  <span
                    className={`absolute -top-4 -right-2 font-serif text-[6rem] leading-none select-none transition-colors duration-500 ${
                      isOpen ? "text-avani-deep/10" : "text-avani-forest/5"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "bg-avani-deep border-avani-deep"
                        : "bg-avani-cream border-avani-gold/40 group-hover:bg-avani-deep group-hover:border-avani-deep"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-500 ${
                        isOpen
                          ? "text-avani-goldsoft"
                          : "text-avani-amber group-hover:text-avani-goldsoft"
                      }`}
                    />
                  </span>

                  <span
                    className={`relative block mt-6 font-serif uppercase text-lg sm:text-xl tracking-wide leading-snug transition-colors duration-500 ${
                      isOpen ? "text-avani-deep" : "text-avani-forest"
                    }`}
                  >
                    {area.title}
                  </span>
                  <span
                    className={`relative block mt-2 font-serif italic text-sm transition-colors duration-500 ${
                      isOpen ? "text-avani-deep/70" : "text-avani-muted"
                    }`}
                  >
                    {area.tagline}
                  </span>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative block overflow-hidden"
                      >
                        <span
                          data-testid={`focus-area-detail-${i + 1}`}
                          className="block mt-5 pt-5 border-t border-avani-deep/25 text-sm leading-relaxed text-avani-deep/80"
                        >
                          {area.text}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-6 right-6 flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-500 ${
                      isOpen
                        ? "border-avani-deep/60 text-avani-deep"
                        : "border-avani-forest/20 text-avani-forest group-hover:border-avani-gold"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
