import { GraduationCap, Globe2, Users } from "lucide-react";
import { IMAGES } from "../data/site";
import { Reveal } from "./Reveal";

const CREDENTIALS = [
  {
    icon: GraduationCap,
    text: "Global Politics, University of Oxford · MBA in Marketing, Symbiosis Institute of Business Management, Pune",
  },
  {
    icon: Globe2,
    text: "UN Women India — advancing gender equality through policy engagement, government coordination and international collaboration",
  },
  {
    icon: Users,
    text: "India's G20 Presidency — Women's Empowerment Ministerial Conference and G20 EMPOWER, engaging grassroots women leaders and international leadership",
  },
];

export default function Founder() {
  return (
    <section
      id="founder"
      data-testid="founder-section"
      className="bg-avani-ivory py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5 relative">
          <Reveal>
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-avani-gold/35 shadow-2xl shadow-avani-forest/15 max-w-md">
              <img
                src={IMAGES.founderPortrait}
                alt="Mani Pandey, Founder of AVANI Foundation, at the University of Oxford"
                data-testid="founder-portrait"
                className="w-full h-[26rem] sm:h-[30rem] object-cover hover:scale-105 transition-transform duration-[1.4s] ease-out"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-avani-moss">
              Meet the Founder
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              data-testid="founder-heading"
              className="mt-4 font-serif uppercase text-3xl sm:text-4xl lg:text-5xl text-avani-forest tracking-tight leading-[1.08]"
            >
              Mani Pandey
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-2 font-serif italic text-xl text-avani-amber">
              Founder, AVANI Foundation
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-avani-slate leading-relaxed">
              With a background in gender advocacy, global politics and
              marketing, Mani Pandey founded AVANI with a belief that every
              woman deserves the confidence, skills and opportunities to shape
              her own future.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-sm text-avani-muted leading-relaxed">
              During her work with UN Women India, Mani contributed to advancing
              gender equality and women's empowerment through policy engagement,
              government coordination and international collaboration. Her work
              brought her into engagement with grassroots women leaders, senior
              government representatives and international leaders, including
              the Prime Minister of New Zealand and ministers from various
              European countries.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {CREDENTIALS.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div
                    data-testid={`founder-credential-${i + 1}`}
                    className="flex items-start gap-4 bg-avani-cream/70 border border-avani-forest/10 rounded-xl px-5 py-4"
                  >
                    <Icon className="w-5 h-5 text-avani-amber shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed text-avani-slate">
                      {cred.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-8 font-serif italic text-lg leading-relaxed text-avani-forest/85 border-l-2 border-avani-gold pl-6">
              “Meaningful empowerment requires more than policies or skills
              training. Through AVANI, we connect women's aspirations with
              practical skills, mentorship and opportunities for lasting
              economic independence.”
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-12">
          <Reveal delay={0.15}>
            <div className="mt-4 relative overflow-hidden rounded-[2rem] border border-avani-gold/30 shadow-xl shadow-avani-forest/10">
              <img
                src={IMAGES.founderG20}
                alt="Mani Pandey with international delegates at a G20 women's empowerment engagement"
                data-testid="founder-g20-image"
                className="w-full h-72 sm:h-96 object-cover object-center hover:scale-105 transition-transform duration-[1.4s] ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-avani-deep/85 to-transparent px-7 py-6">
                <p className="font-serif italic text-lg text-avani-ivory">
                  On the global stage — advancing women's empowerment through
                  India's G20 Presidency
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
