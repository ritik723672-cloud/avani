import { ArrowRight } from "lucide-react";
import { INITIATIVES, APPROACH, IMAGES } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function Programmes() {
  return (
    <section
      id="programmes"
      data-testid="programmes-section"
      className="grain relative bg-gradient-to-br from-avani-goldsoft via-avani-gold to-avani-amber py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-white/25 blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-[26rem] h-[26rem] rounded-full bg-avani-moss/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-avani-deep/70">
                Our Programmes
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                data-testid="programmes-heading"
                className="mt-4 font-serif uppercase text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-avani-deep"
              >
                Turning Potential into Possibility
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-avani-deep/70 leading-relaxed">
                AVANI is developing its initial programme model around three
                connected stages: confidence, capability and career.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
              {APPROACH.map((s, i) => (
                <Reveal key={s.step} delay={0.1 + i * 0.1}>
                  <div className="flex items-center gap-4">
                    <div
                      data-testid={`programme-stage-chip-${s.step}`}
                      className="rounded-2xl border border-avani-deep/15 bg-white px-6 py-4 shadow-sm hover:shadow-lg hover:shadow-avani-deep/15 hover:border-avani-deep/40 hover:-translate-y-1 transition-all duration-500"
                    >
                      <span className="font-serif text-2xl text-avani-amber">
                        {s.step}
                      </span>
                      <p className="mt-1 font-serif uppercase tracking-wide text-avani-forest">
                        {s.title}
                      </p>
                    </div>
                    {i < APPROACH.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-avani-deep/60 hidden sm:block shrink-0" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="relative mb-6">
                <div className="overflow-hidden rounded-[2rem] rounded-tl-[6rem] border border-avani-deep/20 shadow-2xl shadow-avani-deep/25">
                  <img
                    src={IMAGES.programmes}
                    alt="Indian women learning together at a community programme"
                    data-testid="programmes-image"
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-[1.4s] ease-out"
                  />
                </div>
                <div className="absolute -bottom-5 left-6 bg-avani-forest text-avani-goldsoft rounded-xl px-5 py-3 shadow-lg shadow-avani-deep/30">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-avani-gold">
                    Pilot-first
                  </p>
                  <p className="font-serif italic text-sm">
                    Learn from communities → expand
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 font-serif italic text-xl text-avani-deep/85">
            Our future initiatives may include:
          </p>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIATIVES.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.text} delay={i * 0.07} className="h-full">
                <div
                  data-testid={`programme-initiative-${i + 1}`}
                  className="group relative h-full rounded-2xl border border-avani-deep/10 bg-white p-7 overflow-hidden hover:border-avani-deep/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-avani-deep/20 transition-all duration-500"
                >
                  <span className="absolute top-0 left-0 h-1 w-10 bg-avani-deep/60 group-hover:w-full transition-all duration-700" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full border border-avani-amber/30 bg-avani-sand group-hover:bg-avani-forest group-hover:border-avani-forest transition-all duration-500">
                      <Icon className="w-5 h-5 text-avani-amber group-hover:text-avani-goldsoft transition-colors duration-500" />
                    </span>
                    <span className="font-serif text-2xl text-avani-deep/25 group-hover:text-avani-amber transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-avani-slate">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 max-w-3xl font-serif italic text-lg leading-relaxed text-avani-deep/75 border-l-2 border-avani-deep/40 pl-6">
            We intend to begin with focused pilot initiatives, learn from the
            communities we serve and expand programmes based on their needs and
            outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
