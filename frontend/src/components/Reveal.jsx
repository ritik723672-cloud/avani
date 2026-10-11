import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 36 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ overline, title, dark = false, testId }) => (
  <div className="max-w-3xl">
    <Reveal>
      <p
        className={`text-xs uppercase tracking-[0.3em] font-semibold font-sans ${
          dark ? "text-avani-gold" : "text-avani-moss"
        }`}
      >
        {overline}
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <h2
        data-testid={testId}
        className={`mt-4 font-serif uppercase text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight ${
          dark ? "text-avani-ivory" : "text-avani-forest"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  </div>
);
