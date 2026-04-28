import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Send,
  User,
  MessageCircle,
  Mail,
  BookOpen,
  Clock,
  Globe,
  Award,
} from "lucide-react";
import { submitInquiry } from "../../lib/api";

export default function Inquiry() {
  const location = useLocation();

  const incoming = location.state?.course || location.state;

  const courseData = {
    title: incoming?.title || incoming?.courseName || "Sanskrit for Beginners",
    language: incoming?.language || "Sanskrit/Hindi",
    duration: incoming?.duration || "6 Months",
    level: incoming?.level || "Beginner",
  };

  const [form, setForm] = useState({
    fullName: "",
    vedicName: "",
    whatsappNumber: "",
    email: "",
    preferredLevel: "BEGINNER",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      await submitInquiry({
        fullName: form.fullName,
        vedicName: form.vedicName || "",
        email: form.email,
        whatsappNumber: form.whatsappNumber,
        preferredLevel: form.preferredLevel.toUpperCase(),
        message: form.message || "",
        course: {
          title: courseData.title,
          duration: courseData.duration,
          language: courseData.language,
          level: courseData.level,
        },
      });
      setSuccess(
        "Inquiry submitted successfully. Our team will reach out soon.",
      );
      setForm({
        fullName: "",
        vedicName: "",
        whatsappNumber: "",
        email: "",
        preferredLevel: "BEGINNER",
        message: "",
      });
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to submit inquiry";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputStyle = [
    "w-full bg-white/10 border border-white/30",
    "backdrop-blur-xl",
    "p-4 outline-none",
    "focus:border-[#bb6A45]/70 focus:bg-white/20",
    "transition-all duration-300",
    "placeholder:text-[#A46A3F]/50 text-[#5A3626]",
    "shadow-inner shadow-white/10",
  ].join(" ");

  // Chamfered shape — top-left + bottom-right cuts (consistent with other components)
  const chamferStyle = {
    clipPath:
      "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
  };

  const labelStyle =
    "text-[10px] uppercase tracking-[2px] font-bold text-[#bb6A45] mb-1 ml-1 flex items-center gap-2";

  return (
    <div
      className="min-h-screen text-[#5A3626] font-sans relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F2E6D9 0%, #e8d5c0 40%, #f5e8d5 70%, #eeddc8 100%)",
      }}
    >
      {/* ── Layered background blobs ── */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(209,154,91,0.35) 0%, rgba(209,154,91,0.08) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(187,106,69,0.28) 0%, rgba(187,106,69,0.06) 55%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 w-[450px] h-[450px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(242,230,217,0.5) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* ── Hero Section ── */}
      <section className="relative text-center pt-10 pb-12 px-6">
        {/* Parallelogram badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center mb-5 px-8 py-2 text-sm font-bold tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow:
              "0 4px 16px rgba(187,106,69,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
            color: "#bb6A45",
            clipPath: "polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
          }}
        >
          ✦ Inquiry Form ✦
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
          style={{ color: "#5A3626" }}
        >
          Begin Your{" "}
          <span className="italic" style={{ color: "#d19A5B" }}>
            Journey
          </span>{" "}
          <br />
          with Kaumudi
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
          style={{ color: "#A46A3F" }}
        >
          Connecting seekers with the wisdom of Sanskrit learning. Fill the form
          and our scholars will reach out to you within 24 hours.
        </motion.p>
      </section>

      {/* ── Main Content Section ── */}
      <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-10 pb-24 relative z-10 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-8 lg:col-start-3 relative"
        >
          {/* Decorative chamfered orb — top right */}
          <div
            className="absolute -top-8 -right-8 w-20 h-20 rotate-12 -z-10 hidden md:block"
            style={{
              background: "rgba(209,154,91,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 8px 32px rgba(209,154,91,0.25)",
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            }}
          />
          {/* Bottom-left accent */}
          <div
            className="absolute -bottom-6 -left-8 w-14 h-14 -rotate-6 -z-10 hidden md:block"
            style={{
              background: "rgba(187,106,69,0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 6px 24px rgba(187,106,69,0.2)",
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            }}
          />

          {/* ── Main Glass Card — chamfered octagon ── */}
          <div
            className="p-6 md:p-12 overflow-hidden relative"
            style={{
              clipPath:
                "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)",
              background: "rgba(255, 255, 255, 0.22)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 20px 60px rgba(90, 54, 38, 0.15), 0 4px 16px rgba(90,54,38,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {/* Top shine strip */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, transparent 100%)",
              }}
            />
            {/* Left edge highlight */}
            <div
              className="absolute top-0 left-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)",
              }}
            />

            {/* Form Header */}
            <div
              className="flex items-center gap-4 mb-10 pb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.35)" }}
            >
              {/* Chamfered icon box */}
              <div
                className="w-12 h-12 flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(187,106,69,0.9), rgba(164,106,63,0.85))",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  boxShadow:
                    "0 4px 16px rgba(187,106,69,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                  color: "white",
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
              >
                <Send size={22} />
              </div>
              <div>
                <h3 className="text-3xl font-bold" style={{ color: "#5A3626" }}>
                  Course Inquiry
                </h3>
                <p className="text-sm" style={{ color: "#A46A3F" }}>
                  Please provide your details below
                </p>
              </div>
            </div>

            <form className="grid gap-8" onSubmit={handleSubmit}>
              {/* Full Name + WhatsApp */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelStyle}>
                    <User size={14} /> Full Name
                  </label>
                  <input
                    className={inputStyle}
                    style={chamferStyle}
                    placeholder="E.g. Rahul Sharma"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>
                    <MessageCircle size={14} /> WhatsApp Number
                  </label>
                  <input
                    className={inputStyle}
                    style={chamferStyle}
                    placeholder="10-digit number"
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className={labelStyle}>
                  <Mail size={14} /> Email Address
                </label>
                <input
                  className={inputStyle}
                  style={chamferStyle}
                  placeholder="rahul@example.com"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Preferred Level + Vedic Name */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className={labelStyle}>
                    <Award size={14} /> Preferred Level
                  </label>
                  <select
                    name="preferredLevel"
                    value={form.preferredLevel}
                    onChange={handleChange}
                    className={inputStyle}
                    style={{ ...chamferStyle, appearance: "none" }}
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>
                    <User size={14} /> Vedic Name (optional)
                  </label>
                  <input
                    className={inputStyle}
                    style={chamferStyle}
                    placeholder="If any"
                    name="vedicName"
                    value={form.vedicName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Pre-filled Course Details — chamfered glass box */}
              <div
                className="p-6 md:p-8 relative group overflow-hidden"
                style={{
                  clipPath:
                    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(20px) saturate(150%)",
                  WebkitBackdropFilter: "blur(20px) saturate(150%)",
                  border: "1px dashed rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 4px 24px rgba(187,106,69,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <div
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  }}
                />
                <div
                  className="absolute top-0 right-0 p-4 transition-opacity opacity-10 group-hover:opacity-20"
                  style={{ color: "#bb6A45" }}
                >
                  <BookOpen size={80} />
                </div>

                <p
                  className="text-xs font-black mb-6 uppercase tracking-[3px]"
                  style={{ color: "#A46A3F" }}
                >
                  Selected Course Details
                </p>

                <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
                  {[
                    {
                      label: "Course Title",
                      value: courseData.title,
                      icon: null,
                    },
                    {
                      label: "Duration",
                      value: courseData.duration,
                      icon: <Clock size={10} />,
                    },
                    {
                      label: "Language",
                      value: courseData.language,
                      icon: <Globe size={10} />,
                    },
                    {
                      label: "Level",
                      value: courseData.level,
                      icon: <Award size={10} />,
                    },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="flex flex-col pl-4"
                      style={{ borderLeft: "2px solid rgba(255,255,255,0.5)" }}
                    >
                      <label
                        className="text-[10px] uppercase font-bold flex items-center gap-1"
                        style={{ color: "#A46A3F" }}
                      >
                        {icon} {label}
                      </label>
                      <input
                        className="bg-transparent font-bold text-lg outline-none py-1 cursor-default"
                        style={{ color: "#5A3626" }}
                        value={value}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className={labelStyle}>
                  <MessageCircle size={14} /> Your Message
                </label>
                <textarea
                  className={`${inputStyle} resize-none`}
                  style={chamferStyle}
                  rows="4"
                  placeholder="Tell us about your learning goals or any specific concerns..."
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error / Success — chamfered alerts */}
              {error && (
                <div
                  className="px-5 py-4 text-sm font-semibold"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    background: "rgba(220,38,38,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    color: "#dc2626",
                  }}
                >
                  {error}
                </div>
              )}
              {success && (
                <div
                  className="px-5 py-4 text-sm font-semibold"
                  style={{
                    clipPath:
                      "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    background: "rgba(59,109,17,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(59,109,17,0.25)",
                    color: "#3B6D11",
                  }}
                >
                  {success}
                </div>
              )}

              {/* Submit Button — chamfered */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="relative overflow-hidden group text-white py-5 font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300"
                style={{
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                  background:
                    "linear-gradient(135deg, rgba(187,106,69,0.92) 0%, rgba(164,106,63,0.88) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    "0 8px 32px rgba(187,106,69,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  }}
                />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <span className="relative z-10">
                  {loading ? "Sending..." : "Send Inquiry"}
                </span>
                <Send
                  size={20}
                  className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </motion.button>

              <p className="text-center text-xs" style={{ color: "#A46A3F" }}>
                By clicking send, you agree to our{" "}
                <Link
                  to="/privacy"
                  className="underline cursor-pointer transition-colors"
                  style={{ color: "#bb6A45" }}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
