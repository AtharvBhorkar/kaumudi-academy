//////////////Contact.jsx


import {
  MapPin,
  Landmark,
  GraduationCap,
  Instagram,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SEO from "../components/SEO";
import { submitContact } from "../lib/api";
import bookflipVideo from "../assets/bookflip.mp4";

/* ─── Palette ─────────────────────────────────── */
const C = {
  cream: "#F2E6D9",
  terracotta: "#bb6A45",
  gold: "#d19A5B",
  brown: "#A46A3F",
  dark: "#5A3626",
};

/* ─── Framer variants ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };

/* ─── Typewriter hook ─────────────────────────── */
function useTypewriter(text, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return displayed;
}

/* ─── CSS injected into <head> ────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; }

/* Global override — force sans-serif everywhere on this page */
.ksa-page, .ksa-page * {
  font-family: 'Inter', 'Poppins', system-ui, -apple-system, sans-serif !important;
}

@keyframes kFloatA  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-26px)} }
@keyframes kFloatB  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(20px)}  }
@keyframes kRotCW   { to { transform:rotate(360deg);  } }
@keyframes kRotCCW  { to { transform:rotate(-360deg); } }

.k-orb-a { animation:kFloatA 9s  ease-in-out infinite; }
.k-orb-b { animation:kFloatB 11s ease-in-out infinite; }
.k-orb-c { animation:kFloatA 14s ease-in-out infinite; }
.k-mcw   { animation:kRotCW  60s linear infinite; }
.k-mccw  { animation:kRotCCW 40s linear infinite; }

/* Neo+glass card */
.k-card {
  background: rgba(242,230,217,.58);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(161,106,63,.32);
  border-radius: 2rem;
  box-shadow:
    10px 10px 28px rgba(90,54,38,.13),
    -5px -5px 16px rgba(255,255,255,.75),
    inset 0 0 30px rgba(90,54,38,.04);
}

/* Info card */
.k-info-card {
  background: rgba(242,230,217,.52);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(161,106,63,.28);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow:
    6px 6px 18px rgba(90,54,38,.10),
    -3px -3px 10px rgba(255,255,255,.70);
  transition: transform .3s ease, box-shadow .3s ease;
}
.k-info-card:hover {
  transform: translateY(-8px);
  box-shadow:
    10px 14px 30px rgba(90,54,38,.17),
    -3px -3px 12px rgba(255,255,255,.80);
}

/* Inputs */
.k-input {
  width: 100%;
  background: rgba(242,230,217,.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(161,106,63,.22);
  border-radius: 13px;
  padding: 13px 17px;
  color: #3d1a0f;
  font-size: .93rem;
  outline: none;
  box-shadow:
    inset 4px 4px 10px rgba(0,0,0,.05),
    inset -3px -3px 8px rgba(255,255,255,.65),
    0 2px 10px rgba(90,54,38,.07);
  transition: box-shadow .25s, border-color .25s;
}
.k-input:focus {
  border-color: rgba(187,106,69,.55);
  box-shadow:
    inset 4px 4px 10px rgba(0,0,0,.07),
    inset -3px -3px 8px rgba(255,255,255,.65),
    0 0 0 2.5px rgba(187,106,69,.28),
    0 4px 18px rgba(90,54,38,.12);
}
.k-input::placeholder { color: rgba(61,26,15,.38); }
.k-select { appearance:none; -webkit-appearance:none; cursor:pointer; }

/* Submit button */
.k-btn {
  width: 100%;
  background: linear-gradient(135deg, #5A3626 0%, #bb6A45 55%, #A46A3F 100%);
  border: none;
  border-radius: 15px;
  color: #F2E6D9;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .18em;
  padding: 15px 28px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow:
    6px 6px 18px rgba(90,54,38,.38),
    inset -2px -2px 8px rgba(255,200,120,.12);
  transition: transform .2s ease, box-shadow .2s ease;
  text-transform: uppercase;
}
.k-btn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,220,150,.15), transparent 55%);
  border-radius: inherit;
  pointer-events: none;
}
.k-btn:hover:not(:disabled) {
  box-shadow:
    8px 8px 26px rgba(90,54,38,.48),
    inset -2px -2px 10px rgba(255,200,120,.16);
  transform: translateY(-2px);
}
.k-btn:active:not(:disabled) { transform: scale(.97); }
.k-btn:disabled { opacity: .6; cursor: not-allowed; }

