import { motion } from "framer-motion";
import home1 from "../../assets/home/home1.mp4";
import { Link } from "react-router-dom";

// ─── Animation variants ────────────────────────────────────────────────────
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const staggerCards = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Design tokens ─────────────────────────────────────────────────────────
const C = {
  terracotta: "#B86A45",
  cinnamon: "#9B5235",
  caramel: "#D19A5B",
  cream: "#F2E6D9",
  beige: "#e6d6b8",
  brown: "#A46A3F",
  brownDeep: "#5A3626",
};

const shadow = {
  raisedStrong: "12px 12px 32px rgba(90,54,38,0.22), -8px -8px 24px rgba(255,255,255,0.78)",
  inset: "inset 4px 4px 12px rgba(90,54,38,0.15), inset -4px -4px 10px rgba(255,255,255,0.65)",
  pill: "6px 6px 14px rgba(90,54,38,0.13), -4px -4px 12px rgba(255,255,255,0.72)",
  badge: "4px 4px 12px rgba(90,54,38,0.32), -2px -2px 8px rgba(255,255,255,0.25)",
  cta: "0 8px 24px rgba(184,106,69,0.42), 0 0 0 1px rgba(255,255,255,0.10) inset",
  ctaHover: "0 12px 32px rgba(184,106,69,0.56), 0 0 20px rgba(209,154,91,0.30)",
};

// ─── Icons ─────────────────────────────────────────────────────────────────
const TempleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 3l4 3H8l4-3z" />
    <path d="M5 10h14" />
    <path d="M6 10v9M18 10v9M10 10v9M14 10v9" />
    <path d="M4 19h16" />
  </svg>
);
const LotusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 5c1.5 3 1.5 6 0 9-1.5-3-1.5-6 0-9z" />
    <path d="M5 12c2-1 4-1 6 1-2 1-5 1-6-1z" />
    <path d="M19 12c-2-1-4-1-6 1 2 1 5 1 6-1z" />
    <path d="M4 16c4 3 12 3 16 0" />
  </svg>
);
const AcharyaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="9" r="3.2" />
    <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
  </svg>
);
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 5.5A2 2 0 016 4h5v15H6a2 2 0 01-2-1.5v-12z" />
    <path d="M20 5.5A2 2 0 0018 4h-5v15h5a2 2 0 002-1.5v-12z" />
  </svg>
);
const MedalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="10" r="4.5" />
    <path d="M9 13l-2 7 5-3 5 3-2-7" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ─── Feature data ──────────────────────────────────────────────────────────
const features = [
  {
    icon: <AcharyaIcon />,
    text: "Live interactive sessions with renowned Acharyas",
    bg: `linear-gradient(135deg, ${C.terracotta}, ${C.cinnamon})`,
  },
  {
    icon: <BookIcon />,
    text: "Digitized access to rare classical manuscripts",
    bg: `linear-gradient(135deg, ${C.caramel}, ${C.terracotta})`,
  },
  {
    icon: <MedalIcon />,
    text: "Globally recognized certification programs",
    bg: `linear-gradient(135deg, ${C.cinnamon}, ${C.brownDeep})`,
  },
];

