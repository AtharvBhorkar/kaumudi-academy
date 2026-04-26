import { motion } from "framer-motion";
import { Globe, Home, BookOpen, Sparkles, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Dot() {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{
        background: "oklch(0.72 0.12 65)",
        boxShadow: "0 0 8px oklch(0.72 0.12 65 / 0.6)",
      }}
    />
  );
}

function CarvedPanel({ variant }) {
  return (
    <div
      className="relative h-[170px] w-full rounded-t-[100px] rounded-b-[20px] flex items-end justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.27 0.038 42) 0%, oklch(0.22 0.035 40) 100%)",
        boxShadow:
          "inset 2px 2px 8px oklch(0.5 0.06 60 / 0.15), inset -2px -2px 8px oklch(0.05 0.012 35 / 0.6), 8px 10px 24px oklch(0.05 0.012 35 / 0.7), -4px -4px 12px oklch(0.45 0.05 55 / 0.15)",
      }}
    >
      {/* Inner glow */}
      <div
        className="absolute inset-2 rounded-t-[92px] rounded-b-[14px] pointer-events-none"
        style={{
          boxShadow:
            "inset 0 2px 4px oklch(0.5 0.06 60 / 0.18), inset 0 -2px 4px oklch(0.05 0.012 35 / 0.4)",
        }}
      />
      <svg
        viewBox="0 0 160 170"
        className="relative h-full w-full"
        style={{
          filter:
            "drop-shadow(1px 1px 0 oklch(0.5 0.06 60 / 0.3)) drop-shadow(-1px -1px 0 oklch(0.05 0.012 35 / 0.6))",
        }}
      >
        <defs>
          <linearGradient id={`carve-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.42 0.05 50)" />
            <stop offset="100%" stopColor="oklch(0.28 0.04 45)" />
          </linearGradient>
        </defs>
        {variant === "screen" ? (
          <g
            stroke={`url(#carve-${variant})`}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M30 30 l3 0 M31.5 28.5 l0 3" />
            <path d="M125 35 l3 0 M126.5 33.5 l0 3" />
            <path d="M115 22 l2 0 M116 21 l0 2" />
            <rect x="48" y="55" width="64" height="44" rx="4" />
            <line x1="58" y1="103" x2="102" y2="103" />
            <line x1="78" y1="99" x2="82" y2="99" strokeWidth="3" />
            <path d="M68 72 l12 -4 l12 4 l0 16 l-12 -4 l-12 4 z" />
            <line x1="80" y1="68" x2="80" y2="88" />
            <path d="M40 118 l80 0 l-4 -8 l-72 0 z" />
            <line x1="40" y1="118" x2="120" y2="118" />
            <path d="M36 110 q-6 -8 -2 -16 q6 4 4 14" />
            <path d="M124 110 q6 -8 2 -16 q-6 4 -4 14" />
          </g>
        ) : (
          <g
            stroke={`url(#carve-${variant})`}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M40 35 q4 -3 8 0 q4 -3 8 0" />
            <path d="M105 28 q4 -3 8 0 q4 -3 8 0" />
            <path d="M38 70 l42 -28 l42 28 z" />
            <line x1="80" y1="42" x2="80" y2="36" />
            <circle cx="80" cy="34" r="2" />
            <rect x="48" y="70" width="64" height="48" />
            <path d="M72 118 l0 -22 q8 -8 16 0 l0 22" />
            <rect x="56" y="80" width="10" height="12" />
            <rect x="94" y="80" width="10" height="12" />
            <circle cx="128" cy="92" r="12" />
            <line x1="128" y1="104" x2="128" y2="118" />
            <line x1="32" y1="130" x2="128" y2="130" />
            <line x1="40" y1="134" x2="60" y2="134" />
            <line x1="100" y1="134" x2="120" y2="134" />
          </g>
        )}
      </svg>
    </div>
  );
}

