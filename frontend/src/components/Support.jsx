import { Check } from "lucide-react";
import { SUPPORT_GROUPS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function Support() {
  return (
    <section
      id="support"
      data-testid="target-audience-section"
      className="bg-avani-cream py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Who We Aim to Support"
          title="Her Potential, Our Purpose"
          testId="support-heading"
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-avani-muted leading-relaxed">
            AVANI aims to work with women and girls whose potential may be held
            back by limited access to skills, information, confidence or
            opportunities. Our intended beneficiaries include:
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUPPORT_GROUPS.map((group, i) => (
            <Reveal key={group} delay={i * 0.07} className="h-full">
              <div
                data-testid={`support-group-${i + 1}`}
                className="group relative h-full bg-white border border-avani-forest/10 rounded-3xl p-7 pt-8 overflow-hidden hover:border-avani-gold/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-avani-forest/10 transition-all duration-500"
              >
                <span className="absolute top-0 left-0 h-1 w-10 bg-avani-gold/70 group-hover:w-full transition-all duration-700" />
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-avani-gold/60 group-hover:text-avani-amber transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-avani-cream border border-avani-gold/30 group-hover:bg-avani-forest group-hover:text-avani-goldsoft text-avani-forest transition-all duration-500">
                    <Check className="w-4 h-4" />
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-avani-slate">
                  {group}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
