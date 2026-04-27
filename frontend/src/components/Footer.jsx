import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeToNewsletter } from "../lib/api";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import wheel from "../assets/wheel.webp";
import logo from "../assets/logo-bgremove.webp";
import { getAllCourses } from "../lib/api";

/* ─────────────────────────────────────────
   NEOMORPHIC DESIGN TOKENS  (dark-maroon)
   Same palette as Navbar for cohesion
───────────────────────────────────────── */

const NEO = {
  base:     "#2e0d09",
  surface:  "#3a110d",
  deep:     "#220906",
  gold:     "#d6b15c",
  goldDim:  "rgba(214,177,92,0.35)",
  raised:   "-5px -5px 12px rgba(88,20,10,0.75), 6px 6px 14px rgba(4,0,0,0.92)",
  raisedSm: "-3px -3px 7px rgba(88,20,10,0.7), 3px 3px 8px rgba(4,0,0,0.9)",
  raisedXs: "-2px -2px 5px rgba(88,20,10,0.65), 2px 2px 6px rgba(4,0,0,0.85)",
  inset:    "inset -3px -3px 7px rgba(88,20,10,0.65), inset 3px 3px 8px rgba(4,0,0,0.9)",
  insetSm:  "inset -2px -2px 5px rgba(88,20,10,0.6), inset 2px 2px 6px rgba(4,0,0,0.85)",
  goldGlow: "0 0 18px rgba(214,177,92,0.32), 0 0 36px rgba(214,177,92,0.1)",
};

const socials = [
  { Icon: Instagram, href: "https://www.instagram.com/sanskritstation/", label: "Instagram" },
];

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */

const fadeInUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/* ─────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────── */

