import React, { useRef } from "react";
import CountUp from "react-countup";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import rudrakshImg from "../../assets/rudraksh.png";

const SHLOKS = [
  "असतो मा सद्गमय — From falsehood to truth",
  "विद्या ददाति विनयं — Knowledge gives humility",
  "कर्मण्येवाधिकारस्ते — Do your duty without attachment",
  "सर्वे भवन्तु सुखिनः — May all beings be happy",
  "गुरुर्ब्रह्मा गुरुर्विष्णुः — Reverence to the Teacher",
  "उद्यमेन हि सिद्ध्यन्ति — Success comes through effort",
];

const stats = [
  { value: 5000, label: "Students Enrolled", suffix: "+" },
  { value: 50, label: "Courses", suffix: "+" },
  { value: 20, label: "Acharyas", suffix: "+" },
  { value: 10, label: "Countries", suffix: "+" },
];

const neumoLight = {
  background: "#F2E6D9",
  boxShadow: "8px 8px 20px #d4c3b4, -8px -8px 20px #ffffff",
};

const neumoInset = {
  background: "#F2E6D9",
  boxShadow: "inset 6px 6px 14px #d4c3b4, inset -6px -6px 14px #ffffff",
};

const HangingRudraksh = ({ delay = 0, rudrakshSrc = "/rudraksh.png" }) => {
  return (
    <motion.div
      className="absolute top-4 right-0.5 pointer-events-none select-none z-[999]"
      style={{ width: 40, height: 120, transformOrigin: "20px 0px" }}
      animate={{ rotate: [-2.5, 2.5, -2.5] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatType: "loop",
      }}
    >
      <svg
        viewBox="0 0 40 120"
        width="40"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          <linearGradient id={`ropeGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a1a1a" />
            <stop offset="35%" stopColor="#C0392B" />
            <stop offset="65%" stopColor="#e05545" />
            <stop offset="100%" stopColor="#8B1A1A" />
          </linearGradient>
          <filter id={`shadow-${delay}`} x="-40%" y="-20%" width="180%" height="160%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="rgba(60,20,10,0.55)"
            />
          </filter>
          <radialGradient id={`pinGrad-${delay}`} cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#FFE57A" />
            <stop offset="60%" stopColor="#C9860A" />
            <stop offset="100%" stopColor="#7A4A00" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="6" r="8" fill={`url(#pinGrad-${delay})`} />
        <circle
          cx="18.5"
          cy="4.5"
          r="1.5"
          fill="none"
          stroke="rgba(255,240,160,0.7)"
          strokeWidth="0.7"
        />

        <path
          d="M 20 12 Q 28 65 20 110"

          stroke={`url(#ropeGrad-${delay})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 20 11 Q 17 46 20 80"
          stroke="rgba(180,60,40,0.25)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="20"
          cy="111.5"
          rx="3.8"
          ry="2.6"
          fill="#8B2500"
          opacity="0.9"
        />
        <ellipse
          cx="20"
          cy="111"
          rx="2.5"
          ry="1.6"
          fill="#C0392B"
          opacity="0.7"
        />
        <foreignObject x="-40" y="85" width="120" height="120">
          {rudrakshSrc ? (
            <img
              src={rudrakshSrc}
              alt="rudraksh"
              width="120"
              height="120"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                filter: "drop-shadow(0 12px 18px rgba(60,20,10,0.9))",
                display: "block",
              }}
            />
          ) : (
            <svg viewBox="0 0 30 30" width="30" height="30">
              <defs>
                <radialGradient id="rdGrad" cx="38%" cy="32%" r="65%">
                  <stop offset="0%" stopColor="#b07040" />
                  <stop offset="45%" stopColor="#7a3e18" />
                  <stop offset="100%" stopColor="#3d1a06" />
                </radialGradient>
              </defs>
              <circle cx="15" cy="15" r="13" fill="url(#rdGrad)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 15 + 5 * Math.cos(rad);
                const y1 = 15 + 5 * Math.sin(rad);
                const x2 = 15 + 11.5 * Math.cos(rad);
                const y2 = 15 + 11.5 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                );
              })}
              {[
                [10, 10], [20, 10], [15, 7],
                [9, 17], [21, 17], [15, 22],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.1" fill="rgba(0,0,0,0.22)" />
              ))}
              {/* Highlight */}
              <ellipse cx="11" cy="10" rx="3.5" ry="2" fill="rgba(255,200,140,0.18)" />
            </svg>
          )}
        </foreignObject>
      </svg>
    </motion.div>
  );
};

const StatsCard = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
  <>
    <style>{styles}</style>

    <section
      ref={ref}
      style={{ background: "#F2E6D9" }}
      className="relative pt-16 pb-6 sm:pt-20 sm:pb-8 overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30"
        css={{
          background: "radial-gradient(circle, #D19A5B 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              color: "#B86A45",
              ...neumoInset,
              letterSpacing: "0.2em",
            }}
          >
            Our Impact in Numbers
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                boxShadow: "12px 12px 28px #c8b09e, -12px -12px 28px #ffffff",
                transition: { duration: 0.3 },
              }}
              className="relative z-0 rounded-3xl flex flex-col items-center justify-center py-8 px-4 cursor-default overflow-visible shine-card"
              style={neumoLight}
            >
              <HangingRudraksh
                delay={i * 0.9}
                rudrakshSrc={rudrakshImg} /* ← replace with your actual image path */
              />
              <motion.div
                className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full"
                style={{ background: "#D19A5B" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
              <div
                className="w-full flex flex-col items-center justify-center py-5 px-3 rounded-2xl mb-3"
                style={neumoInset}
              >
                <span
                  className="font-black text-3xl sm:text-4xl md:text-5xl leading-none"
                  style={{
                    color: "#B86A45",
                    fontFamily: "'Georgia', serif",
                    textShadow:
                      "1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(180,130,90,0.3)",
                  }}
                >
                  <CountUp
                    end={item.value}
                    duration={2.2}
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />
                  {item.suffix}
                </span>
              </div>

              <p
                className="uppercase tracking-wider text-center font-bold text-[10px] sm:text-xs"
                style={{ color: "#A46A3F" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="mt-14 sm:mt-20 h-14 sm:h-16 overflow-hidden flex items-center"
        style={{
          background: "#B86A45",
          boxShadow:
            "inset 0 4px 12px rgba(90,54,38,0.3), inset 0 -4px 12px rgba(255,255,255,0.08)",
        }}
      >
        <motion.div
          className="inline-flex gap-14 whitespace-nowrap pr-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            color: "#F2E6D9",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
          }}
        >
          {[...SHLOKS, ...SHLOKS].map((text, i) => (
            <span key={i} className="flex items-center gap-5 opacity-90">
              <span className="tracking-wide">{text}</span>
              <Sparkles style={{ color: "#D19A5B", width: 16, height: 16 }} />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
</>
);
};
const styles = `
.shine-card {
  position: relative;
  overflow: hidden;
}

.shine-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.6),
    transparent
  );
  transform: skewX(-25deg);
}

.shine-card:hover::before {
  animation: shine 0.8s ease forwards;
}

@keyframes shine {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}
`;
export default StatsCard;