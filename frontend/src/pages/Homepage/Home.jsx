import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Learning from "./Learning";
import About from "./About";
import Faculty from "./Faculty";
import Mission from "./Mission";
import Testimonials from "./Testimonials";
import heroVideo from "../../assets/hero-bg.mp4";
import Typewriter from "./Typewriter";
import SEO from "../../components/SEO";
import StatsCard from "./StatsCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 260, damping: 18 },
};

const buttonTap = { scale: 0.95 };

export default function Home() {
  const [shlokCompleted, setShlokCompleted] = useState(false);

  return (
    <main
      className="bg-[#f1e4c8] text-neutral-900"
      style={{ overflowX: "hidden" }}
    >
      <SEO
        title="Kaumudi Sanskrit Academy | Learn Sanskrit with Experts"
        description="Kaumudi Sanskrit Academy, a venture of Graphura India Private Limited, offers authentic Sanskrit learning in Paninian Grammar, Vedanta, and Kavya. Join our live online courses today."
        canonicalPath="/"
        og={{ type: "website" }}
        keywords={[
          "Kaumudi Sanskrit Academy",
          "Graphura India Private Limited",
          "Sanskrit learning platform",
          "Paninian Grammar",
          "Vedic studies online",
          "Sanskrit certifications India",
          "Ashtadhyayi courses",
          "Sanskrit for beginners",
          "Advanced Sanskrit grammar",
          "Sanskrit scholars academy",
          "Graphura India education",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kaumudi Sanskrit Academy",
            url: typeof window !== "undefined" ? window.location.origin : "",
            logo: "/src/assets/logo-bgremove.webp",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Kaumudi Sanskrit Academy",
            url: typeof window !== "undefined" ? window.location.origin : "",
            potentialAction: {
              "@type": "SearchAction",
              target:
                (typeof window !== "undefined" ? window.location.origin : "") +
                "/allcourses?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        aria-label="Hero Section"
        style={{
          position: "relative",
          width: "100%",
          /* dvh with vh fallback for older iOS */
          height: "100vh",
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",   /* ← kills white-line overflow */
        }}
      >
        {/* Background Video — use 100% NOT 100vw to avoid scrollbar gap */}
        <video
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          ref={(v) => { if (v) v.playbackRate = 0.5; }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.40)",
            zIndex: 1,
          }}
        />

        {/* Warm colour overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(90deg,rgba(118,71,59,0.35) 0%,rgba(110,51,36,0.2) 45%,rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center"
          style={{
            /* Safe padding for notched phones */
            paddingTop: "max(80px, env(safe-area-inset-top, 80px))",
            paddingBottom: "max(40px, env(safe-area-inset-bottom, 40px))",
            paddingLeft: "clamp(16px, 5vw, 80px)",
            paddingRight: "clamp(16px, 5vw, 80px)",
            /* Let content shrink instead of overflowing */
            boxSizing: "border-box",
          }}
        >
          {/* Shlok typewriter */}
          <div
            className="flex items-center justify-center w-full"
            style={{ minHeight: "clamp(80px, 18vw, 170px)" }}
          >
            <h1
              className="font-serif font-black leading-relaxed tracking-wide text-[#d6b15c] whitespace-pre-line drop-shadow-lg"
              style={{ fontSize: "clamp(14px, 3.5vw, 44px)" }}
            >
              <Typewriter
                text={`ज्ञानं मे लेख्यतां देव, बुद्धिर्मे दीयतां सदा ।\nव्यासवाक्यप्रकाशेन, मार्गो मे दर्श्यतां सदा ॥`}
                speed={60}
                startDelay={400}
                onComplete={() => setShlokCompleted(true)}
              />
            </h1>
          </div>

          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={shlokCompleted ? "visible" : "hidden"}
            className="flex flex-col items-center w-full"
          >
            {/* Divider */}
            <div
              className="bg-[#d6b15c] rounded-full"
              style={{
                width: "clamp(60px, 10vw, 128px)",
                height: "3px",
                marginBottom: "clamp(20px, 5vw, 48px)",
              }}
            />

            {/* Heading */}
            <motion.h2
              custom={0.3}
              variants={fadeUp}
              className="font-extrabold tracking-wide text-white drop-shadow-xl"
              style={{ fontSize: "clamp(20px, 5vw, 60px)" }}
            >
              Rediscover the Power of{" "}
              <span className="text-[#d6b15c] font-serif italic">Sanskrit</span>
            </motion.h2>

            {/* Sub-text */}
            <motion.p
              custom={0.4}
              variants={fadeUp}
              className="font-serif text-white/95 leading-relaxed drop-shadow-md max-w-3xl lg:max-w-4xl"
              style={{
                fontSize: "clamp(13px, 2vw, 20px)",
                marginTop: "clamp(12px, 3vw, 24px)",
              }}
            >
              Immerse yourself in the profound heritage of classical Sanskrit
              through our curated traditional and modern learning programs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              className="flex flex-row items-center justify-center w-full flex-wrap"
              style={{
                gap: "clamp(12px, 3vw, 32px)",
                marginTop: "clamp(24px, 5vw, 56px)",
              }}
            >
              <Link to="/allcourses" className="w-auto">
                <motion.span
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#d6b15c] text-[#74271E] font-bold shadow-xl cursor-pointer"
                  style={{
                    padding: "clamp(10px, 2vw, 16px) clamp(24px, 5vw, 36px)",
                    fontSize: "clamp(13px, 2vw, 18px)",
                  }}
                >
                  Explore Courses
                </motion.span>
              </Link>

              <Link to="/contact" className="w-auto">
                <motion.span
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold shadow-lg cursor-pointer"
                  style={{
                    padding: "clamp(10px, 2vw, 16px) clamp(24px, 5vw, 36px)",
                    fontSize: "clamp(13px, 2vw, 18px)",
                  }}
                >
                  Contact Academy
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── REST OF PAGE ───────────────────────────────────────── */}
      <section className="space-y-12 sm:space-y-16 lg:space-y-10">
        <StatsCard />
        <Cards />
        <Learning />
        <About />
        <Faculty />
        <Mission />
        <Testimonials />
      </section>
    </main>
  );
}