function SectionHeading({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <h4 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.15em",
        color: NEO.gold,
        textShadow: `0 0 12px rgba(214,177,92,0.35)`,
        margin: 0,
        whiteSpace: "nowrap",
      }}>
        {children}
      </h4>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          height: 2,
          width: 36,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${NEO.gold}, transparent)`,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   FOOTER LINK ITEM
───────────────────────────────────────── */

function FooterLink({ to, state, children }) {
  return (
    <motion.li
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{ listStyle: "none" }}
    >
      <Link
        to={to}
        state={state}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 500,
          color: "rgba(230,210,195,0.78)",
          textDecoration: "none",
          letterSpacing: "0.04em",
          padding: "5px 0",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = NEO.gold; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(230,210,195,0.78)"; }}
      >
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: NEO.goldDim, flexShrink: 0,
          boxShadow: `0 0 5px rgba(214,177,92,0.4)`,
        }} />
        {children}
      </Link>
    </motion.li>
  );
}

/* ─────────────────────────────────────────
   CONTACT ROW
───────────────────────────────────────── */

function ContactRow({ icon: Icon, href, children }) {
  const inner = (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "10px 14px", borderRadius: 12,
      background: NEO.surface,
      boxShadow: NEO.raisedSm,
      cursor: href ? "pointer" : "default",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = NEO.inset; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = NEO.raisedSm; }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: NEO.base, boxShadow: NEO.insetSm,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={13} color={NEO.gold} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: 500,
        color: "rgba(230,210,195,0.82)", letterSpacing: "0.03em", lineHeight: 1.5,
      }}>
        {children}
      </span>
    </div>
  );

  if (href) return (
    <motion.a
      whileHover={{ y: -1 }}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
    >
      {inner}
    </motion.a>
  );
  return <motion.div whileHover={{ y: -1 }}>{inner}</motion.div>;
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail]           = useState("");
  const [sent, setSent]             = useState(false);
  const [error, setError]           = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses]       = useState([]);

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Kadi%2C+Mehsana%2C+Gujarat%2C+India";

  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res?.courses || res?.data || res || []))
      .catch(() => {});
  }, []);

  const submitEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email)                      { setError("Email is required"); return; }
    if (!emailRegex.test(email.trim())) { setError("Please enter a valid email address"); return; }
    setError(""); setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email.trim());
      setSent(true); setEmail("");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err?.response?.data?.message || "Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseLinks = [
    { label: "Shloks",           key: "shlok" },
    { label: "Spoken Sanskrit",  key: "spoken" },
    { label: "Vyakaran Shastra", key: "vyakaran" },
    { label: "UGC NET",          key: "ugc" },
    { label: "B.A.",             key: "b.a." },
  ].map(({ label, key }) => {
    const match = courses.find(c =>
      c.title?.toLowerCase().includes(key) || c.name?.toLowerCase().includes(key)
    );
    return {
      label,
      to: match ? `/coursedetail/${match._id || match.id}` : "/allcourses",
      state: match ? { course: match } : undefined,
    };
  });

  const quickLinks = [
    { label: "Home",    to: "/#hero" },
    { label: "Courses", to: "/allcourses#hero" },
    { label: "About",   to: "/about#hero" },
    { label: "Faculty", to: "/faculty#hero" },
    { label: "Contact", to: "/contact#hero" },
  ];

  return (
    <>
      {/* ── GLOBAL FONTS (shared with Navbar) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Raleway:wght@400;500;600;700&display=swap');
        .ksa-footer { font-family: 'Raleway', sans-serif; }
        .ksa-footer a { font-family: 'Raleway', sans-serif; }
        .ksa-footer * { box-sizing: border-box; }
      `}</style>

      <footer
        className="ksa-footer"
        style={{ position: "relative", overflow: "hidden", color: "#fff" }}
      >
        {/* ── BACKGROUND WHEEL ── */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.8 }}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${wheel})`,
            backgroundSize: "cover", backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* ── NEOMORPHIC BASE OVERLAY ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(175deg, ${NEO.surface} 0%, ${NEO.base} 40%, ${NEO.deep} 100%)`,
        }} />

        {/* ── GOLD RADIAL ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(214,177,92,0.1), transparent 70%)",
        }} />

        {/* ── TOP ACCENT LINE ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${NEO.gold} 50%, transparent 100%)`,
            transformOrigin: "left",
          }}
        />

        {/* ── MAIN CONTENT ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          style={{
            position: "relative", zIndex: 10,
            maxWidth: 1280, margin: "0 auto",
            padding: "64px 24px 36px",
          }}
        >

          {/* ── GRID ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px 48px",
            marginBottom: 48,
          }}>

            {/* ── COL 1: BRAND ── */}
            <motion.div variants={fadeInUp}>
              {/* brand card */}
              <motion.div
                whileHover={{ y: -2 }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 18px", borderRadius: 16, marginBottom: 20,
                  background: NEO.surface,
                  boxShadow: NEO.raised,
                  border: "1px solid rgba(214,177,92,0.08)",
                  width: "fit-content",
                }}
              >
                {/* logo */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: NEO.base,
                  boxShadow: `${NEO.inset}, inset 0 0 0 1px rgba(214,177,92,0.12)`,
                  display: "grid", placeItems: "center", padding: 6,
                }}>
                  <img src={logo} alt="Kaumudi logo" style={{ width: "100%", filter: "brightness(1.1)" }} />
                </div>

                <div style={{ lineHeight: 1.2 }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 14, fontWeight: 700,
                    letterSpacing: "0.2em", color: NEO.gold,
                    textShadow: `0 0 14px rgba(214,177,92,0.4)`,
                  }}>
                    KAUMUDI
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: 600,
                    letterSpacing: "0.26em", color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase", marginTop: 2,
                  }}>
                    Sanskrit Academy
                  </div>
                </div>
              </motion.div>

              {/* tagline */}
              <p style={{
                fontSize: 12, lineHeight: 1.8,
                color: "rgba(230,210,195,0.65)",
                letterSpacing: "0.04em",
                maxWidth: 240, marginBottom: 24,
              }}>
                Reviving Sanskrit's timeless wisdom through scholarly rigor,
                authentic pedagogy, and global access.
              </p>

              {/* socials */}
              <div style={{ display: "flex", gap: 10 }}>
                {socials.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: NEO.surface,
                      boxShadow: NEO.raisedSm,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(214,177,92,0.12)",
                      textDecoration: "none",
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `${NEO.insetSm}, ${NEO.goldGlow}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = NEO.raisedSm;
                    }}
                  >
                    <Icon size={15} color={NEO.gold} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── COL 2: QUICK LINKS ── */}
            <motion.div variants={fadeInUp}>
              <SectionHeading>Quick Links</SectionHeading>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                {quickLinks.map(({ label, to }) => (
                  <FooterLink key={label} to={to}>{label}</FooterLink>
                ))}
              </ul>
            </motion.div>

            {/* ── COL 3: COURSES ── */}
            <motion.div variants={fadeInUp}>
              <SectionHeading>Courses</SectionHeading>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                {courseLinks.map(({ label, to, state }) => (
                  <FooterLink key={label} to={to} state={state}>{label}</FooterLink>
                ))}
              </ul>
            </motion.div>

            {/* ── COL 4: CONTACT + NEWSLETTER ── */}
            <motion.div variants={fadeInUp}>
              <SectionHeading>Stay Connected</SectionHeading>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                <ContactRow icon={MapPin} href={mapUrl}>
                  Kadi, Mehsana,<br />Gujarat, India
                </ContactRow>
                <ContactRow icon={Mail} href="mailto:ksacademy@gmail.com">
                  ksacademy@gmail.com
                </ContactRow>
                <ContactRow icon={Phone} href="tel:+917567223072">
                  +91 75672 23072
                </ContactRow>
              </div>

              {/* ── NEWSLETTER ── */}
              <motion.div
                whileHover={{ y: -2 }}
                style={{
                  background: NEO.surface,
                  boxShadow: NEO.raised,
                  borderRadius: 16,
                  padding: "18px 16px",
                  border: "1px solid rgba(214,177,92,0.1)",
                }}
              >
                {/* label */}
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                  color: "rgba(214,177,92,0.55)", textTransform: "uppercase", marginBottom: 10,
                }}>
                  Newsletter
                </div>

                {/* input row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    flex: 1, borderRadius: 50,
                    background: NEO.base, boxShadow: NEO.inset,
                    border: `1px solid ${error ? "rgba(240,80,60,0.4)" : "rgba(214,177,92,0.1)"}`,
                    display: "flex", alignItems: "center", padding: "0 14px",
                    transition: "border-color 0.2s",
                  }}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setSent(false); setError(""); }}
                      onKeyPress={e => e.key === "Enter" && submitEmail()}
                      disabled={isSubmitting}
                      style={{
                        flex: 1, background: "transparent", border: "none", outline: "none",
                        fontSize: 12, color: "rgba(230,210,195,0.9)",
                        fontFamily: "'Raleway', sans-serif", letterSpacing: "0.03em",
                        padding: "10px 0",
                      }}
                    />
                  </div>

                  <motion.button
                    onClick={submitEmail}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, #e0be6a, #c49a38 50%, #d6b15c)`,
                      boxShadow: `${NEO.raisedSm}, ${NEO.goldGlow}`,
                      border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = NEO.insetSm; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `${NEO.raisedSm}, ${NEO.goldGlow}`; }}
                    aria-label="Subscribe to newsletter"
                  >
                    {isSubmitting
                      ? <div style={{
                          width: 14, height: 14, borderRadius: "50%",
                          border: "2px solid #2e0d09", borderTopColor: "transparent",
                          animation: "ksa-spin 0.7s linear infinite",
                        }} />
                      : <Send size={14} color="#2e0d09" />
                    }
                  </motion.button>
                </div>

                {/* feedback */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      style={{
                        marginTop: 8, fontSize: 10, fontWeight: 700,
                        color: "rgba(240,130,110,0.9)", letterSpacing: "0.03em",
                      }}
                    >
                      ⚠ {error}
                    </motion.div>
                  )}
                  {sent && !error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      style={{
                        marginTop: 8, fontSize: 10, fontWeight: 700,
                        color: NEO.gold, letterSpacing: "0.03em",
                      }}
                    >
                      ✓ Subscribed successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <motion.div
            variants={fadeInUp}
            style={{
              paddingTop: 24, marginTop: 8,
              background: "transparent",
borderTop: "none",
              display: "flex", flexWrap: "wrap",
              alignItems: "center", justifyContent: "space-between",
              gap: "12px 24px",
            }}
          >
            {/* copyright */}
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.03em", margin: 0 }}>
              © {year} Kaumudi Sanskrit Academy.{" "}
              <span style={{ color: "rgba(214,177,92,0.45)" }}>All Wisdom Reserved.</span>
            </p>

            {/* developer */}
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              Designed & Developed by{" "}
              <a
                href="https://www.athenura.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(214,177,92,0.6)", fontWeight: 700,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = NEO.gold; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(214,177,92,0.6)"; }}
              >
                Athenura India Private Limited
              </a>
            </p>

            {/* policy links */}
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Terms", "Cookies"].map(item => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  style={{
                    fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.4)", textDecoration: "none",
                    letterSpacing: "0.06em", transition: "color 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = NEO.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* spin keyframe */}
        <style>{`@keyframes ksa-spin { to { transform: rotate(360deg); } }`}</style>
      </footer>
    </>
  );
}