function BigCard({ icon, title, description, cta, carving, to }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative rounded-[30px] p-7 md:p-8"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.32 0.042 42), oklch(0.26 0.038 40))",
        boxShadow:
          "-8px -8px 20px oklch(0.45 0.05 55 / 0.15), 12px 14px 30px oklch(0.05 0.012 35 / 0.8), inset 2px 2px 4px oklch(0.5 0.06 60 / 0.12), inset -2px -2px 4px oklch(0.05 0.012 35 / 0.5)",
      }}
    >
      {/* Inner highlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[30px]"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.55 0.06 60 / 0.18) 0%, transparent 40%, transparent 60%, oklch(0.05 0.012 35 / 0.25) 100%)",
        }}
      />
      {/* Top-right rivet */}
      <span
        className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full"
        style={{
          background: "oklch(0.2 0.03 40)",
          boxShadow:
            "inset 1px 1px 2px oklch(0.05 0.012 35 / 0.9), inset -1px -1px 2px oklch(0.5 0.06 60 / 0.4), 0 0 4px oklch(0.05 0.012 35 / 0.6)",
        }}
      />
      <span
        className="absolute right-5 bottom-5 h-2.5 w-2.5 rounded-full"
        style={{
          background: "oklch(0.2 0.03 40)",
          boxShadow:
            "inset 1px 1px 2px oklch(0.05 0.012 35 / 0.9), inset -1px -1px 2px oklch(0.5 0.06 60 / 0.4), 0 0 4px oklch(0.05 0.012 35 / 0.6)",
        }}
      />

      <div className="relative grid gap-6 md:grid-cols-[1fr_180px] items-center">
        <div>
          <div className="flex items-start gap-4">
            <motion.div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(145deg, oklch(0.55 0.1 58), oklch(0.38 0.07 48))",
                boxShadow:
                  "-4px -4px 10px oklch(0.5 0.07 58 / 0.3), 6px 6px 14px oklch(0.05 0.012 35 / 0.7), inset 1px 1px 2px oklch(0.75 0.1 62 / 0.4), inset -1px -1px 2px oklch(0.15 0.03 38 / 0.6)",
              }}
            >
              {icon}
            </motion.div>
            <h3
              className="font-serif text-[1.7rem] md:text-[1.9rem] font-semibold leading-tight pt-1"
              style={{
                color: "oklch(0.94 0.025 75)",
                textShadow: "0 1px 8px oklch(0.05 0.012 35 / 0.5)",
              }}
            >
              {title}
            </h3>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[oklch(0.82_0.025_70)] max-w-[460px]">
            {description}
          </p>

          <Link to={to}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-[oklch(0.98_0.02_75)]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.12 60), oklch(0.48 0.1 50))",
                boxShadow:
                  "-3px -3px 8px oklch(0.55 0.08 58 / 0.25), 5px 5px 14px oklch(0.05 0.012 35 / 0.7), inset 1px 1px 2px oklch(0.8 0.1 65 / 0.3), inset -1px -1px 2px oklch(0.2 0.04 40 / 0.4)",
              }}
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </Link>
        </div>

        <CarvedPanel variant={carving} />
      </div>
    </motion.div>
  );
}