// ─── Component ─────────────────────────────────────────────────────────────
const About = () => {
  return (
    <section
      className="relative pt-20 pb-8 md:pt-28 md:pb-16"
      style={{ background: "#F2E6D9" }}
      aria-labelledby="about-kaumudi-heading"
    >
      <div className="relative mx-auto max-w-[1320px] px-6">

        {/* ── Centered Header Block ────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14 flex flex-col items-center gap-5 text-center"
        >
          {/* OUR STORY pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: `linear-gradient(145deg, ${C.cream}, ${C.beige})`,
              boxShadow: shadow.pill,
              color: C.terracotta,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: C.terracotta, boxShadow: `0 0 8px ${C.terracotta}` }}
            />
            Our Story
          </div>

          {/* Heading */}
          <h2
            id="about-kaumudi-heading"
            className="font-serif text-4xl font-extrabold leading-tight md:text-5xl"
            style={{ color: C.brownDeep }}
          >
            About Kaumudi Academy
          </h2>

          {/* Lotus divider */}
          <div className="flex items-center gap-3">
            <div
              className="h-[3px] w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${C.terracotta}, transparent)` }}
            />
            <span style={{ color: C.terracotta }}>
              <LotusIcon />
            </span>
            <div
              className="h-[3px] w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${C.caramel})` }}
            />
          </div>
        </motion.div>

        {/* ── Two-column grid ──────────────────────────────────────────── */}
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">

          {/* LEFT — Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div
              className="relative rounded-[2.75rem] p-5"
              style={{
                background: `linear-gradient(145deg, ${C.cream}, ${C.beige})`,
                boxShadow: shadow.raisedStrong,
              }}
            >
              <div
                className="overflow-hidden rounded-[2rem]"
                style={{ boxShadow: shadow.inset }}
              >
                <video
                  src={home1}
                  loop
                  muted
                  playsInline
                  className="block h-[420px] w-full object-cover md:h-[520px] rounded-[2rem]"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              </div>

              {/* Badge — top-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-10 flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${C.terracotta}, ${C.cinnamon})`,
                  boxShadow: shadow.badge,
                  color: C.cream,
                }}
                aria-hidden
              >
                <motion.span
  animate={{ opacity: [1, 0.4, 1] }}
  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
>
  <LotusIcon />
</motion.span>
              </motion.div>

              {/* Badge — bottom-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -bottom-6 right-12 flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${C.cinnamon}, ${C.brownDeep})`,
                  boxShadow: shadow.badge,
                  color: C.cream,
                }}
                aria-hidden
              >
                <motion.span
  animate={{ opacity: [1, 0.3, 1] }}
  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
>
  <LotusIcon />
</motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative space-y-7"
          >
            {/* Inset text box */}
            <div
              className="space-y-5 rounded-3xl p-6"
              style={{
                background: "linear-gradient(145deg, rgba(242,230,217,0.6), rgba(230,214,184,0.4))",
                boxShadow: shadow.inset,
              }}
            >
              <p className="text-base leading-relaxed md:text-lg" style={{ color: C.brown }}>
                Kaumudi Academy was born from a vision to democratize Sanskrit
                education for the modern world. We unite the disciplined scholarship
                of traditional Pathashalas with digital learning making classical
                wisdom accessible to seekers everywhere.
              </p>
              <p className="text-base leading-relaxed md:text-lg" style={{ color: C.brown }}>
                Rooted in centuries-old pedagogy and guided by accomplished
                Acharyas, our programs cultivate linguistic mastery, philosophical
                insight, and cultural literacy for lifelong learners.
              </p>
            </div>

            {/* Feature pill cards */}
            <motion.ul
              variants={staggerCards}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4 pt-2"
            >
              {features.map((f) => (
                <motion.li
                  key={f.text}
                  variants={cardItem}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="flex items-center gap-4 rounded-full px-3 py-3 pr-6"
                  style={{
                    background: `linear-gradient(145deg, ${C.cream}, ${C.beige})`,
                    boxShadow: shadow.pill,
                  }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ background: f.bg, boxShadow: shadow.badge, color: C.cream }}
                    aria-hidden
                  >
                    {f.icon}
                  </span>
                  <span className="text-sm font-medium md:text-base" style={{ color: C.brown }}>
                    {f.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA */}
            <div className="pt-4 flex justify-center md:justify-start">
              <Link to="/about">
                <motion.button
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    background: `linear-gradient(135deg, ${C.terracotta} 0%, ${C.brownDeep} 100%)`,
                    color: "#F5EDE3",
                    boxShadow: shadow.cta,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = shadow.ctaHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = shadow.cta)}
                >
                  Learn Our Story
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;