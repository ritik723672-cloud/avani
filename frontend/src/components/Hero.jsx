import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import { IMAGES } from "../data/site";
import { scrollToId } from "../lib/scroll";

const LINES = [
  { text: "Every Woman", accent: false },
  { text: "Deserves the", accent: false },
  { text: "Opportunity to", accent: false },
  { text: "Shape Her Future.", accent: true },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="grain relative min-h-screen bg-avani-ivory overflow-hidden flex items-center pt-28 pb-16 lg:pt-32"
    >
      <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-avani-gold/10 blur-3xl" />
      <div className="absolute bottom-0 -left-40 w-[28rem] h-[28rem] rounded-full bg-avani-moss/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 lg:gap-8 items-center w-full">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.34em] font-semibold text-avani-moss"
            data-testid="hero-overline"
          >
            Advancing Vision · Ambition · New Independence
          </motion.p>

          <h1
            data-testid="hero-headline"
            className="mt-6 font-serif uppercase text-avani-forest text-4xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight"
          >
            {LINES.map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${
                    line.accent ? "italic normal-case text-avani-amber" : ""
                  }`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.25 + i * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-avani-muted"
            data-testid="hero-subtext"
          >
            AVANI Foundation is being built to help women and girls turn their
            potential into opportunity through digital skills, AI, content
            creation, entrepreneurship, mentorship and access to opportunities.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-5 max-w-xl font-serif italic text-lg sm:text-xl text-avani-forest/85 leading-relaxed"
          >
            “Empowerment goes beyond learning a skill — it is about building
            confidence, discovering possibilities and gaining the tools to
            create a future of your own.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-discover-mission-btn"
              onClick={() => scrollToId("#about")}
              className="group flex items-center gap-2.5 rounded-full bg-avani-forest px-7 py-3.5 text-sm font-semibold text-avani-ivory transition-all duration-300 hover:bg-avani-moss hover:shadow-xl hover:shadow-avani-forest/20"
            >
              Discover Our Mission
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-partner-btn"
              onClick={() => scrollToId("#partner")}
              className="rounded-full border border-avani-forest/30 px-7 py-3.5 text-sm font-semibold text-avani-forest transition-all duration-300 hover:border-avani-gold hover:bg-avani-gold/10"
            >
              Partner With Us
            </button>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-avani-gold/35 shadow-2xl shadow-avani-forest/20">
              <motion.img
                src={IMAGES.girlTablet}
                alt="Young schoolgirl smiling with a tablet, learning digital skills"
                data-testid="hero-image"
                style={{ y: imgY }}
                className="w-full h-[26rem] sm:h-[30rem] lg:h-[34rem] object-cover scale-110"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-avani-forest text-avani-ivory rounded-2xl px-6 py-5 shadow-xl shadow-avani-forest/30 border border-avani-gold/25"
              data-testid="hero-approach-badge"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-avani-gold">
                Our Approach
              </p>
              <p className="mt-1.5 font-serif text-lg sm:text-xl tracking-wide">
                Confidence → Capability → Career
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        data-testid="hero-scroll-indicator"
        onClick={() => scrollToId("#approach")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-avani-muted hover:text-avani-forest transition-colors hidden md:block"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="block"
        >
          <MoveDown className="w-5 h-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
