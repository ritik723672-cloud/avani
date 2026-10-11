import { Sparkle } from "lucide-react";
import { MARQUEE_WORDS } from "../data/site";

export default function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div
      data-testid="editorial-marquee"
      className="bg-avani-forest border-y border-avani-gold/20 py-5 overflow-hidden"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center shrink-0">
            {items.map((word, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-serif italic text-xl sm:text-2xl text-avani-goldsoft/90 tracking-wide px-6">
                  {word}
                </span>
                <Sparkle className="w-3.5 h-3.5 text-avani-gold/70 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
