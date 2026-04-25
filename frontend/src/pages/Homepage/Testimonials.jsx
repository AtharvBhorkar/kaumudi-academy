import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import cap from "../../assets/cap.webp";
import person1 from "../../assets/home/person1.webp";
import person2 from "../../assets/home/person2.webp";
import person3 from "../../assets/home/person3.webp";
import person4 from "../../assets/home/person4.webp";

const testimonials = [
  {
    name: "Sarah Smith",
    role: "IT Engineer",
    text: "Choosing this academy was one of the most transformative decisions of my academic life. The Acharyas explain even the most complex grammatical concepts with clarity and patience, and the structured curriculum helped me build confidence step by step. The live chanting sessions, manuscript studies, and interactive discussions created a deeply immersive learning experience that goes far beyond ordinary online classes. I now feel truly connected to the language, its philosophy, and its timeless intellectual tradition.",
    image: person1,
    rating: 4,
  },
  {
    name: "Michael Brown",
    role: "Business Owner",
    text: "What impressed me most about this institution is the balance between traditional teaching methods and modern accessibility. The recorded lectures, personal mentoring sessions, and thoughtfully designed course materials made it easy to continue learning alongside my professional commitments. The discipline, authenticity, and scholarly depth of the programs are remarkable. I would strongly recommend this academy to anyone seeking serious, classical Sanskrit education in a contemporary format.",
    image: person2,
    rating: 3,
  },
  {
    name: "Sophia Lee",
    role: "Interior Designer",
    text: "From the very first week, I felt welcomed into a vibrant scholarly community. The faculty are incredibly dedicated, and the campus atmosphere both physical and virtual is inspiring and serene. The emphasis on pronunciation, scriptural interpretation, and cultural context gave me a deeper appreciation of Sanskrit literature than I ever imagined possible. This academy doesn't just teach a language it cultivates a lifelong love for learning.",
    image: person3,
    rating: 5,
  },
  {
    name: "James Carter",
    role: "Entrepreneur",
    text: "The rigor and authenticity of the teaching here exceeded all my expectations. Each module is carefully structured, with ample opportunities for revision, guided practice, and one-to-one doubt-clearing sessions. The digitized manuscripts and archival resources are exceptional, and the global discussion forums allowed me to exchange ideas with fellow students from many countries. It feels like being part of a truly international scholarly tradition.",
    image: person4,
    rating: 4,
  },
];

/* ── Lotus / botanical divider ─────────────────────────────────── */
const LotusDivider = () => (
  <div className="flex items-center justify-center gap-3 mt-4 mb-10">
    <span
      className="h-px w-20 rounded-full"
      style={{ background: "linear-gradient(to right, transparent, #b07a5a99)" }}
    />
    <span
      className="h-2 w-2 rounded-full"
      style={{
        background: "#8b3a2a",
        boxShadow: "0 0 8px #8b3a2a99",
      }}
    />
    {/* simple leaf/lotus svg */}
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4c2 4 2 8 0 12-2-4-2-8 0-12zM6 12c4 0 7 2 9 6-4 0-7-2-9-6zm20 0c-4 0-7 2-9 6 4 0 7-2 9-6zM8 22c3-2 6-2 8 0-3 2-6 2-8 0zm16 0c-3-2-6-2-8 0 3 2 6 2 8 0z"
        fill="#8b3a2a"
        opacity="0.85"
      />
    </svg>
    <span
      className="h-2 w-2 rounded-full"
      style={{
        background: "#8b3a2a",
        boxShadow: "0 0 8px #8b3a2a99",
      }}
    />
    <span
      className="h-px w-20 rounded-full"
      style={{ background: "linear-gradient(to left, transparent, #b07a5a99)" }}
    />
  </div>
);

