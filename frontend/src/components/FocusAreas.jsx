import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FOCUS_AREAS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function FocusAreas() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="focus-areas"
      data-testid="focus-areas-section"
      className="bg-avani-ivory py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              overline="Our Focus Areas"
              title="Seven Paths to Independence"
              testId="focus-areas-heading"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-avani-muted leading-relaxed text-sm">
                From digital livelihoods to nutrition and climate innovation —
                each focus area is designed to turn a woman's potential into
                lasting opportunity.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-avani-forest/10">
            {FOCUS_AREAS.map((area, i) => {
              const Icon = area.icon;
              const isOpen = open === i;
              return (
                <Reveal key={area.title} delay={i * 0.05}>
                  <div className="border-b border-avani-forest/10">
                    <button
                      data-testid={`focus-area-toggle-${i + 1}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center gap-4 sm:gap-7 py-6 text-left group"
                    >
                      <span className="font-serif text-sm text-avani-amber w-7 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-serif uppercase text-lg sm:text-2xl tracking-wide text-avani-forest group-hover:text-avani-moss transition-colors duration-300 leading-snug">
                          {area.title}
                        </span>
                        <span className="block font-serif italic text-sm text-avani-muted mt-1">
                          {area.tagline}
                        </span>
                      </span>
                      <Icon className="w-5 h-5 text-avani-gold shrink-0 hidden sm:block" />
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 text-avani-forest"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p
                            data-testid={`focus-area-detail-${i + 1}`}
                            className="pb-7 pl-11 sm:pl-14 pr-4 text-sm sm:text-base text-avani-muted leading-relaxed max-w-2xl"
                          >
                            {area.text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
