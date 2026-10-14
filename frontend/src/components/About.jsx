import { Eye, Compass } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { useContent, contentImg } from "../lib/content";

export default function About() {
  const content = useContent();
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
                  src={contentImg(content, "womenCircle")}
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
                {content.about.para1}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-avani-muted leading-relaxed">
                {content.about.para2}
              </p>
            </Reveal>
            <Reveal delay={0.29}>
              <p className="mt-4 text-avani-muted leading-relaxed">
                {content.about.para3}
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
                    {content.about.vision}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="h-full">
                <div
                  data-testid="about-mission-card"
                  className="h-full bg-white rounded-2xl p-7 border border-avani-forest/12"
                >
                  <Compass className="w-6 h-6 text-avani-amber" />
                  <h3 className="mt-4 font-serif uppercase text-xl tracking-wide text-avani-forest">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-avani-muted">
                    {content.about.mission}
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
