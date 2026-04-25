import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Crown, MessageCircle, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../lib/api";

const neumoLight = {
  background: "#F2E6D9",
  boxShadow: "10px 10px 24px #d4c3b4, -10px -10px 24px #ffffff",
};

const neumoInset = {
  background: "#F2E6D9",
  boxShadow: "inset 5px 5px 12px #d4c3b4, inset -5px -5px 12px #ffffff",
};

const neumoDark = {
  background: "#B86A45",
  boxShadow: "6px 6px 16px #9a5535, -3px -3px 10px rgba(255,210,160,0.12)",
};

const featured = [
  {
    title: "Beginner Sanskrit",
    subtitle: "Start with Devanagari and core vocabulary.",
    duration: "6 weeks",
    icon: BookOpen,
    badge: { label: "Beginner", tone: "level" },
  },
  {
    title: "Panini Grammar Mastery",
    subtitle: "Dive deep into the Aṣṭādhyāyī.",
    duration: "12 weeks",
    icon: Crown,
    badge: { label: "Premium", tone: "premium" },
    premium: true,
  },
  {
    title: "Spoken Sanskrit",
    subtitle: "Practice live conversations.",
    duration: "8 weeks",
    icon: MessageCircle,
    badge: { label: "Interactive", tone: "interactive" },
    interactive: true,
  },
];


const FeaturedCard = ({ data, index }) => {
  const Icon = data.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.03 }}
      className={`group relative neo-card neo-card-hover shimmer grain rounded-3xl p-6 sm:p-7 transition-shadow duration-500 ${data.premium ? "ring-1 ring-secondary/30" : ""
        }`}
      style={neumoLight}
    >
      {/* Soft gradient strip on top */}
      <div className="absolute inset-x-6 top-0 h-1 rounded-full gradient-strip opacity-80" />

      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl gradient-glow ${data.premium ? "opacity-90" : "opacity-50"
          }`}
      />

      {/* Floating badge top-right */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`neo-inset flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${data.badge.tone === "premium"
            ? "bg-secondary/20 text-[#B86A45]"
            : data.badge.tone === "interactive"
              ? "bg-primary/10 text-[#B86A45]"
              : "bg-muted/60 text-[#B86A45]"
            }`}
          style={{ ...neumoInset, background: "#F2E6D9" }}
        >
          {data.badge.tone === "premium" && <Sparkles className="h-3 w-3 text-secondary" />}
          {data.badge.tone === "interactive" && (
            <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-secondary" />
          )}
          {data.badge.label}
        </div>
      </div>

      {/* Icon plate */}
      <div className="relative z-10 mb-6 mt-2">
        <div className="neo-inset inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-warm" style={neumoInset}>
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} style={{ color: "#B86A45" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground" style={{ color: "#5A3626" }}>
          {data.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground" style={{ color: "#A46A3F" }}>{data.subtitle}</p>

        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground" style={{ color: "#A46A3F" }}>
          <Clock className="h-3.5 w-3.5" />
          <span>{data.duration}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-6">
        <button
          className="group/btn w-full flex items-center justify-between rounded-2xl px-4 py-5 font-medium transition-all hover:brightness-110 active:scale-95"
          style={{
            color: "#F2E6D9",
            background: `
    linear-gradient(145deg, #a65a36, #7a3e22),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 2px,
      transparent 2px,
      transparent 6px
    )
  `,
            boxShadow: `
    inset 0 2px 4px rgba(255,255,255,0.15),
    inset 0 -3px 6px rgba(0,0,0,0.4),
    6px 8px 18px rgba(90,54,38,0.5)
  `
          }}>
          <span>Explore course</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
};

export default function Cards() {
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res?.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    };
    const apply = () => {
      const n = calc();
      setItemsPerSlide((prev) => {
        if (prev !== n) {
          const maxStart = Math.max(0, courses.length - n);
          if (index > maxStart) setIndex(maxStart);
        }
        return n;
      });
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [index, courses.length]);

  const visible = courses.slice(index, index + itemsPerSlide);
  return (
    <section
      className="pt-2 pb-16 sm:pt-12 sm:pb-20 relative overflow-hidden"
      style={{ background: "#f2e6d8" }}
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #D19A5B, transparent 70%)" }}
        aria-hidden
      />

      <div className="max-w-[1300px] mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-14 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center mx-auto flex flex-col items-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="inline-block mx-auto text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4"
              style={{ ...neumoInset, color: "#B86A45" }}
            >
              Featured Courses
            </motion.span>
            <h2
              className="text-3xl sm:text-4xl font-black tracking-wide"
              style={{ color: "#5A3626", fontFamily: "Georgia, serif" }}
            >
              Begin your Sanskrit journey
            </h2>
            <p className="mt-3" style={{ color: "#A46A3F" }}>
              Hand-picked programs blending tradition with modern pedagogy.
            </p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-[3px] w-12 rounded-full" style={{ background: "#D19A5B" }} />
              <div className="h-[3px] w-4 rounded-full" style={{ background: "#D19A5B", opacity: 0.4 }} />
            </div>
          </motion.div>
        </div>

        {/* FEATURED STATIC CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {featured.map((c, i) => (
            <FeaturedCard key={c.title} data={c} index={i} />
          ))}
        </div>

        {/* DYNAMIC COURSE CAROUSEL */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visible.map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    y: -10,
                    boxShadow: "16px 16px 36px #c8b09e, -12px -12px 28px #ffffff",
                    transition: { duration: 0.35 },
                  }}
                  className="group rounded-3xl overflow-hidden cursor-pointer"
                  style={neumoLight}
                >
                  {/* Image Container */}
                  <Link to={`/coursedetail/${course._id}`} className="block">
                    <div
                      className="m-3 rounded-2xl overflow-hidden"
                      style={{
                        height: "200px",
                        ...neumoInset,
                      }}
                    >
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5 }}
                        src={course.image?.url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: "1rem", filter: "brightness(0.97) saturate(1.05)" }}
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="px-6 pb-6 pt-3">
                    {/* Badge */}
                    <div className="mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ ...neumoInset, color: "#D19A5B" }}
                      >
                        {course.level || "Course"}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 leading-snug"
                      style={{ color: "#5A3626", fontFamily: "Georgia, serif" }}
                    >
                      {course.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-5 line-clamp-3"
                      style={{ color: "#A46A3F" }}
                    >
                      {course.description}
                    </p>

                    <Link to={`/coursedetail/${course._id}`}>
                      <motion.button
                        whileHover={{
                          y: -2,
                          boxShadow: "8px 8px 20px #9a5535, -3px -3px 10px rgba(255,210,160,0.15)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={{ ...neumoDark, color: "#F2E6D9" }}
                      >
                        View Details
                        <ArrowRight size={14} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div
          className="flex justify-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/allcourses">
            <motion.span
              whileHover={{
                y: -4,
                boxShadow: "14px 14px 32px #c8b09e, -10px -10px 24px #ffffff",
              }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl px-9 py-4 font-bold text-sm uppercase tracking-wider transition-all cursor-pointer"
              style={{ ...neumoLight, color: "#B86A45", letterSpacing: "0.1em" }}
            >
              View All Courses
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}