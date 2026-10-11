import { ArrowUpRight } from "lucide-react";
import { INITIATIVES, APPROACH, IMAGES } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function Programmes() {
  return (
    <section
      id="programmes"
      data-testid="programmes-section"
      className="grain relative bg-avani-forest py-20 lg:py-28"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              overline="Our Programmes"
              title="Turning Potential into Possibility"
              dark
              testId="programmes-heading"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-avani-ivory/70 leading-relaxed">
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
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-[2rem] rounded-tl-[6rem] border border-avani-gold/30 shadow-2xl shadow-black/30">
                <img
                  src={IMAGES.hero}
                  alt="Young girls gathered around a laptop at their school, learning together"
                  data-testid="programmes-image"
                  className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-[1.4s] ease-out"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 font-serif italic text-xl text-avani-goldsoft/90">
            Our future initiatives may include:
          </p>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIATIVES.map((item, i) => (
            <Reveal key={item} delay={i * 0.07} className="h-full">
              <div
                data-testid={`programme-initiative-${i + 1}`}
                className="group relative h-full rounded-2xl border border-avani-gold/15 bg-avani-deep/50 p-7 pt-8 overflow-hidden hover:bg-avani-moss/60 hover:border-avani-gold/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/30 transition-all duration-500"
              >
                <span className="absolute top-0 left-0 h-1 w-10 bg-avani-gold/70 group-hover:w-full transition-all duration-700" />
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-avani-gold/50 group-hover:text-avani-gold transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-avani-gold/50 group-hover:text-avani-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-avani-ivory/85">
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