/* Social icon */
.k-social {
  width: 50px; height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5A3626, #bb6A45);
  display: flex; align-items: center; justify-content: center;
  color: #F2E6D9;
  text-decoration: none;
  box-shadow:
    4px 4px 14px rgba(90,54,38,.4),
    inset -1px -1px 6px rgba(255,200,120,.1);
  transition: transform .25s, box-shadow .25s;
  cursor: pointer;
  flex-shrink: 0;
}
.k-social:hover {
  transform: scale(1.2) rotate(8deg);
  box-shadow: 0 0 24px rgba(187,106,69,.6);
}

/* Label */
.k-label {
  display: block;
  font-size: 10px;
  letter-spacing: .3em;
  font-weight: 700;
  color: #5A3626;
  margin-bottom: 8px;
  text-transform: uppercase;
}

/* Grids */
.k-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}
@media(max-width:640px) {
  .k-form-grid { grid-template-columns: 1fr; }
  .k-col2 { grid-column: span 1 !important; }
}
.k-col2 { grid-column: span 2; }

.k-main-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media(min-width:1024px) { .k-main-grid { grid-template-columns: 1fr 1fr; } }

.k-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media(max-width:640px) { .k-info-grid { grid-template-columns: 1fr; } }

/* Divider line */
.k-divline {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(90,54,38,.28), transparent);
  display: block;
}
`;

/* ─── Decorative SVGs ─────────────────────────── */
const OmBg = () => (
  <svg
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      opacity: 0.055,
      pointerEvents: "none",
      userSelect: "none",
      width: 460,
      height: 460,
    }}
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
  >
    <text
      x="50%"
      y="58%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="72"
      fontFamily="sans-serif"
      fill="#5A3626"
    >
      ॐ
    </text>
  </svg>
);

const Lotus = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
  >
    <ellipse
      cx="20"
      cy="32"
      rx="4"
      ry="8"
      fill="#d19A5B"
      opacity=".9"
      transform="rotate(-30 20 32)"
    />
    <ellipse cx="20" cy="32" rx="4" ry="8" fill="#d19A5B" opacity=".9" />
    <ellipse
      cx="20"
      cy="32"
      rx="4"
      ry="8"
      fill="#d19A5B"
      opacity=".9"
      transform="rotate(30 20 32)"
    />
    <ellipse
      cx="20"
      cy="28"
      rx="5"
      ry="11"
      fill="#d19A5B"
      opacity=".8"
      transform="rotate(-15 20 28)"
    />
    <ellipse
      cx="20"
      cy="28"
      rx="5"
      ry="11"
      fill="#d19A5B"
      opacity=".8"
      transform="rotate(15 20 28)"
    />
    <ellipse cx="20" cy="26" rx="5" ry="13" fill="#F2E6D9" opacity=".85" />
    <circle cx="20" cy="24" r="4" fill="#5A3626" opacity=".85" />
  </svg>
);

const MandalaSVG = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
    {[...Array(16)].map((_, i) => (
      <ellipse
        key={i}
        cx="100"
        cy="100"
        rx="88"
        ry="17"
        stroke="#d19A5B"
        strokeWidth="0.7"
        transform={`rotate(${i * 11.25} 100 100)`}
      />
    ))}
    <circle cx="100" cy="100" r="88" stroke="#d19A5B" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="56" stroke="#bb6A45" strokeWidth="0.4" />
  </svg>
);

/* ─── Reusable text input row (stable, outside Contact) ─── */
function Field({ label, name, type = "text", placeholder, form, onChange }) {
  return (
    <motion.div variants={fadeUp}>
      <label className="k-label">{label}</label>
      <input
        className="k-input"
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange}
        placeholder={placeholder}
      />
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredLevel: "BEGINNER",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const heroTyped = useTypewriter("Contact & Location", 60, 500);

  /* Inject CSS once */
  useEffect(() => {
    const id = "ksa-contact-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async () => {
    setError("");
    setSuccess("");
    if (
      !form.fullName ||
      !form.email ||
      !form.phoneNumber ||
      !form.subject ||
      !form.message
    ) {
      setError("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
      await submitContact({
        fullName: form.fullName,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSuccess("Message sent! We'll respond within one business day. 🙏");
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        preferredLevel: "BEGINNER",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Kaumudi Sanskrit Academy by Graphura India"
        description="Connect with Kaumudi Sanskrit Academy for admissions, scholarly inquiries, and Vedic learning support."
        canonicalPath="/contact"
        og={{ type: "website" }}
        keywords={[
          "Contact Kaumudi Academy",
          "Sanskrit admission inquiries",
          "Vedic education support",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Kaumudi Sanskrit Academy",
            url:
              (typeof window !== "undefined" ? window.location.origin : "") +
              "/contact",
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
                  (typeof window !== "undefined"
                    ? window.location.origin
                    : "") + "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item:
                  (typeof window !== "undefined"
                    ? window.location.origin
                    : "") + "/contact",
              },
            ],
          },
        ]}
      />

      {/* Wrap everything so .ksa-page font override applies */}
      <div className="ksa-page">
        {/* ══════════════════════════════════════
            HERO — full-width video background
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#3a1f10" /* fallback while video loads */,
          }}
        >
          {/* Video — autoPlay + loop + muted + playsInline */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src={bookflipVideo}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Warm dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(160deg,rgba(90,54,38,.75) 0%,rgba(58,31,16,.52) 50%,rgba(90,54,38,.82) 100%)",
            }}
          />

          {/* Rotating mandalas */}
          <div
            className="k-mcw"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-4rem",
              right: "-4rem",
              width: 340,
              height: 340,
              opacity: 0.14,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <MandalaSVG />
          </div>
          <div
            className="k-mccw"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-3rem",
              left: "-3rem",
              width: 260,
              height: 260,
              opacity: 0.11,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <MandalaSVG />
          </div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              zIndex: 3,
              textAlign: "center",
              padding: "5rem 1.5rem",
            }}
          >
            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".75rem",
                marginBottom: "1.1rem",
              }}
            >
              <Lotus />
              <span
                style={{
                  fontSize: "3rem",
                  letterSpacing: ".42em",
                  color: "#e1b27c",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                KAUMUDI SANSKRIT ACADEMY
              </span>
              <Lotus />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              style={{
                color: "#F2E6D9",
                fontSize: "clamp(2rem,5vw,3.6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1.1rem",
                letterSpacing: "-.01em",
                textShadow: "0 4px 28px rgba(0,0,0,.55)",
              }}
            >
              {heroTyped}
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  marginLeft: "4px",
                  background: "#d19A5B",
                  animation: "kFloatA 0.8s step-start infinite",
                  verticalAlign: "middle",
                  height: "0.85em",
                  borderRadius: 2,
                }}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                color: "rgba(242,230,217,.84)",
                fontSize: "clamp(1rem,2vw,1.2rem)",
                fontWeight: 400,
                maxWidth: "40rem",
                margin: "0 auto 2rem",
                lineHeight: 1.6,
              }}
            >
              Connect with us for scholarly inquiries, admissions, and Vedic
              learning support.
            </motion.p>

            {/* Vedic divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                maxWidth: "22rem",
                margin: "0 auto",
              }}
            >
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to right,transparent,rgba(209,154,91,.6),transparent)",
                  display: "block",
                }}
              />
              <span style={{ color: "#d19A5B", fontSize: "1.1rem" }}>✦</span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    "linear-gradient(to right,transparent,rgba(209,154,91,.6),transparent)",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            MAIN CONTENT SECTION
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            width: "100%",
            background: `linear-gradient(160deg, ${C.cream} 0%, #e8d5c0 40%, #dfc8aa 70%, #d4b890 100%)`,
            paddingTop: "5rem",
            paddingBottom: "7rem",
            overflow: "hidden",
            marginBottom: "-6rem",
          }}
        >
          {/* Floating orbs */}
          <div
            className="k-orb-a"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10rem",
              left: "-10rem",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(187,106,69,.15) 0%,transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="k-orb-b"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 440,
              height: 440,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(209,154,91,.22) 0%,transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="k-orb-c"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 680,
              height: 680,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(255,220,140,.07) 0%,transparent 65%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Om watermark */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <OmBg />
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "80rem",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            {/* ── 2-col grid ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="k-main-grid"
            >
              {/* ── LEFT: Contact Form ── */}
              <motion.div variants={fadeLeft}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="k-card"
                  style={{
                    padding: "2.5rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Corner Om watermark */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-1rem",
                      right: "-1rem",
                      pointerEvents: "none",
                      userSelect: "none",
                      opacity: 0.07,
                    }}
                  >
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="72"
                        fontFamily="sans-serif"
                        fill="#5A3626"
                      >
                        ॐ
                      </text>
                    </svg>
                  </div>

                  <h2
                    style={{
                      color: C.dark,
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      marginBottom: ".4rem",
                      letterSpacing: "-.02em",
                    }}
                  >
                    Send a Message
                  </h2>
                  <p
                    style={{
                      color: "rgba(90,54,38,.55)",
                      fontSize: "1rem",
                      marginBottom: "2rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    We shall respond within one business day
                  </p>

                  <motion.div variants={stagger} className="k-form-grid">
                    <Field
                      form={form}
                      onChange={onChange}
                      label="Full Name"
                      name="fullName"
                      placeholder="Enter your full name"
                    />
                    <Field
                      form={form}
                      onChange={onChange}
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                    <Field
                      form={form}
                      onChange={onChange}
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      placeholder="10-digit number"
                    />
                    <Field
                      form={form}
                      onChange={onChange}
                      label="Subject"
                      name="subject"
                      placeholder="Course inquiry, support…"
                    />

                    {/* Preferred Level */}
                    <motion.div variants={fadeUp} className="k-col2">
                      <label className="k-label">Preferred Level</label>
                      <select
                        name="preferredLevel"
                        value={form.preferredLevel}
                        onChange={onChange}
                        className="k-input k-select"
                      >
                        {[
                          "BEGINNER",
                          "INTERMEDIATE",
                          "ADVANCED",
                          "VEDIC SCHOLAR",
                        ].map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp} className="k-col2">
                      <label className="k-label">
                        Message{" "}
                        <span
                          style={{
                            opacity: 0.45,
                            fontSize: ".68rem",
                            fontWeight: 400,
                            letterSpacing: ".05em",
                          }}
                        >
                          (min. 10 words)
                        </span>
                      </label>
                      <textarea
                        rows={5}
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder="Write your message here…"
                        className="k-input"
                        style={{ resize: "none" }}
                      />
                    </motion.div>

                    {/* Error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="k-col2"
                        style={{
                          color: "#b91c1c",
                          fontWeight: 600,
                          fontSize: ".85rem",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          background: "rgba(185,28,28,.07)",
                          border: "1px solid rgba(185,28,28,.2)",
                        }}
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Success */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="k-col2"
                        style={{
                          color: "#15803d",
                          fontWeight: 600,
                          fontSize: ".85rem",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          background: "rgba(21,128,61,.08)",
                          border: "1px solid rgba(21,128,61,.22)",
                        }}
                      >
                        {success}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.div variants={fadeUp} className="k-col2">
                      <motion.button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.025 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        className="k-btn"
                      >
                        {loading ? (
                          "Sending…"
                        ) : (
                          <>
                            <Send size={15} /> Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ── RIGHT: Map + Info ── */}
              <motion.div
                variants={fadeRight}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* Map */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="k-card"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "360px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".75rem",
                      marginBottom: ".75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        flexShrink: 0,
                        background: `linear-gradient(135deg,${C.dark},${C.terracotta})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.cream,
                        boxShadow: "3px 3px 10px rgba(90,54,38,.32)",
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3
                        style={{
                          color: C.dark,
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        Main Campus
                      </h3>
                      <p
                        style={{
                          color: "rgba(90,54,38,.55)",
                          fontSize: ".9rem",
                          margin: 0,
                          fontWeight: 400,
                        }}
                      >
                        Kadi, Mehsana, Gujarat
                      </p>
                    </div>
                  </div>
                  <iframe
                    title="Kaumudi Academy Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2152.510980173506!2d72.32957612395224!3d23.29815853737631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c18078321e28f%3A0xdca9292f4989571c!2sKadi%2C%20Gujarat%20384440!5e1!3m2!1sen!2sin!4v1771429182287!5m2!1sen!2sin"
                    style={{
                      flex: 1,
                      width: "100%",
                      minHeight: 260,
                      borderRadius: "1.2rem",
                      border: "1.5px solid rgba(90,54,38,.15)",
                      marginTop: ".75rem",
                    }}
                    loading="lazy"
                  />
                </motion.div>

                {/* Info cards */}
                <div className="k-info-grid">
                  {[
                    {
                      icon: Landmark,
                      title: "Institutional Inquiries",
                      text: "University partnerships and academic collaborations.",
                      footer: "ksacademy@gmail.com",
                      FIcon: Mail,
                    },
                    {
                      icon: GraduationCap,
                      title: "Student Support",
                      text: "Technical issues, course access, and certification help.",
                      footer: "Mon–Fri, 9am–6pm IST",
                      FIcon: Phone,
                    },
                  ].map((item, i) => {
                    const Icon = item.icon,
                      FI = item.FIcon;
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="k-info-card"
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            marginBottom: "1.25rem",
                            background: `linear-gradient(135deg,${C.dark},${C.terracotta})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: C.cream,
                            boxShadow: "3px 3px 10px rgba(90,54,38,.3)",
                          }}
                        >
                          <Icon size={21} />
                        </div>
                        <h4
                          style={{
                            color: C.dark,
                            fontSize: ".95rem",
                            fontWeight: 700,
                            marginBottom: ".6rem",
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            color: "rgba(90,54,38,.58)",
                            fontSize: ".85rem",
                            lineHeight: 1.65,
                            marginBottom: "1.2rem",
                          }}
                        >
                          {item.text}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".4rem",
                            color: C.dark,
                            fontWeight: 600,
                            fontSize: ".82rem",
                          }}
                        >
                          <FI size={13} />
                          <span>{item.footer}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contact strip */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="k-card"
                  style={{ padding: "1.5rem 2rem" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {[
                      { I: Phone, label: "Call", val: "+91 75672 23072" },
                      { I: Mail, label: "Email", val: "ksacademy@gmail.com" },
                      { I: MapPin, label: "Visit", val: "Kadi, Gujarat" },
                    ].map((x, i) => (
                      <div key={i}>
                        <x.I
                          size={18}
                          style={{
                            color: C.dark,
                            display: "block",
                            margin: "0 auto 6px",
                          }}
                        />
                        <p
                          style={{
                            fontSize: ".6rem",
                            letterSpacing: ".2em",
                            fontWeight: 700,
                            color: C.terracotta,
                            marginBottom: 4,
                            textTransform: "uppercase",
                          }}
                        >
                          {x.label}
                        </p>
                        <p
                          style={{
                            fontSize: ".73rem",
                            fontWeight: 500,
                            color: "rgba(90,54,38,.62)",
                          }}
                        >
                          {x.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Follow / Socials ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                marginTop: "3.5rem",
                paddingBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <span className="k-divline" />
              <span style={{ color: "rgba(90,54,38,.42)" }}>✦</span>
              <span
                style={{
                  fontSize: ".68rem",
                  letterSpacing: ".3em",
                  fontWeight: 700,
                  color: C.dark,
                  textTransform: "uppercase",
                }}
              >
                Follow Us
              </span>
              <motion.a
                href="https://www.instagram.com/sanskritstation/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className="k-social"
              >
                <Instagram size={22} />
              </motion.a>
              <span style={{ color: "rgba(90,54,38,.42)" }}>✦</span>
              <span className="k-divline" />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