/* ── Star rating ────────────────────────────────────────────────── */
const Stars = ({ rating }) => (
  <div
    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2"
    style={{
      background: "linear-gradient(145deg, #f0e4d0, #e8d5ba)",
      boxShadow: "4px 4px 10px #c9b08a55, -3px -3px 8px #fffdf855",
    }}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill={i < rating ? "#8b3a2a" : "none"}
        stroke={i < rating ? "#8b3a2a" : "#b07a5a55"}
        strokeWidth="1.5"
      >
        <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
      </svg>
    ))}
  </div>
);

/* ── Quote icon ─────────────────────────────────────────────────── */
const QuoteIcon = ({ className = "", style = {} }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

/* ── Slide variants ─────────────────────────────────────────────── */
const slideVariants = {
  enter: { opacity: 0, x: 60, scale: 0.98 },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -60,
    scale: 0.98,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── CSS variables injected once ───────────────────────────────── */
const CSS_VARS = `
  :root {
    --bg:          #ede3d3;
    --card:        #ede3d3;
    --cream-light: #f5ece0;
    --chocolate:   #3b1f12;
    --terracotta:  #8b3a2a;
    --caramel:     #c9954a;
    --cinnamon:    #b07a5a;
    --shadow-dark: #c4a882;
    --shadow-light:#fff8ef;

    --neu:          6px 6px 14px #c4a882aa, -5px -5px 12px #fff8efaa;
    --neu-strong:   10px 10px 28px #b99570bb, -8px -8px 20px #fff8efcc;
    --neu-inset:    inset 4px 4px 10px #c4a88266, inset -3px -3px 8px #fff8ef88;
    --neu-pill:     4px 4px 12px #c4a88277, -3px -3px 10px #fff8ef99;
  }
`;

/* ════════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const [index, setIndex] = useState(2); // Sophia Lee to match screenshot

  useEffect(() => {
    const t = setInterval(
      () => setIndex((p) => (p + 1) % testimonials.length),
      6500
    );
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <>
      <style>{CSS_VARS}</style>

      <section
        className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-8"
        style={{ background: "var(--bg)" }}
      >
        {/* ── noise texture ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── vignette ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, hsl(20 35% 40% / 0.15) 100%)",
          }}
        />

        {/* ══════════ CONTENT ══════════ */}
        <div className="relative z-10 mx-auto max-w-6xl">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5"
              style={{
                background: "var(--card)",
                boxShadow: "var(--neu)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--terracotta)",
                  boxShadow: "0 0 6px #8b3a2a99",
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: "var(--terracotta)" }}
              >
                Testimonials
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
              style={{
                color: "var(--chocolate)",
                textShadow: "1px 1px 0 #fff8ef99",
              }}
            >
              Voices From Our Learners
            </motion.h2>

            <LotusDivider />
          </div>

          <div className="relative">
            <motion.img
              src={cap}
              alt=""
              aria-hidden
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                rotate: [8, 13, 8],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="pointer-events-none absolute z-30 object-contain"
              style={{
                top: "clamp(-10rem, -8vw, -6rem)",
                right: "-7.8rem",
                width: "clamp(150px, 18vw, 280px)",
                filter: "drop-shadow(14px 22px 26px #1a0a0466)",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Outer neumorphic panel */}
                <div
                  className="relative rounded-[40px] p-6 sm:p-10 md:p-14"
                  style={{
                    background: "var(--card)",
                    boxShadow: "var(--neu-strong)",
                  }}
                >
                  {/* Grid: left profile | right text */}
                  <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr] md:gap-10">

                    {/* ── LEFT: profile ── */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.6 }}
                      className="flex flex-col items-center md:items-start md:pl-2"
                    >
                      {/* Avatar with nested neumorphic rings */}
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="group relative"
                        style={{}}
                      >
                        {/* Outer raised ring */}
                        <div
                          className="rounded-full p-3"
                          style={{
                            background: "var(--card)",
                            boxShadow: "var(--neu-strong)",
                          }}
                        >
                          {/* Inner inset frame */}
                          <div
                            className="rounded-full p-1.5"
                            style={{
                              background: "var(--cream-light)",
                              boxShadow: "var(--neu-inset)",
                            }}
                          >
                            <div
                              className="relative overflow-hidden rounded-full"
                              style={{
                                width: 128,
                                height: 128,
                                outline: "2px solid #c9954a66",
                              }}
                            >
                              <img
                                src={active.image}
                                alt={active.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* soft inner glow */}
                              <div
                                className="pointer-events-none absolute inset-0 rounded-full"
                                style={{
                                  boxShadow: "inset 0 0 20px #fffdf840",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* glowing aura behind */}
                        <div
                          className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl"
                          style={{ background: "#c9954a33" }}
                        />
                      </motion.div>

                      {/* Name, role, stars */}
                      <div className="mt-6 text-center md:text-left">
                        <h3
                          className="font-serif text-2xl font-extrabold"
                          style={{ color: "var(--chocolate)" }}
                        >
                          {active.name}
                        </h3>
                        <p
                          className="mt-1 text-sm font-medium tracking-wide"
                          style={{ color: "var(--terracotta)" }}
                        >
                          {active.role}
                        </p>
                        <div className="mt-4">
                          <Stars rating={active.rating} />
                        </div>
                      </div>
                    </motion.div>

                    {/* ── vertical divider ── */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute hidden md:block"
                      style={{
                        left: 240,
                        top: 16,
                        bottom: 16,
                        width: 1,
                        background:
                          "linear-gradient(to bottom, transparent, #b07a5a55, transparent)",
                        boxShadow: "1px 0 0 #fff8ef66",
                      }}
                    />

                    {/* ── RIGHT: testimonial text ── */}
                    <div className="relative">
                      {/* Inset content card */}
                      <div
                        className="relative rounded-[28px] px-6 py-7 sm:px-9 sm:py-9"
                        style={{
                          background: "#f5ece099",
                          boxShadow: "var(--neu-inset)",
                        }}
                      >
                        {/* Giant background quote */}
                        <QuoteIcon
                          className="pointer-events-none absolute right-4 top-4"
                          style={{
                            width: 96,
                            height: 96,
                            color: "#b07a5a14",
                            strokeWidth: 1.2,
                          }}
                        />

                        {/* Floating quote bubble on left edge */}
                        <div
                          className="absolute -left-8 top-10 hidden h-14 w-14 items-center justify-center rounded-full md:flex"
                          style={{
                            background: "var(--card)",
                            boxShadow: "var(--neu)",
                          }}
                        >
                          <QuoteIcon
                            style={{
                              width: 24,
                              height: 24,
                              color: "#b07a5a99",
                              transform: "scaleX(-1)",
                              strokeWidth: 2.5,
                            }}
                          />
                        </div>

                        <p
                          className="relative z-10 font-serif text-base leading-[1.85] sm:text-[17px]"
                          style={{ color: "#3b1f12cc" }}
                        >
                          {active.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Slider dot indicators ── */}
            <div className="mt-10 flex justify-center">
              <div
                className="flex items-center gap-3 rounded-full px-5 py-3"
                style={{ boxShadow: "var(--neu-pill)", background: "var(--card)" }}
              >
                {testimonials.map((_, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className="group relative flex h-3 items-center"
                    >
                      <span
                        className="block rounded-full transition-all duration-500"
                        style={
                          isActive
                            ? {
                              height: 10,
                              width: 32,
                              background:
                                "linear-gradient(135deg, #b05040, #8b3a2a)",
                              boxShadow:
                                "0 0 10px #8b3a2a88, inset 1px 1px 2px #d4826055",
                            }
                            : {
                              height: 10,
                              width: 10,
                              background: "var(--cream-light)",
                              boxShadow:
                                "inset 2px 2px 3px #c4a88244, inset -1px -1px 2px #fff8ef88",
                            }
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}