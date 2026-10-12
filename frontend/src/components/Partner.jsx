import { Handshake, HeartHandshake, ArrowRight } from "lucide-react";
import { IMAGES, PARTNER_GROUPS, INVOLVE_WAYS } from "../data/site";
import { Reveal } from "./Reveal";
import { scrollToId } from "../lib/scroll";

export default function Partner() {
  return (
    <section
      id="partner"
      data-testid="partner-involved-section"
      className="bg-avani-cream py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal className="h-full">
            <div className="h-full bg-avani-forest rounded-[2rem] p-8 sm:p-12 border border-avani-gold/25 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-avani-gold/10 blur-3xl" />
              <Handshake className="w-8 h-8 text-avani-gold relative" />
              <p className="mt-6 text-xs uppercase tracking-[0.3em] font-semibold text-avani-gold relative">
                Partner With AVANI
              </p>
              <h2
                data-testid="partner-heading"
                className="mt-4 font-serif uppercase text-3xl sm:text-4xl text-avani-ivory tracking-tight leading-[1.1] relative"
              >
                Be Part of the Change
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-avani-ivory/70 relative">
                Creating meaningful opportunities for women requires
                collaboration. We welcome conversations with organisations and
                individuals who share our commitment to women's empowerment and
                inclusive development. We aim to collaborate with:
              </p>
              <ul className="mt-7 space-y-3.5 relative">
                {PARTNER_GROUPS.map((item, i) => (
                  <li
                    key={item}
                    data-testid={`partner-group-${i + 1}`}
                    className="flex items-start gap-3 text-sm text-avani-ivory/85"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-avani-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                data-testid="partner-cta-btn"
                onClick={() => scrollToId("#contact")}
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-avani-gold px-7 py-3.5 text-sm font-semibold text-avani-deep transition-all duration-300 hover:bg-avani-goldsoft relative"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <div
              id="get-involved"
              className="h-full bg-avani-ivory rounded-[2rem] p-8 sm:p-12 border border-avani-forest/12 relative overflow-hidden"
            >
              <HeartHandshake className="w-8 h-8 text-avani-amber" />
              <p className="mt-6 text-xs uppercase tracking-[0.3em] font-semibold text-avani-moss">
                Get Involved
              </p>
              <h2
                data-testid="get-involved-heading"
                className="mt-4 font-serif uppercase text-3xl sm:text-4xl text-avani-forest tracking-tight leading-[1.1]"
              >
                Your Skills Can Open Doors
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-avani-muted">
                Whether you are an organisation looking to collaborate, a
                professional willing to mentor, or an individual who believes in
                our mission, there may be a place for you in AVANI's journey.
              </p>
              <ul className="mt-7 space-y-3.5">
                {INVOLVE_WAYS.map((item, i) => (
                  <li
                    key={item}
                    data-testid={`involve-way-${i + 1}`}
                    className="flex items-start gap-3 text-sm text-avani-slate"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-avani-amber shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 overflow-hidden rounded-2xl border border-avani-forest/10 shadow-lg shadow-avani-forest/10">
                <img
                  src={IMAGES.founderEvent}
                  alt="AVANI founder distributing learning material to children at a community event"
                  data-testid="get-involved-image"
                  className="w-full h-60 sm:h-52 object-cover object-[center_35%] hover:scale-105 transition-transform duration-[1.4s] ease-out"
                />
              </div>
              <button
                data-testid="get-involved-cta-btn"
                onClick={() => scrollToId("#contact")}
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-avani-forest/30 px-7 py-3.5 text-sm font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
