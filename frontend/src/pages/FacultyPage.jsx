import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import heroBgVideo from "../assets/hero-bg1.mp4";
import faculty1 from "../assets/about/about3.webp";
import faculty2 from "../assets/about/about4.webp";
import faculty3 from "../assets/about/about5.webp";
import faculty4 from "../assets/home/faculty2.webp";
import faculty5 from "../assets/home/faculty3.webp";
import faculty6 from "../assets/home/faculty4.webp";

const FacultyPage = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  const facultyMembers = [
    {
      name: "Dr. Ananth Narayan",
      role: "HOD · Vyakarana Shastra",
      image: faculty1,
      bio: "A PhD from BHU with 20 years of experience in Paninian Grammar. Expert in the Mahabhashya tradition.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6b15c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
    {
      name: "Acharya Meera Iyer",
      role: "Dean · Vedic Studies",
      image: faculty2,
      bio: "Specializes in Rigveda Bhashya and Advaita Vedanta.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50" y="78" textAnchor="middle" fontSize="72" fontFamily="serif" fill="#d6b15c">ॐ</text>
        </svg>
      ),
    },
    {
      name: "Pandit Rajiv Misra",
      role: "Senior Lecturer · Sahitya",
      image: faculty3,
      bio: "Scholar in Kavyashastra and Dramaturgy.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6b15c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
        </svg>
      ),
    },
    {
      name: "Vidushi Priya Sharma",
      role: "Instructor · Spoken Sanskrit",
      image: faculty4,
      bio: "Dedicated to conversational Sanskrit.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6b15c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
    },
    {
      name: "Swami Vidyananda",
      role: "Chief of Darshana Studies",
      image: faculty5,
      bio: "Master of Nyaya & Vedanta philosophy.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6b15c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      ),
    },
    {
      name: "Prof. Rahul Dev",
      role: "Expert · Epigraphy",
      image: faculty6,
      bio: "Unlocking history through inscriptions.",
      subjectIcon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6b15c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
  ];

  const seo = (
    <SEO
      title="Our Acharyas | Faculty of Kaumudi Sanskrit Academy"
      description="Meet our team of scholars at Kaumudi Sanskrit Academy, a venture of Graphura India Private Limited. Experts in Paninian Grammar, Vedanta, and Kavya."
      canonicalPath="/faculty"
      og={{ type: "website" }}
      keywords={[
        "Sanskrit scholars India",
        "Acharya Ananth Narayan",
        "Sanskrit teachers",
        "Kaumudi Academy faculty",
        "Graphura India education team",
        "Vedanta experts online",
        "Vyakarana instructors",
      ]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Faculty",
          description:
            "Meet our Acharyas and faculty who guide students across Vyakarana, Vedanta, Kavya and more.",
          url:
            (typeof window !== "undefined" ? window.location.origin : "") +
            "/faculty",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item:
                (typeof window !== "undefined" ? window.location.origin : "") + "/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Faculty",
              item:
                (typeof window !== "undefined" ? window.location.origin : "") +
                "/faculty",
            },
          ],
        },
      ]}
    />
  );

  return (
    <>
      {seo}

      <style>{`
        @keyframes shineSlide {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 220, 120, 0.45) 50%,
            transparent 100%
          );
          transform: translateX(-100%) skewX(-15deg);
          transition: none;
          border-radius: 9999px;
          pointer-events: none;
        }
        .btn-shine:hover::after {
          animation: shineSlide 0.6s ease forwards;
        }

        @keyframes cardShine {
          0%   { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
        }
        .faculty-card {
          position: relative;
          overflow: hidden;
        }
        .faculty-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 220, 120, 0.18) 40%,
            rgba(255, 255, 255, 0.10) 50%,
            rgba(255, 220, 120, 0.18) 60%,
            transparent 100%
          );
          transform: translateX(-100%) skewX(-20deg);
          opacity: 0;
          pointer-events: none;
          z-index: 20;
          border-radius: 24px;
        }
        .faculty-card:hover::before {
          animation: cardShine 0.85s ease forwards;
        }
        .faculty-card:hover .faculty-img {
          transform: scale(1.10);
        }
        .faculty-img {
          transition: transform 0.7s ease;
        }
        .action-icon-btn {
          transition: transform 0.25s ease, color 0.25s ease;
          cursor: pointer;
        }
        .action-icon-btn:hover {
          transform: rotate(-12deg) scale(1.2);
          color: #d6b15c;
        }
      `}</style>

      {/* ───────────── HERO ───────────── */}
      {/* 
        KEY CHANGE: 
        - Changed min-h-[90vh] → h-screen (exact full viewport height, no cut)
        - Added w-screen to video and overlays to guarantee full width
        - Used h-full on inner motion div so content stays centered in full height
      */}
      <section
        className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
      >
        {/* Background Video — covers exactly 100vh × 100vw */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>

        {/* Dark colour overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#5a3626", opacity: 0.2, zIndex: 1 }}
        />

        {/* Radial vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(214,177,92,0.20) 0%, rgba(90,54,38,0.50) 55%, rgba(30,18,10,0.20) 100%)",
          }}
        />

        {/* Ambient glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.14, 0.26, 0.14] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{ zIndex: 2, width: 420, height: 420, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(214,177,92,0.28) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute rounded-full pointer-events-none"
          style={{ zIndex: 2, width: 680, height: 680, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(214,177,92,0.14) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ x: [-10, 10, -10], y: [-8, 8, -8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{ zIndex: 2, top: "12%", left: "8%", background: "radial-gradient(circle, rgba(214,177,92,0.25) 0%, transparent 70%)", filter: "blur(18px)" }}
        />
        <motion.div
          animate={{ x: [8, -8, 8], y: [6, -6, 6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute w-44 h-44 rounded-full pointer-events-none"
          style={{ zIndex: 2, bottom: "10%", right: "7%", background: "radial-gradient(circle, rgba(214,177,92,0.18) 0%, transparent 70%)", filter: "blur(22px)" }}
        />
        <motion.div
          animate={{ x: [-6, 6, -6], y: [10, -10, 10] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{ zIndex: 2, top: "15%", right: "10%", background: "radial-gradient(circle, rgba(255,220,120,0.20) 0%, transparent 70%)", filter: "blur(14px)" }}
        />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative max-w-3xl px-6"
          style={{ zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3">
              <svg width="55" height="8" viewBox="0 0 55 8" fill="none"><line x1="0" y1="4" x2="55" y2="4" stroke="#d6b15c" strokeWidth="2"/></svg>
              <span className="text-[#d6b15c] uppercase tracking-[0.3em] text-xs font-bold whitespace-nowrap">Our Mentors</span>
              <svg width="55" height="8" viewBox="0 0 55 8" fill="none"><line x1="0" y1="4" x2="55" y2="4" stroke="#d6b15c" strokeWidth="2"/></svg>
            </div>
            <svg width="80" height="36" viewBox="0 0 80 36" fill="none">
              <line x1="0" y1="18" x2="22" y2="18" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
              <line x1="58" y1="18" x2="80" y2="18" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
              <path d="M40 4 L44 18 L40 32 L36 18 Z" fill="none" stroke="#d6b15c" strokeWidth="1.6"/>
              <circle cx="40" cy="18" r="4" fill="none" stroke="#d6b15c" strokeWidth="1.6"/>
              <path d="M26 18 C30 14, 34 14, 36 18 C34 22, 30 22, 26 18 Z" fill="none" stroke="#d6b15c" strokeWidth="1.6"/>
              <path d="M54 18 C50 14, 46 14, 44 18 C46 22, 50 22, 54 18 Z" fill="none" stroke="#d6b15c" strokeWidth="1.6"/>
              <circle cx="40" cy="5" r="1.8" fill="#d6b15c"/>
              <circle cx="40" cy="31" r="1.8" fill="#d6b15c"/>
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-5 font-serif text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Guided by Tradition <br />
            <span className="italic" style={{
              color: "transparent",
              backgroundImage: "linear-gradient(135deg, #f5e6a3 0%, #e8c84a 40%, #d4a820 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
            }}>
              and Excellence
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <line x1="0" y1="5" x2="52" y2="5" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
              <circle cx="57" cy="5" r="2.5" fill="#d6b15c" opacity="0.9"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="none" stroke="#d6b15c" strokeWidth="1.8"/>
              <circle cx="7" cy="7" r="2.5" fill="#d6b15c"/>
            </svg>
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <circle cx="3" cy="5" r="2.5" fill="#d6b15c" opacity="0.9"/>
              <line x1="8" y1="5" x2="60" y2="5" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-gray-200 text-lg leading-relaxed"
          >
            Learn with scholars rooted in{" "}
            <span className="italic text-[#d6b15c]">parampara</span>{" "}
            and fluent in modern pedagogy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.88 }}
            className="mt-10 flex flex-row justify-center gap-3 sm:gap-5"
          >
            <Link to="/allcourses">
              <motion.span
                whileHover={{ scale: 1.06, y: -3, boxShadow: "0 20px 50px rgba(214,177,92,0.35), 0 4px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22)", background: "rgba(214, 177, 92, 0.22)", borderColor: "rgba(214, 177, 92, 0.75)" }}
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="btn-shine relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-bold cursor-pointer overflow-hidden text-sm sm:text-base"
                style={{ background: "rgba(214, 177, 92, 0.13)", border: "1px solid rgba(210, 154, 23, 0.55)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", color: "#d6b15c", boxShadow: "0 16px 32px rgba(214,177,92,0.13), 0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease", whiteSpace: "nowrap" }}
              >
                <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)" }} />
                <BookOpen size={18} className="relative z-10 shrink-0" style={{ color: "#d6b15c" }} />
                <span className="relative z-10 tracking-wide">Explore Courses</span>
              </motion.span>
            </Link>

            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.06, y: -3, boxShadow: "0 20px 50px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.16)", background: "rgba(123, 72, 51, 0.45)", borderColor: "rgba(236, 177, 38, 0.55)" }}
                whileTap={{ scale: 0.96, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="btn-shine relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-bold cursor-pointer overflow-hidden text-sm sm:text-base"
                style={{ background: "rgba(123, 72, 51, 0.3)", border: "1px solid rgba(236, 177, 38, 0.35)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", color: "#e8d5a3", boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.10)", transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease", whiteSpace: "nowrap" }}
              >
                <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)" }} />
                <svg className="relative z-10 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8d5a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="relative z-10 tracking-wide">Contact Academy</span>
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────── FACULTY GRID SECTION ───────────── */}
      <section
        className="relative py-14 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #f2e6d9 0%, #f2e6d9 30%, #f2e6d9 60%, #f2e6d9 100%)",
        }}
      >
        {/* Ambient background orbs */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(214,177,92,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(214,177,92,0.15) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(214,177,92,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>

          {/* ── SECTION HEADING ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg width="55" height="8" viewBox="0 0 55 8" fill="none"><line x1="0" y1="4" x2="55" y2="4" stroke="#b8862a" strokeWidth="1.5"/></svg>
              <span className="uppercase tracking-[0.35em] text-xs font-bold whitespace-nowrap" style={{ color: "#b8862a" }}>Meet the Acharyas</span>
              <svg width="55" height="8" viewBox="0 0 55 8" fill="none"><line x1="0" y1="4" x2="55" y2="4" stroke="#b8862a" strokeWidth="1.5"/></svg>
            </div>

            <h2
              className="font-serif text-4xl md:text-5xl font-extrabold mb-5"
              style={{
                color: "transparent",
                backgroundImage: "linear-gradient(135deg, #c8920a 0%, #a8720a 45%, #8a5c08 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Guidance
            </h2>

            <div className="flex items-center justify-center gap-2 mb-6">
              <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
                <line x1="0" y1="5" x2="52" y2="5" stroke="#b8862a" strokeWidth="1.8" opacity="0.8"/>
                <circle cx="57" cy="5" r="2.5" fill="#b8862a" opacity="0.8"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="none" stroke="#b8862a" strokeWidth="1.8"/>
                <circle cx="7" cy="7" r="2.5" fill="#b8862a"/>
              </svg>
              <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
                <circle cx="3" cy="5" r="2.5" fill="#b8862a" opacity="0.8"/>
                <line x1="8" y1="5" x2="60" y2="5" stroke="#b8862a" strokeWidth="1.8" opacity="0.8"/>
              </svg>
            </div>

            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(100, 65, 20, 0.80)" }}>
              Our Acharyas carry forward centuries of unbroken{" "}
              <span className="italic" style={{ color: "#b8862a" }}>parampara</span>, blending
              the depth of Vedic tradition with the clarity of modern scholarship.
            </p>
          </motion.div>

          {/* ── CARD GRID ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {facultyMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="faculty-card rounded-3xl overflow-hidden flex flex-col h-full"
                style={{
                  background: "rgba(255, 248, 235, 0.75)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "3px solid #6f422f",
                  boxShadow: "0 16px 32px rgba(120, 80, 20, 0.15), 0 8px 8px rgba(120, 80, 20, 0.10), inset 0 1px 0 rgba(255,255,255,0.70)",
                }}
              >
                {/* Image area */}
                <div
                  className="relative overflow-hidden w-full p-2"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="faculty-img w-full h-full object-cover object-top"
                    style={{ borderRadius: 16 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 20%, rgba(213, 138, 24, 0.25) 100%)",
                      zIndex: 1,
                    }}
                  />
                  <div
                    className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                    style={{
                      zIndex: 2,
                      width: 36,
                      height: 36,
                      background: "rgba(0, 0, 0, 0.85)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(184, 134, 42, 0.55)",
                      boxShadow: "0 0 12px rgba(184,134,42,0.25)",
                    }}
                  >
                    {member.subjectIcon}
                  </div>
                </div>

                {/* Content area */}
                <div
                  className="flex flex-col flex-1 px-6 pt-5 pb-5"
                  style={{
                    backgroundImage: i === 0
                      ? "url('https://i.pinimg.com/736x/69/0c/c6/690cc6c88f55338fa4d3eae5d0067259.jpg')"
                      : i === 1
                      ? "url('https://i.pinimg.com/1200x/1d/1c/53/1d1c53e1da00e4e474e75be2c2d90cbf.jpg')"
                      : i === 2
                      ? "url('https://i.pinimg.com/736x/5a/55/d9/5a55d94c0894a02fd5c2e0ea2934f19a.jpg')"
                      : i === 3
                      ? "url('https://i.pinimg.com/474x/dd/c2/fb/ddc2fb20e28f3ddbdd31b782042e6bc1.jpg')"
                      : i === 4
                      ? "url('https://i.pinimg.com/474x/36/1d/ed/361ded87fb2b22c0ab479099f463cec4.jpg')"
                      : "url('https://i.pinimg.com/474x/fc/91/a9/fc91a942d7250db3a55a70069023cdc6.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}
                >
                  {/* Overlay */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255, 248, 235, 0.55)",
                    zIndex: 0,
                  }} />

                  <h3
                    className="font-serif text-xl font-bold mb-1"
                    style={{ color: "#3d1e0a", position: "relative", zIndex: 1 }}
                  >
                    {member.name}
                  </h3>

                  <p
                    className="text-xs font-bold uppercase mb-3"
                    style={{ color: "#d19a5b", letterSpacing: "0.18em", position: "relative", zIndex: 1 }}
                  >
                    {member.role}
                  </p>

                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "rgba(80, 45, 15, 0.75)", position: "relative", zIndex: 1 }}
                  >
                    {member.bio}
                  </p>

                  <div className="flex items-center my-4" style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex-1 h-px" style={{ background: "#5a3626" }} />
                    <div
                      className="mx-2 w-2 h-2 rounded-full"
                      style={{
                        background: "#b8862a",
                        boxShadow: "0 0 8px rgba(184,134,42,0.6), 0 0 16px rgba(184,134,42,0.3)",
                      }}
                    />
                    <div className="flex-1 h-px" style={{ background: "#5a3626" }} />
                  </div>

                  <div className="flex gap-4 items-center" style={{ position: "relative", zIndex: 1 }}>
                    <Link to="/allcourses">
                      <motion.div
                        className="action-icon-btn"
                        whileHover={{ rotate: -12, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ color: "#a46a3f" }}
                        title="Explore Courses"
                      >
                        <BookOpen size={18} />
                      </motion.div>
                    </Link>

                    <motion.div
                      className="action-icon-btn"
                      whileHover={{ rotate: -12, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{ color: "#a46a3f" }}
                      title="Faculty Profile"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </motion.div>

                    <Link to="/auth">
                      <motion.div
                        className="action-icon-btn"
                        whileHover={{ rotate: -12, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ color: "#a46a3f" }}
                        title="Student Login"
                      >
                        <ScrollText size={18} />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section
        className="relative py-28 text-center text-white overflow-hidden"
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
        onTouchStart={() => setCtaHovered(true)}
        onTouchEnd={() => setTimeout(() => setCtaHovered(false), 1000)}
      >
        <div
          className="absolute inset-0"
          style={{ zIndex: 0, transform: ctaHovered ? "scale(1.10)" : "scale(1)", transition: "transform 1200ms ease-out" }}
        >
          <img
            src="https://i.pinimg.com/736x/ab/1d/bc/ab1dbc62e37b557d23439d166f095772.jpg"
            alt="cta background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ backgroundColor: "#000000", opacity: 0.8, zIndex: 1 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(214,177,92,0.18) 0%, rgba(90,54,38,0.45) 60%, transparent 100%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-6"
          style={{ zIndex: 10 }}
        >
          <GraduationCap size={72} className="mx-auto text-[#d6b15c] mb-5" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Learn from the Best</h2>

          <div className="flex items-center justify-center gap-2 mb-8">
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <line x1="0" y1="5" x2="52" y2="5" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
              <circle cx="57" cy="5" r="2.5" fill="#d6b15c" opacity="0.9"/>
            </svg>
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="none" stroke="#d6b15c" strokeWidth="1.8"/>
              <circle cx="7" cy="7" r="2.5" fill="#d6b15c"/>
            </svg>
            <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
              <circle cx="3" cy="5" r="2.5" fill="#d6b15c" opacity="0.9"/>
              <line x1="8" y1="5" x2="60" y2="5" stroke="#d6b15c" strokeWidth="1.8" opacity="0.9"/>
            </svg>
          </div>

          <p className="text-lg text-gray-200 mb-10">
            Join our courses and receive mentorship from distinguished scholars.
          </p>

          <Link to="/allcourses">
            <motion.span
              whileHover={{ scale: 1.06, y: -3, boxShadow: "0 20px 50px rgba(214,177,92,0.40)", background: "rgba(214, 177, 92, 0.28)", borderColor: "rgba(214, 177, 92, 0.80)" }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="btn-shine relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold cursor-pointer overflow-hidden text-base"
              style={{ background: "rgba(214, 177, 92, 0.15)", border: "1px solid rgba(210, 154, 23, 0.60)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", color: "#d6b15c", boxShadow: "0 16px 32px rgba(214,177,92,0.15), 0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease", whiteSpace: "nowrap" }}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)" }} />
              <BookOpen size={20} className="relative z-10 shrink-0" />
              <span className="relative z-10 tracking-wide">Explore Courses</span>
            </motion.span>
          </Link>
        </motion.div>
      </section>

      <div className="h-10" style={{ background: "#f2e6d9" }} />
    </>
  );
};

export default FacultyPage;