import { MoveRight } from "lucide-react";
import { APPROACH } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function Approach() {
  return (
    <section
      id="approach"
      data-testid="approach-section"
      className="bg-avani-ivory py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Our Approach"
          title="Confidence → Capability → Career"
          testId="approach-heading"
        />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-2xl text-avani-muted leading-relaxed">
            We aim to support women at every stage of their journey.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-avani-forest/10 border border-avani-forest/10">
          {APPROACH.map((stage, i) => (
            <Reveal key={stage.step} delay={i * 0.12} className="h-full">
              <div
                data-testid={`approach-stage-${stage.step}`}
                className="group relative h-full bg-avani-ivory hover:bg-avani-cream transition-colors duration-500 p-8 sm:p-10"
              >
                <span className="font-serif text-5xl text-avani-gold/60 group-hover:text-avani-gold transition-colors duration-500">
                  {stage.step}
                </span>
                <h3 className="mt-6 font-serif uppercase text-2xl tracking-wide text-avani-forest flex items-center gap-3">
                  {stage.title}
                  {i < APPROACH.length - 1 && (
                    <MoveRight className="w-5 h-5 text-avani-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  )}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-avani-muted">
                  {stage.text}
                </p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-avani-gold group-hover:w-full transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
