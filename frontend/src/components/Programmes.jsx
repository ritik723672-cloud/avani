import { ArrowUpRight } from "lucide-react";
import { INITIATIVES, APPROACH } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function Programmes() {
  return (
    <section
      id="programmes"
      data-testid="programmes-section"
      className="grain relative bg-avani-forest py-20 lg:py-28"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Our Programmes"
          title="Turning Potential into Possibility"
          dark
          testId="programmes-heading"
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-avani-ivory/70 leading-relaxed">
            AVANI is developing its initial programme model around three
            connected stages: confidence, capability and career.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-3">
          {APPROACH.map((s) => (
            <Reveal key={s.step} delay={0.1}>
              <span
                data-testid={`programme-stage-chip-${s.step}`}
                className="inline-flex items-center gap-2 rounded-full border border-avani-gold/30 bg-avani-deep/60 px-5 py-2 text-xs uppercase tracking-[0.18em] text-avani-goldsoft"
              >
                <span className="text-avani-gold font-serif">{s.step}</span>
                {s.title}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 font-serif italic text-xl text-avani-goldsoft/90">
            Our future initiatives may include:
          </p>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIATIVES.map((item, i) => (
            <Reveal key={item} delay={i * 0.07} className="h-full">
              <div
                data-testid={`programme-initiative-${i + 1}`}
                className="group h-full rounded-2xl border border-avani-gold/15 bg-avani-deep/50 p-7 hover:bg-avani-moss/60 hover:border-avani-gold/40 transition-all duration-500"
              >
                <ArrowUpRight className="w-5 h-5 text-avani-gold/70 group-hover:text-avani-gold transition-colors duration-500" />
                <p className="mt-4 text-sm leading-relaxed text-avani-ivory/85">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-3xl font-serif italic text-lg leading-relaxed text-avani-ivory/60 border-l-2 border-avani-gold/50 pl-6">
            We intend to begin with focused pilot initiatives, learn from the
            communities we serve and expand programmes based on their needs and
            outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
