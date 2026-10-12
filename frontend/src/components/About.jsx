import { Eye, Compass } from "lucide-react";
import { IMAGES } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="bg-avani-cream py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] rounded-tr-[7rem] border border-avani-gold/30 shadow-xl shadow-avani-forest/10">
                <img
                  src={IMAGES.womenCircle}
                  alt="Women in vibrant saris gathered in a community circle"
                  data-testid="about-image"
                  className="w-full h-80 sm:h-[28rem] object-cover hover:scale-105 transition-transform duration-[1.4s] ease-out"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 font-serif italic text-lg text-avani-forest/80 max-w-sm">
                “Bridging the gap between a woman's potential and the
                opportunities available to her.”
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              overline="About AVANI"
              title="Who We Are"
              testId="about-heading"
            />
            <Reveal delay={0.15}>
              <p className="mt-7 text-avani-slate leading-relaxed">
                AVANI Foundation is an emerging initiative dedicated to
                advancing women's empowerment, digital inclusion and economic
                independence.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-avani-muted leading-relaxed">
                We aim to bridge the gap between a woman's potential and the
                opportunities available to her. Through skills, guidance,
                mentorship and access to resources, AVANI seeks to help women
                and girls navigate a changing world with confidence and
                purpose.
              </p>
            </Reveal>
            <Reveal delay={0.29}>
              <p className="mt-4 text-avani-muted leading-relaxed">
                Our approach recognises that every woman has her own
                aspirations. Our role is to help her discover those
                aspirations, build the capabilities to pursue them and access
                opportunities to realise them.
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              <Reveal delay={0.1} className="h-full">
                <div
                  data-testid="about-vision-card"
                  className="h-full bg-avani-forest rounded-2xl p-7 border border-avani-gold/25"
                >
                  <Eye className="w-6 h-6 text-avani-gold" />
                  <h3 className="mt-4 font-serif uppercase text-xl tracking-wide text-avani-ivory">
                    Our Vision
                  </h3>
                  <p className="mt-3 font-serif italic text-lg leading-relaxed text-avani-goldsoft/90">
                    A world where every woman has the confidence to define her
                    own future.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="h-full">
                <div
                  data-testid="about-mission-card"
                  className="h-full bg-avani-ivory rounded-2xl p-7 border border-avani-forest/12"
                >
                  <Compass className="w-6 h-6 text-avani-amber" />
                  <h3 className="mt-4 font-serif uppercase text-xl tracking-wide text-avani-forest">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-avani-muted">
                    To bridge the gap between potential and opportunity by
                    building confidence and equipping women with future-ready
                    skills in AI, digital technologies, entrepreneurship and
                    leadership — enabling meaningful careers, sustainable
                    livelihoods and lifelong economic independence.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