const Learning = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-24 px-6"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.28 0.04 42) 0%, oklch(0.20 0.032 38) 50%, oklch(0.28 0.04 42) 100%)",
      }}
    >
      {/* Top-left glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.09 65 / 0.5), transparent 70%)",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.1 0.02 38 / 0.7) 100%)",
        }}
      />
      {/* Subtle noise/texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-12"
        >
          {/* ===== LEFT COLUMN ===== */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div variants={fadeUp} className="text-center items-center flex flex-col">
              {/* Pill label */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.32 0.042 42), oklch(0.26 0.038 40))",
                  boxShadow:
                    "-3px -3px 8px oklch(0.45 0.05 55 / 0.18), 5px 5px 14px oklch(0.05 0.012 35 / 0.75), inset 1px 1px 2px oklch(0.5 0.06 60 / 0.15), inset -1px -1px 2px oklch(0.05 0.012 35 / 0.4)",
                }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.55 0.1 58), oklch(0.38 0.07 48))",
                    boxShadow:
                      "inset 1px 1px 2px oklch(0.9 0.05 70 / 0.5)",
                  }}
                >
                  <Sparkles className="h-3 w-3 text-[oklch(0.96_0.025_75)]" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[oklch(0.85_0.04_70)]">
                  Learning Modes
                </span>
              </div>

              <h2
                  className="font-serif text-[2.75rem] md:text-[3.25rem] leading-[1.05] font-semibold tracking-tight text-center"
                style={{
                  color: "oklch(0.94 0.025 75)",
                  textShadow:
                    "0 2px 12px oklch(0.05 0.012 35 / 0.6), 0 1px 0 oklch(0.5 0.06 60 / 0.25)",
                }}
              >
                Your Scholar's
                <br />
                Path: Choose Your
                <br />
                <span style={{ color: "oklch(0.78 0.11 65)" }}>
                  Learning Mode
                </span>
              </h2>

              <div
                className="mt-6 h-[3px] w-20 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.12 65), transparent)",
                }}
              />

              <p className="mt-6 max-w-md mx-auto text-center text-[15px] leading-relaxed text-[oklch(0.82_0.025_70)]">
                We offer flexible learning environments to suit your lifestyle
                while maintaining the traditional rigor of classical Sanskrit
                education.
              </p>
            </motion.div>

            {/* Two small offset feature cards */}
            <motion.div variants={fadeUp} className="flex gap-5 mt-2">
              {/* Cream card */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative flex-1 rounded-[26px] p-6 h-[220px] flex flex-col justify-between"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.88 0.04 72), oklch(0.78 0.055 65))",
                  boxShadow:
                    "-10px -10px 24px oklch(0.45 0.05 55 / 0.18), 16px 18px 36px oklch(0.05 0.012 35 / 0.75), inset 2px 2px 4px oklch(1 0 0 / 0.6), inset -2px -2px 4px oklch(0.6 0.05 60 / 0.2)",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.55 0.1 58), oklch(0.38 0.07 48))",
                    boxShadow:
                      "-3px -3px 8px oklch(0.5 0.07 58 / 0.3), 5px 5px 12px oklch(0.05 0.012 35 / 0.65), inset 1px 1px 2px oklch(0.75 0.1 62 / 0.4), inset -1px -1px 2px oklch(0.15 0.03 38 / 0.5)",
                  }}
                >
                  <BookOpen className="h-5 w-5 text-[oklch(0.96_0.025_75)]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[oklch(0.32_0.04_45)]">
                  Ancestral Methods
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[oklch(0.45_0.04_45)]">
                  Pedagogy rooted in the Guru–Shishya tradition.
                </p>
                <div
                  className="mt-4 h-[2px] w-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.1 50), transparent)",
                  }}
                />
              </motion.div>

              {/* Terracotta card */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative flex-1 rounded-[26px] p-6 h-[220px] flex flex-col justify-between"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.52 0.12 42), oklch(0.38 0.1 38))",
                  boxShadow:
                    "-10px -10px 24px oklch(0.5 0.08 55 / 0.2), 16px 18px 36px oklch(0.05 0.012 35 / 0.75), inset 2px 2px 4px oklch(0.78 0.13 50 / 0.5), inset -2px -2px 4px oklch(0.2 0.05 40 / 0.4)",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.94 0.028 75), oklch(0.78 0.05 65))",
                    boxShadow:
                      "-3px -3px 8px oklch(0.7 0.12 55 / 0.4), 5px 5px 12px oklch(0.15 0.03 38 / 0.6), inset 1px 1px 2px oklch(1 0 0 / 0.6)",
                  }}
                >
                  <Leaf className="h-5 w-5 text-[oklch(0.5_0.115_42)]" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[oklch(0.96_0.025_75)]">
                  Modern Delivery
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[oklch(0.9_0.03_70)]">
                  Interactive digital portals and live HD sessions.
                </p>
                <div
                  className="mt-4 h-[2px] w-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.92 0.025 75), transparent)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <BigCard
              icon={<Globe className="h-6 w-6 text-[oklch(0.96_0.025_75)]" />}
              title="Online Academy"
              description="Study Sanskrit without borders. Participate in real-time sessions, revisit lessons through high-quality recordings, and explore our growing digital archive of classical texts all from the comfort of your home."
              cta="Join Global Batch"
              carving="screen"
              to="/contact"
            />
            <BigCard
              icon={<Home className="h-6 w-6 text-[oklch(0.96_0.025_75)]" />}
              title="Offline Gurukul"
              description="Study Sanskrit in a traditional residential setting guided by experienced acharyas. Engage in daily recitation, close mentorship, and structured discipline that nurtures both scholarship and character."
              cta="Visit Campus"
              carving="temple"
              to="/contact"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Learning;