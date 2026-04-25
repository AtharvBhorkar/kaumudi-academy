import { motion } from "framer-motion";
import { IoHome } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { BsGlobe } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { Sparkles } from "lucide-react";
import mission1 from "../../assets/home/mission1.webp";

// ─── Animation variants ───────────────────────────────────────────────────────
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

// ─── Feature data ─────────────────────────────────────────────────────────────
const features = [
  {
    title: "Scholarly Heritage",
    desc: "Preserving centuries of linguistic excellence through verified oral and written lineages.",
    icon: <IoHome size={18} />,
    variant: "dark", // dark card style
  },
  {
    title: "Authentic Pedagogy",
    desc: "Traditional methods tailored for modern cognitive learning styles.",
    icon: <RiGraduationCapFill size={18} />,
    variant: "dark",
  },
  {
    title: "Global Community",
    desc: "Connecting Sanskrit enthusiasts across 50+ countries via digital platforms.",
    icon: <BsGlobe size={18} />,
    variant: "cream", // cream rotated card
  },
  {
    title: "Rich Archive",
    desc: "Access to rare manuscripts and curated digital study materials.",
    icon: <IoIosPaper size={18} />,
    variant: "terra", // terracotta rotated card
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Mission() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-24 px-6"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.28 0.04 42) 0%, oklch(0.20 0.032 38) 50%, oklch(0.28 0.04 42) 100%)",
      }}
      aria-labelledby="mission-heading"
    >
      {/* ── Top-left ambient glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.09 65 / 0.5), transparent 70%)",
        }}
      />

      {/* ── Bottom-right terracotta glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.52 0.12 42 / 0.35), transparent 70%)",
          opacity: 0.5,
        }}
      />

      {/* ── Vignette ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.1 0.02 38 / 0.7) 100%)",
        }}
      />

      {/* ── Subtle noise grain ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 items-center gap-16 md:grid-cols-2"
        >
          {/* ════════════════ LEFT ════════════════ */}
          <div className="flex flex-col gap-0">
            <motion.div variants={fadeUp} className="text-center flex flex-col items-center">
              {/* PURPOSE pill */}
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
                    boxShadow: "inset 1px 1px 2px oklch(0.9 0.05 70 / 0.5)",
                  }}
                >
                  <Sparkles className="h-3 w-3 text-[oklch(0.96_0.025_75)]" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[oklch(0.85_0.04_70)] font-sans">
                  Purpose
                </span>
              </div>

              {/* Heading */}
              <h2
                id="mission-heading"
                className="font-serif text-[2.75rem] md:text-[3.25rem] leading-[1.05] font-semibold tracking-tight text-center"
                style={{
                  color: "oklch(0.94 0.025 75)",
                  textShadow:
                    "0 2px 12px oklch(0.05 0.012 35 / 0.6), 0 1px 0 oklch(0.5 0.06 60 / 0.25)",
                }}
              >
                Our Mission
              </h2>

              {/* Accent bar */}
              <div
                className="mt-5 h-[3px] w-20 rounded-full mx-auto"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.12 65), transparent)",
                }}
              />

              {/* Body */}
              <p className="mt-6 max-w-md mx-auto text-center text-[15px] leading-relaxed text-[oklch(0.82_0.025_70)] mb-10">
                Dedicated to reviving the rich Sanskrit heritage through
                structured programs, accessible study materials, and an engaged
                global community of scholars and learners.
              </p>
            </motion.div>

            {/* ── Feature cards ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-5"
            >
              {features.map(({ title, desc, icon, variant }, i) => {
                const isCream = variant === "cream";
                const isTerra = variant === "terra";
                const isOffset = isCream || isTerra;

                return (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="relative rounded-[26px] p-5"
                    style={{
                      background: isCream
                        ? "linear-gradient(145deg, oklch(0.88 0.04 72), oklch(0.78 0.055 65))"
                        : isTerra
                        ? "linear-gradient(145deg, oklch(0.52 0.12 42), oklch(0.38 0.1 38))"
                        : "linear-gradient(145deg, oklch(0.32 0.042 42), oklch(0.26 0.038 40))",
                      boxShadow: isCream
                        ? "-10px -10px 24px oklch(0.45 0.05 55 / 0.18), 16px 18px 36px oklch(0.05 0.012 35 / 0.75), inset 2px 2px 4px oklch(1 0 0 / 0.6), inset -2px -2px 4px oklch(0.6 0.05 60 / 0.2)"
                        : isTerra
                        ? "-10px -10px 24px oklch(0.5 0.08 55 / 0.2), 16px 18px 36px oklch(0.05 0.012 35 / 0.75), inset 2px 2px 4px oklch(0.78 0.13 50 / 0.5), inset -2px -2px 4px oklch(0.2 0.05 40 / 0.4)"
                        : "-8px -8px 20px oklch(0.45 0.05 55 / 0.15), 12px 14px 30px oklch(0.05 0.012 35 / 0.8), inset 2px 2px 4px oklch(0.5 0.06 60 / 0.12), inset -2px -2px 4px oklch(0.05 0.012 35 / 0.5)",
                      transform: isCream
                        ? "rotate(-2deg)"
                        : isTerra
                        ? "rotate(2deg)"
                        : "none",
                      marginTop: isTerra ? "20px" : "0",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4"
                      style={{
                        background: isCream
                          ? "linear-gradient(145deg, oklch(0.55 0.1 58), oklch(0.38 0.07 48))"
                          : isTerra
                          ? "linear-gradient(145deg, oklch(0.94 0.028 75), oklch(0.78 0.05 65))"
                          : "linear-gradient(145deg, oklch(0.55 0.1 58), oklch(0.38 0.07 48))",
                        boxShadow: isCream
                          ? "-3px -3px 8px oklch(0.5 0.07 58 / 0.3), 5px 5px 12px oklch(0.05 0.012 35 / 0.65), inset 1px 1px 2px oklch(0.75 0.1 62 / 0.4)"
                          : isTerra
                          ? "-3px -3px 8px oklch(0.7 0.12 55 / 0.4), 5px 5px 12px oklch(0.15 0.03 38 / 0.6), inset 1px 1px 2px oklch(1 0 0 / 0.6)"
                          : "-4px -4px 10px oklch(0.5 0.07 58 / 0.3), 6px 6px 14px oklch(0.05 0.012 35 / 0.7), inset 1px 1px 2px oklch(0.75 0.1 62 / 0.4)",
                        color: isTerra
                          ? "oklch(0.5 0.115 42)"
                          : "oklch(0.96 0.025 75)",
                      }}
                    >
                      {icon}
                    </div>

                    <h3
                      className="font-serif text-base font-semibold"
                      style={{
                        color: isCream
                          ? "oklch(0.32 0.04 45)"
                          : "oklch(0.94 0.025 75)",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="mt-1.5 text-[13px] leading-relaxed"
                      style={{
                        color: isCream
                          ? "oklch(0.45 0.04 45)"
                          : isTerra
                          ? "oklch(0.9 0.03 70)"
                          : "oklch(0.82 0.025 70)",
                      }}
                    >
                      {desc}
                    </p>

                    {/* Accent line */}
                    <div
                      className="mt-4 h-[2px] w-10 rounded-full"
                      style={{
                        background: isCream
                          ? "linear-gradient(90deg, oklch(0.55 0.1 50), transparent)"
                          : isTerra
                          ? "linear-gradient(90deg, oklch(0.92 0.025 75), transparent)"
                          : "linear-gradient(90deg, oklch(0.52 0.12 42), transparent)",
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ════════════════ RIGHT — neomorphic image frame ════════════════ */}
          <motion.div
            variants={fadeUp}
            className="relative flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[520px]"
              style={{
                borderRadius: "56px 72px 64px 80px / 72px 56px 80px 64px",
                background:
                  "linear-gradient(145deg, oklch(0.32 0.042 42), oklch(0.26 0.038 40))",
                boxShadow:
                  "-8px -8px 20px oklch(0.45 0.05 55 / 0.15), 12px 14px 30px oklch(0.05 0.012 35 / 0.85), inset 2px 2px 4px oklch(0.5 0.06 60 / 0.12), inset -2px -2px 4px oklch(0.05 0.012 35 / 0.5)",
                padding: "18px",
              }}
            >
              {/* Inner cavity */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "44px 62px 54px 70px / 62px 44px 70px 54px",
                  boxShadow:
                    "inset 8px 8px 22px oklch(0.05 0.012 35 / 0.9), inset -4px -4px 14px oklch(0.45 0.05 55 / 0.2)",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src={mission1}
                  alt="Ancient Sanskrit manuscript surrounded by traditional ritual artifacts"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  style={{
                    filter: "saturate(0.9) contrast(1.07) brightness(0.88)",
                  }}
                />

                {/* inner vignette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: "inherit",
                    boxShadow:
                      "inset 0 0 70px rgba(0,0,0,0.6), inset 0 0 24px rgba(0,0,0,0.45)",
                  }}
                />

                {/* bottom gradient overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.15 0.025 38 / 0.65) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Leaf engraving */}
              <svg
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 opacity-35"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M8 56 C 24 40, 40 24, 56 8"
                  stroke="oklch(0.72 0.12 65)"
                  strokeWidth="1.2"
                />
                <path
                  d="M20 44 C 24 38, 30 36, 36 38 C 32 44, 26 46, 20 44 Z"
                  fill="oklch(0.72 0.12 65)"
                  opacity="0.6"
                />
                <path
                  d="M30 34 C 34 28, 40 26, 46 28 C 42 34, 36 36, 30 34 Z"
                  fill="oklch(0.72 0.12 65)"
                  opacity="0.5"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}