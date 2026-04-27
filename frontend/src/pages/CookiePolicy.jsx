import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Cookie,
  BarChart3,
  Bell,
  Save,
  Lock,
  Info,
} from "lucide-react";
import SEO from "../components/SEO";
import cookieimg from "../assets/cookieimg.webp";

const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -3, transition: { type: "spring", stiffness: 300 } },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 15,
    scale: 1.2,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

const HERO_IMG =
  "https://i.pinimg.com/736x/a7/77/1e/a7771ef857ddb21c2e277bd47d5a4cc8.jpg";

function Spark({ x, y, angle }) {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{
        opacity: 0,
        x: Math.cos(angle) * 60,
        y: Math.sin(angle) * 60,
        scale: 0,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#d6b25e",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default function CookiePolicy() {
  const [analytics, setAnalytics] = useState(false);
  const [announcements, setAnnouncements] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [saveHovered, setSaveHovered] = useState(false);

  const triggerSparks = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newSparks = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      angle: (i / 12) * Math.PI * 2,
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(
      () =>
        setSparks((prev) =>
          prev.filter((s) => !newSparks.find((n) => n.id === s.id))
        ),
      700
    );
  };

  const GoldenDivider = () => (
    <div className="flex items-center gap-3 mb-6">
      <div
        style={{
          height: "1px",
          flex: 1,
          background: "linear-gradient(to right, #d6b25e, transparent)",
        }}
      />
      <svg width="28" height="16" viewBox="0 0 36 20" fill="none">
        <circle cx="18" cy="10" r="3" fill="#d6b25e" />
        <circle cx="18" cy="10" r="5.5" stroke="#d6b25e" strokeWidth="0.8" fill="none" />
        <line x1="1" y1="10" x2="8" y2="10" stroke="#d6b25e" strokeWidth="1" strokeLinecap="round" />
        <line x1="28" y1="10" x2="35" y2="10" stroke="#d6b25e" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3" cy="10" r="1" fill="#d6b25e" />
        <circle cx="33" cy="10" r="1" fill="#d6b25e" />
      </svg>
      <div
        style={{
          height: "1px",
          flex: 1,
          background: "linear-gradient(to left, #d6b25e, transparent)",
        }}
      />
    </div>
  );

  const preferenceItems = [
    {
      title: "Strictly Necessary",
      desc: "These cookies are essential for authentication, session security, and uninterrupted access to your courses. They cannot be disabled.",
      icon: <Lock className="w-5 h-5" />,
      disabled: true,
    },
    {
      title: "Analytics Cookies",
      desc: "Help us improve lesson experience and understand how learners use the platform.",
      icon: <BarChart3 className="w-5 h-5" />,
      state: analytics,
      set: setAnalytics,
    },
    {
      title: "Announcements",
      desc: "Receive course & event updates relevant to your learning journey.",
      icon: <Bell className="w-5 h-5" />,
      state: announcements,
      set: setAnnouncements,
    },
  ];

  return (
    <motion.section
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#FBF4E2] py-10 mb-[-70px]"
    >
      {sparks.map((s) => (
        <Spark key={s.id} x={s.x} y={s.y} angle={s.angle} />
      ))}

      <SEO
        title="Cookie Policy | Kaumudi Sanskrit Academy by Graphura India"
        description="Learn how Kaumudi Sanskrit Academy, a venture of Graphura India Private Limited, uses cookies and how you can control them."
        canonicalPath="/cookies"
        og={{ type: "website" }}
        keywords={[
          "Cookie Policy",
          "Kaumudi Academy cookies",
          "Graphura India Private Limited privacy",
          "Website tracking policy",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cookie Policy",
            description:
              "Learn how Kaumudi Sanskrit Academy uses cookies and how you can control them.",
            url:
              (typeof window !== "undefined" ? window.location.origin : "") +
              "/cookies",
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
                  (typeof window !== "undefined" ? window.location.origin : "") +
                  "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Cookie Policy",
                item:
                  (typeof window !== "undefined" ? window.location.origin : "") +
                  "/cookies",
              },
            ],
          },
        ]}
      />

      {/* HERO */}
      <div className="flex justify-center px-3 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-44 sm:h-60 lg:h-72 w-full max-w-[98vw] overflow-hidden rounded-3xl group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out scale-110 group-hover:scale-100"
            style={{ backgroundImage: `url(${HERO_IMG})` }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(90,54,38,0.68)" }}
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold drop-shadow-lg mb-4">
              Cookie Policy
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                style={{
                  height: "1px",
                  width: "60px",
                  background: "linear-gradient(to right, transparent, #d6b25e)",
                }}
              />
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                <circle cx="18" cy="10" r="3.5" fill="#d6b25e" />
                <circle cx="18" cy="10" r="6.5" stroke="#d6b25e" strokeWidth="0.8" fill="none" />
                <line x1="1" y1="10" x2="9" y2="10" stroke="#d6b25e" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="27" y1="10" x2="35" y2="10" stroke="#d6b25e" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="4" cy="10" r="1.3" fill="#d6b25e" />
                <circle cx="32" cy="10" r="1.3" fill="#d6b25e" />
              </svg>
              <div
                style={{
                  height: "1px",
                  width: "60px",
                  background: "linear-gradient(to left, transparent, #d6b25e)",
                }}
              />
            </div>
            <p className="text-xs sm:text-sm tracking-widest opacity-90 font-semibold uppercase">
              How we use cookies and protect your privacy
            </p>
          </div>
        </motion.div>
      </div>

      {/* CONTENT BOX */}
      <div className="px-4 sm:px-6 lg:px-16 py-10 sm:py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          whileHover={{ boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${cookieimg})` }}
          />
          <div className="absolute inset-0 bg-[#fdf7ec]/82" />

          <motion.div
            className="relative z-10 p-6 sm:p-10 lg:p-14 space-y-10 sm:space-y-14"
            variants={stagger}
          >
            {/* Wisdom */}
            <motion.section variants={rise}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#7b2d1f] mb-8">
                Wisdom & Digital Privacy
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#5f4334]">
                We preserve sacred learning traditions while embracing responsible
                digital practices—protecting your privacy at every step.
              </p>
            </motion.section>

            {/* What are cookies */}
            <motion.section variants={rise}>
              <GoldenDivider />
              <h3 className="flex gap-3 items-center text-xl sm:text-2xl font-semibold text-[#7b2d1f] mb-6">
                <Cookie className="w-5 h-5 sm:w-6 sm:h-6" /> What are cookies?
              </h3>
              <p className="text-base sm:text-lg text-[#5f4334]">
                Cookies help maintain sessions, preferences, and platform security
                during your learning journey.
              </p>
            </motion.section>

            {/* Why we use */}
            <motion.section variants={rise}>
              <GoldenDivider />
              <h3 className="flex gap-3 items-center text-xl sm:text-2xl font-semibold text-[#7b2d1f] mb-4">
                <Info className="w-5 h-5 sm:w-6 sm:h-6" /> Why we use cookies
              </h3>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 sm:space-y-3 text-base sm:text-lg text-[#5f4334]">
                <li>Secure course access</li>
                <li>Saved learning preferences</li>
                <li>Academic quality improvement</li>
                <li>Institutional updates</li>
              </ul>
            </motion.section>

            {/* Manage Preferences */}
            <motion.section variants={rise}>
              <GoldenDivider />
              <h3 className="flex items-center gap-3 text-lg sm:text-2xl font-semibold text-[#7b2d1f] mb-6">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" /> Manage Preferences
              </h3>

              <div className="space-y-4 sm:space-y-5">
                {preferenceItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="hover"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl p-5 sm:p-6"
                    style={{
                      background: "rgba(253, 247, 236, 0.45)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(214, 178, 94, 0.3)",
                      boxShadow:
                        "6px 6px 14px rgba(139,90,60,0.12), -4px -4px 10px rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <motion.span
                          variants={iconVariants}
                          className="text-[#7b2d1f]"
                          style={{ display: "inline-flex" }}
                        >
                          {item.icon}
                        </motion.span>
                        <p className="text-sm sm:text-base font-semibold text-[#7b2d1f]">
                          {item.title}
                        </p>
                        {item.disabled && (
                          <span className="text-[10px] sm:text-xs uppercase tracking-wide text-red-700 font-bold bg-red-100/80 px-2 py-0.5 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#5f4334] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="self-end sm:self-auto sm:ml-6 flex-shrink-0">
                      {!item.disabled ? (
                        <motion.button
                          layout
                          transition={{ type: "spring", stiffness: 400 }}
                          onClick={() => item.set(!item.state)}
                          className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${
                            item.state ? "bg-[#7b2d1f]" : "bg-gray-300"
                          }`}
                          style={{
                            boxShadow: item.state
                              ? "inset 2px 2px 5px rgba(0,0,0,0.2), 0 0 8px rgba(123,45,31,0.3)"
                              : "inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.6)",
                          }}
                        >
                          <motion.span
                            layout
                            className="absolute top-2 w-4 h-4 bg-white rounded-full shadow"
                            style={{ left: item.state ? "32px" : "8px" }}
                          />
                        </motion.button>
                      ) : (
                        <div
                          className="w-14 h-8 rounded-full relative cursor-not-allowed"
                          style={{
                            background: "rgba(123,45,31,0.35)",
                            boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.15)",
                          }}
                        >
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full shadow" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Save Button */}
            <div className="flex justify-center">
              <motion.button
                onHoverStart={() => setSaveHovered(true)}
                onHoverEnd={() => setSaveHovered(false)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  triggerSparks(e);
                  setSaveHovered(true);
                  setTimeout(() => setSaveHovered(false), 650);
                  console.log({ analytics, announcements });
                }}
                className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-base sm:text-lg font-semibold overflow-hidden"
                style={{
                  background: "#5a3626",
                  border: "1px solid rgba(214,178,94,0.4)",
                  color: "#d19a5b",
                  boxShadow:
                    "6px 6px 16px rgba(50,20,10,0.35), -3px -3px 10px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,200,120,0.15)",
                  minWidth: "220px",
                  maxWidth: "340px",
                  width: "100%",
                }}
              >
                {/* Shine sweep */}
                <motion.div
                  initial={{ x: "-110%" }}
                  animate={saveHovered ? { x: "260%" } : { x: "-110%" }}
                  transition={
                    saveHovered
                      ? { duration: 0.65, ease: "easeInOut" }
                      : { duration: 0 }
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "60%",
                    height: "100%",
                    background:
                      "linear-gradient(105deg, transparent 20%, rgba(231,205,145,0.7) 50%, transparent 80%)",
                    pointerEvents: "none",
                    zIndex: 1,
                    borderRadius: "inherit",
                  }}
                />

                <motion.div
                  animate={
                    saveHovered
                      ? { rotate: 18, color: "#ffffff" }
                      : { rotate: 0, color: "#d19a5b" }
                  }
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <Save className="w-5 h-5" />
                </motion.div>

                <motion.span
                  animate={{ color: saveHovered ? "#ffffff" : "#d19a5b" }}
                  transition={{ duration: 0.25 }}
                  className="tracking-wide"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  Save Preferences
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}