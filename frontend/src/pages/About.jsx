import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { BookOpen, ScrollText } from "lucide-react";
import SEO from "../components/SEO";
import aboutVideo from "../assets/about/about1.mp4";
import about2 from "../assets/about/about2.webp";
import about3 from "../assets/about/about3.webp";
import about4 from "../assets/about/about4.webp";
import about5 from "../assets/about/about5.webp";

export default function About() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const stats = [
    { value: 5000, label: "Students Enrolled" },
    { value: 50,   label: "Courses"           },
    { value: 20,   label: "Acharyas"          },
    { value: 10,   label: "Countries"         },
  ];

  // ── Faculty data — now includes subjectIcon for the badge ──
  const facultyMembers = [
    {
      image:       about3,
      name:        "Dr. Ananth Narayan",
      role:        "Hod · Vyakarana Shastra",
      bio:         "A PhD from BHU with 20 years of experience in Paninian Grammar. Expert in the Mahabhashya tradition.",
      subjectIcon: <span style={{ fontSize: 16 }}>📜</span>,
    },
    {
      image:       about4,
      name:        "Acharya Meera Iyer",
      role:        "Dean · Vedic Studies",
      bio:         "Specializes in Rigveda Bhashya and Advaita Vedanta. Renowned for her simplified Sahitya workshops.",
      subjectIcon: <span style={{ fontSize: 16 }}>🪔</span>,
    },
    {
      image:       about5,
      name:        "Pandit Rajiv Misra",
      role:        "Senior Fellow · Manuscriptology",
      bio:         "Leading the academy's digital archival project. Expert in Sarada and Devanagari script variations.",
      subjectIcon: <span style={{ fontSize: 16 }}>🌿</span>,
    },
  ];

  const faqs = [
    {
      q: "Are the courses beginner friendly?",
      a: "Yes. We offer a dedicated 'Praveshika' level crafted for absolute beginners, even for those with no prior familiarity with the Devanagari script or Sanskrit language.",
    },
    {
      q: "Do you provide certification?",
      a: "Yes. Learners receive academically recognized certificates upon successful completion, evaluated by our internal scholarly board.",
    },
    {
      q: "Can I learn at my own pace?",
      a: "Absolutely. We support both live guided cohorts and self-paced study tracks, complete with recorded sessions, curated readings, and practice materials.",
    },
    {
      q: "Are the teachings rooted in traditional Shastra?",
      a: "Yes. Our curriculum is firmly grounded in authentic Shastric traditions while being presented through modern pedagogy for clarity and accessibility.",
    },
    {
      q: "Will I receive guidance from experienced Pandits?",
      a: "Certainly. Our courses are led by seasoned Pandits and scholars trained in the traditional guru-shishya lineage, ensuring depth, discipline, and authenticity.",
    },
  ];

  const missionVisionCards = [
    {
      bg:          "#5A3626",
      hoverBg:     "#6e4230",
      tagColor:    "#D19A5B",
      lineColor:   "#D19A5B",
      glowColor:   "rgba(209,154,91,0.18)",
      borderHover: "#D19A5B",
      symbol:      "◎",
      tag:         "Our Mission",
      title:       "Democratize the Sacred",
      text:        "To make Sanskrit education accessible without diluting its rigor — a structured path for every seeker to master the Divine Language through modern pedagogy and the timeless guru-shishya bond.",
      iconBg:      "rgba(209,154,91,0.18)",
      icon:        "🪔",
      footer:      "Light for every earnest learner",
      particles:   ["ज्ञ", "अ", "ॐ", "श्री"],
    },
    {
      bg:          "#3a2018",
      hoverBg:     "#4d2e1e",
      tagColor:    "#B86A45",
      lineColor:   "#B86A45",
      glowColor:   "rgba(184,106,69,0.18)",
      borderHover: "#B86A45",
      symbol:      "ॐ",
      tag:         "Our Vision",
      title:       "Sanskrit as a Living Voice",
      text:        "To see Sanskrit recognized once again as a living language of science, philosophy, and global dialogue — where the wisdom of the Vedas and Upanishads illuminates modern humanity's deepest challenges.",
      iconBg:      "rgba(184,106,69,0.18)",
      icon:        "🌿",
      footer:      "Rooted in tradition, alive in the world",
      particles:   ["वे", "द", "या", "स्व"],
    },
  ];

  // Background images for the 3 content-area cards
  const cardBgImages = [
    "url('https://i.pinimg.com/736x/69/0c/c6/690cc6c88f55338fa4d3eae5d0067259.jpg')",
    "url('https://i.pinimg.com/1200x/1d/1c/53/1d1c53e1da00e4e474e75be2c2d90cbf.jpg')",
    "url('https://i.pinimg.com/736x/5a/55/d9/5a55d94c0894a02fd5c2e0ea2934f19a.jpg')",
  ];

  const Divider = ({ center = false }) => (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "#D19A5B" }} />
      <span className="h-2 w-2 rounded-full"      style={{ backgroundColor: "#D19A5B" }} />
      <span className="h-[2px] w-10 rounded-full" style={{ backgroundColor: "#D19A5B" }} />
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="About Us | Kaumudi Sanskrit Academy by Graphura India"
        description="Learn more about Kaumudi Sanskrit Academy and our mission to spread Sanskrit education. A premier venture of Graphura India Private Limited."
        canonicalPath="/about"
        og={{ type: "website" }}
        keywords={[
          "About Kaumudi Academy",
          "Graphura India Private Limited",
          "Sanskrit education mission",
          "Sanskrit scholars India",
        ]}
      />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full min-h-[100svh] flex items-center justify-center text-center overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(58,32,24,0.65)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-3xl mx-auto px-5 space-y-5"
        >
          <span
            className="block uppercase tracking-[0.25em] text-xs sm:tracking-[0.35em] sm:text-sm font-bold"
            style={{ color: "#D19A5B" }}
          >
            About Us
          </span>

          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: "#F2E6D9" }}
          >
            Preserving Heritage <br />
            <span className="italic" style={{ color: "#D19A5B" }}>
              for Modern Seekers
            </span>
          </h1>

          <p
            className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(242,230,217,0.82)" }}
          >
            Rooted in guru–śiṣya parampara, refined for contemporary learners,
            we bridge timeless wisdom with professional pedagogy.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 pt-2">
            <a
              href="/allcourses"
              className="flex-shrink-0 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base transition hover:scale-105 hover:brightness-110 whitespace-nowrap"
              style={{ backgroundColor: "#D19A5B", color: "#5A3626" }}
            >
              Explore Courses
            </a>
            <a
              href="/contact"
              className="flex-shrink-0 px-5 py-3 sm:px-8 sm:py-4 rounded-full border-2 font-semibold text-sm sm:text-base transition hover:brightness-110 whitespace-nowrap"
              style={{ borderColor: "#F2E6D9", color: "#F2E6D9" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F2E6D9";
                e.currentTarget.style.color = "#5A3626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#F2E6D9";
              }}
            >
              Contact Academy
            </a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OUR HERITAGE
      ══════════════════════════════════════════════════════ */}
      <section
        className="w-full py-16 sm:py-20 md:py-24 overflow-x-hidden"
        style={{ backgroundColor: "#5A3626" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ color: "#F2E6D9" }}
              >
                Our Heritage
              </h2>

              <Divider />

              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "rgba(242,230,217,0.78)" }}
              >
                Rooted in the classical guru–śiṣya tradition yet responsive to
                contemporary scholarship, the Academy has carefully bridged ancient
                wisdom with modern pedagogical practices. Its curriculum is designed
                not merely to transmit linguistic knowledge, but to cultivate
                disciplined inquiry, clarity of thought, and reverence for textual
                authenticity.
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "rgba(242,230,217,0.78)" }}
              >
                Over the years, Kaumudi Academy has become a meeting ground for
                traditional scholars and modern researchers, fostering dialogue across
                generations. Through rigorous textual analysis, oral recitation, and
                interpretive study, students are guided toward a deeper engagement with
                Sanskrit as a living intellectual tradition rather than a relic of the past.
              </p>

              <blockquote
                className="italic border-l-4 pl-4 text-sm sm:text-base"
                style={{ color: "#D19A5B", borderColor: "#D19A5B" }}
              >
                "We do not just teach a language; we awaken a heritage that has
                pulsed through the Indian subcontinent for millennia."
              </blockquote>

              <p
                className="font-bold text-sm sm:text-base"
                style={{ color: "#F2E6D9" }}
              >
                — Acharya Ramakant Sharma, Founder
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div
                className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4"
                style={{ borderColor: "#EDD9C0" }}
              >
                <img
                  src={about2}
                  alt="Sanskrit Scholar"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(90,54,38,0.50), transparent)",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS + MISSION / VISION
      ══════════════════════════════════════════════════════ */}
      <section
        className="w-full py-16 sm:py-20 md:py-24 lg:py-32"
        style={{ backgroundColor: "#F2E6D9" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-12 sm:pb-16 md:pb-24">
            {stats.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-2xl px-4 py-5 sm:px-6 sm:py-6 text-center"
                style={{
                  backgroundColor: "#5A3626",
                  boxShadow: "0 8px 24px rgba(90,54,38,0.22)",
                }}
              >
                <div
                  className="text-xl sm:text-2xl md:text-3xl font-bold"
                  style={{ color: "#F2E6D9" }}
                >
                  <CountUp
                    end={item.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />+
                </div>
                <div
                  className="uppercase tracking-wide text-[10px] sm:text-xs mt-1 font-bold"
                  style={{ color: "#D19A5B" }}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* MISSION & VISION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
            {missionVisionCards.map((card, i) => {
              const isHovered = hoveredCard === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-default"
                  style={{
                    backgroundColor: isHovered ? card.hoverBg : card.bg,
                    border: `1.5px solid ${isHovered ? card.borderHover + "60" : "transparent"}`,
                    transition: "background-color 0.4s ease, border-color 0.4s ease",
                    boxShadow: isHovered
                      ? `0 20px 60px ${card.glowColor}, 0 0 0 1px ${card.borderHover}22`
                      : "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* animated corner accent top-left */}
                  <motion.div
                    animate={{ width: isHovered ? 60 : 0, height: isHovered ? 60 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ borderTop: `2px solid ${card.tagColor}`, borderLeft: `2px solid ${card.tagColor}`, borderTopLeftRadius: "1rem" }}
                  />

                  {/* animated corner accent bottom-right */}
                  <motion.div
                    animate={{ width: isHovered ? 60 : 0, height: isHovered ? 60 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute bottom-0 right-0 pointer-events-none"
                    style={{ borderBottom: `2px solid ${card.tagColor}`, borderRight: `2px solid ${card.tagColor}`, borderBottomRightRadius: "1rem" }}
                  />

                  {/* floating Sanskrit particles */}
                  {card.particles.map((char, p) => (
                    <motion.span
                      key={p}
                      animate={{
                        opacity: isHovered ? [0, 0.35, 0] : 0,
                        y:       isHovered ? [-10, -50] : 0,
                        x:       isHovered ? [0, (p % 2 === 0 ? 12 : -12)] : 0,
                      }}
                      transition={{ duration: 1.8, delay: p * 0.25, repeat: isHovered ? Infinity : 0, ease: "easeOut" }}
                      className="absolute select-none pointer-events-none font-serif font-bold"
                      style={{ color: card.tagColor, fontSize: "1.1rem", left: `${18 + p * 22}%`, bottom: "18%" }}
                    >
                      {char}
                    </motion.span>
                  ))}

                  {/* shimmer line */}
                  <motion.div
                    animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, ${card.tagColor}, transparent)` }}
                  />

                  {/* faint background symbol */}
                  <motion.div
                    animate={{ rotate: isHovered ? 20 : 0, opacity: isHovered ? 0.14 : 0.08, scale: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute right-[-10px] bottom-[-20px] select-none pointer-events-none leading-none font-serif"
                    style={{ fontSize: "clamp(80px, 15vw, 130px)", color: card.tagColor }}
                  >
                    {card.symbol}
                  </motion.div>

                  {/* main content */}
                  <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5">
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 w-fit border rounded-full px-3 sm:px-4 py-[5px]"
                      style={{
                        borderColor: card.tagColor + "70",
                        color: card.tagColor,
                        backgroundColor: isHovered ? card.tagColor + "18" : "transparent",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <span className="h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full flex-shrink-0" style={{ backgroundColor: card.tagColor }} />
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase font-sans">{card.tag}</span>
                    </motion.div>

                    <motion.h3
                      animate={{ y: isHovered ? -3 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="font-serif text-2xl sm:text-3xl font-bold leading-tight"
                      style={{ color: "#F2E6D9" }}
                    >
                      {card.title}
                    </motion.h3>

                    <motion.div
                      animate={{ width: isHovered ? 80 : 40 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-[2px] rounded-full"
                      style={{ backgroundColor: card.lineColor }}
                    />

                    <p
                      className="text-sm leading-relaxed font-sans"
                      style={{ color: isHovered ? "rgba(242,230,217,0.92)" : "rgba(242,230,217,0.78)", transition: "color 0.3s ease" }}
                    >
                      {card.text}
                    </p>

                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 pt-4 mt-auto"
                      style={{ borderTop: `1px solid ${isHovered ? card.tagColor + "30" : "rgba(242,230,217,0.12)"}`, transition: "border-color 0.4s ease" }}
                    >
                      <motion.div
                        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1.5 }}
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                        style={{ backgroundColor: card.iconBg }}
                      >
                        {card.icon}
                      </motion.div>
                      <span className="text-xs font-sans tracking-wide" style={{ color: "rgba(242,230,217,0.50)" }}>
                        {card.footer}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GUIDING LIGHTS  —  NEW CARD GRID
      ══════════════════════════════════════════════════════ */}
      <section
        className="w-full py-14 sm:py-16 md:py-20"
        style={{ backgroundColor: "#F2E6D9" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-14 md:mb-16 space-y-4">
            <h2
              className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold"
              style={{ color: "#5A3626" }}
            >
              Guiding Lights of Kaumudi
            </h2>
            <Divider center />
            <p className="text-sm sm:text-base" style={{ color: "#A46A3F" }}>
              Learn from the lineage of renowned Pandits and modern linguists.
            </p>
          </div>

          {/* ── CARD GRID (3 members) ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {facultyMembers.slice(0, 3).map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-3xl overflow-hidden flex flex-col h-full"
                style={{
                  background: "rgba(255, 248, 235, 0.75)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "3px solid #6f422f",
                  boxShadow:
                    "0 16px 32px rgba(120, 80, 20, 0.15), 0 8px 8px rgba(120, 80, 20, 0.10), inset 0 1px 0 rgba(255,255,255,0.70)",
                }}
              >
                {/* ── Image area ── */}
                <div
                  className="relative overflow-hidden w-full p-2"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    style={{ borderRadius: 16 }}
                  />

                  {/* Bottom vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 20%, rgba(213, 138, 24, 0.25) 100%)",
                      zIndex: 1,
                    }}
                  />

                  {/* Subject icon badge */}
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

                {/* ── Content area ── */}
                <div
                  className="flex flex-col flex-1 px-5 pt-5 pb-5 m-2 rounded-2xl"
                  style={{
                    backgroundImage: cardBgImages[i] ?? "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}
                >
                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(255, 248, 235, 0.55)",
                      zIndex: 0,
                      borderRadius: 16,
                    }}
                  />

                  {/* Name */}
                  <h3
                    className="font-serif text-xl font-bold mb-1"
                    style={{ color: "#3d1e0a", position: "relative", zIndex: 1 }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p
                    className="text-xs font-bold uppercase mb-3"
                    style={{ color: "#d19a5b", letterSpacing: "0.18em", position: "relative", zIndex: 1 }}
                  >
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "rgba(80, 45, 15, 0.75)", position: "relative", zIndex: 1 }}
                  >
                    {member.bio}
                  </p>

                  {/* Glowing dot divider */}
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

                  {/* Bottom action icons */}
                  <div className="flex gap-4 items-center" style={{ position: "relative", zIndex: 1 }}>
                    <Link to="/allcourses">
                      <motion.div
                        whileHover={{ rotate: -12, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ color: "#a46a3f", cursor: "pointer" }}
                        title="Explore Courses"
                      >
                        <BookOpen size={18} />
                      </motion.div>
                    </Link>

                    <motion.div
                      whileHover={{ rotate: -12, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{ color: "#a46a3f", cursor: "pointer" }}
                      title="Faculty Profile"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </motion.div>

                    <Link to="/auth">
                      <motion.div
                        whileHover={{ rotate: -12, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{ color: "#a46a3f", cursor: "pointer" }}
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

          {/* ── Meet All Faculty CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-14 sm:mt-16"
          >
            <Link to="/faculty" className="group relative inline-flex items-center gap-3 no-underline">
              {/* Glow layer */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: "#D19A5B", transform: "scale(0.85)" }}
              />

              {/* Button shell */}
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className="relative flex items-center gap-3 px-7 py-4 sm:px-9 sm:py-5 rounded-full font-bold text-sm sm:text-base overflow-hidden"
                style={{
                  backgroundColor: "#5A3626",
                  color: "#F2E6D9",
                  border: "1.5px solid #D19A5B55",
                  boxShadow: "0 8px 28px rgba(90,54,38,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Shimmer sweep on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(209,154,91,0.18) 50%, transparent 70%)",
                    animation: "none",
                  }}
                />

                {/* Left Sanskrit ornament */}
                <span
                  className="font-serif text-base sm:text-lg select-none"
                  style={{ color: "#D19A5B", lineHeight: 1 }}
                >
                  ज्ञ
                </span>

                <span className="tracking-wide">Meet All Acharyas</span>

                {/* Animated arrow */}
                <motion.span
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center"
                  style={{ color: "#D19A5B" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </motion.span>
              </motion.span>

              {/* Dot trail decoration */}
              <span className="absolute -right-6 flex gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    animate={{ opacity: [0, 1, 0], x: [0, 6, 12] }}
                    transition={{ duration: 0.8, delay: d * 0.15, repeat: Infinity }}
                    className="block w-[4px] h-[4px] rounded-full"
                    style={{ backgroundColor: "#D19A5B" }}
                  />
                ))}
              </span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ  —  REDESIGNED
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: "#3a2018" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Two-column: sticky left panel + accordion right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">

            {/* LEFT — sticky decorative panel */}
            <div className="lg:sticky lg:top-28 space-y-6">

              <span
                className="block uppercase tracking-[0.3em] text-xs font-bold"
                style={{ color: "#D19A5B" }}
              >
                Jijñāsā · जिज्ञासा
              </span>

              <h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1]"
                style={{ color: "#F2E6D9" }}
              >
                Questions<br />
                <span className="italic" style={{ color: "#D19A5B" }}>&amp; Clarity</span>
              </h2>

              <Divider />

              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "rgba(242,230,217,0.65)" }}
              >
                Every earnest seeker deserves clear answers. If your question
                isn't answered here, write to us — our Acharyas respond personally.
              </p>

              {/* Progress pips */}
              <div className="flex gap-2 pt-2">
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width:  openIndex === i ? 28 : 8,
                      height: 8,
                      backgroundColor: openIndex === i ? "#D19A5B" : "rgba(242,230,217,0.25)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              {/* Large background glyph */}
              <div
                className="font-serif font-extrabold select-none pointer-events-none hidden lg:block"
                style={{
                  fontSize: "clamp(120px, 18vw, 200px)",
                  lineHeight: 1,
                  color: "rgba(209,154,91,0.07)",
                  marginTop: -20,
                  letterSpacing: "-0.04em",
                }}
              >
                {openIndex !== null ? `0${openIndex + 1}` : "ॐ"}
              </div>
            </div>

            {/* RIGHT — accordion */}
            <div className="space-y-3">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="rounded-2xl cursor-pointer overflow-hidden"
                    style={{
                      backgroundColor: isOpen ? "rgba(209,154,91,0.10)" : "rgba(242,230,217,0.05)",
                      border: `1px solid ${isOpen ? "rgba(209,154,91,0.40)" : "rgba(242,230,217,0.10)"}`,
                      transition: "background-color 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    {/* Question row */}
                    <div className="flex items-start gap-4 p-5 sm:p-6">

                      {/* Index number */}
                      <span
                        className="font-serif font-bold text-lg sm:text-xl flex-shrink-0 mt-[1px] w-7 text-right"
                        style={{
                          color: isOpen ? "#D19A5B" : "rgba(242,230,217,0.25)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="font-semibold text-sm sm:text-base leading-snug flex-1"
                        style={{
                          color: isOpen ? "#F2E6D9" : "rgba(242,230,217,0.78)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.q}
                      </span>

                      {/* Animated + icon */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex-shrink-0 mt-[2px]"
                        style={{ color: "#D19A5B" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </motion.span>
                    </div>

                    {/* Answer — animated height reveal */}
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-[4.25rem] text-sm leading-relaxed"
                        style={{ color: "rgba(242,230,217,0.65)" }}
                      >
                        <div
                          className="mb-4 h-[1px] w-10 rounded-full"
                          style={{ backgroundColor: "#D19A5B" }}
                        />
                        {item.a}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4 pt-4 pl-2"
              >
                <span className="text-xs sm:text-sm" style={{ color: "rgba(242,230,217,0.45)" }}>
                  Still have questions?
                </span>
                <a
                  href="/contact"
                  className="text-xs sm:text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-80"
                  style={{ color: "#D19A5B", textDecorationColor: "rgba(209,154,91,0.4)" }}
                >
                  Write to an Acharya →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}