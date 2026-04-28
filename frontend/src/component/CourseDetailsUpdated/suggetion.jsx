import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart2,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
    >
      <motion.div
        whileHover={{ y: -10 }}
        className="group flex flex-col h-full overflow-hidden transition-all duration-500"
        style={{
          borderRadius: "24px",
          background: "#fff",
          border: "1px solid rgba(164,106,63,0.12)",
          boxShadow: "0 4px 20px rgba(90,54,38,0.08)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(90,54,38,0.18)";
          e.currentTarget.style.borderColor = "rgba(209,154,91,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(90,54,38,0.08)";
          e.currentTarget.style.borderColor = "rgba(164,106,63,0.12)";
        }}
      >
        {/* Image with diagonal bottom clip */}
        <div
          className="relative overflow-hidden"
          style={{ height: "200px", borderRadius: "24px 24px 0 0" }}
        >
          <motion.img
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={course.image?.url || course.image}
            className="w-full h-full object-cover"
            alt={course.title}
          />
          {/* Diagonal overlay at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{
              background:
                "linear-gradient(to top, rgba(90,54,38,0.6), transparent)",
            }}
          />

          {/* Language badge — left-heavy pill */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-[10px] font-bold px-3 py-1.5 flex items-center gap-1.5 uppercase tracking-wide"
              style={{
                background: "rgba(242,230,217,0.92)",
                color: "#5A3626",
                borderRadius: "4px 14px 14px 4px",
                backdropFilter: "blur(6px)",
              }}
            >
              <Globe size={10} />
              {Array.isArray(course.language)
                ? course.language[0]
                : course.language}
            </span>
          </div>

          {/* Mode badge — right-heavy pill */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className="text-[10px] font-bold px-3 py-1.5"
              style={{
                background: "linear-gradient(135deg, #bb6A45, #5A3626)",
                color: "#F2E6D9",
                borderRadius: "14px 4px 4px 14px",
              }}
            >
              {course.mode}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="font-bold text-[18px] leading-tight mb-2 font-serif truncate transition-colors"
            style={{ color: "#5A3626" }}
          >
            {course.title}
          </h3>

          <p
            className="text-[13px] leading-relaxed mb-4 line-clamp-2"
            style={{ color: "#A46A3F" }}
          >
            {course.description}
          </p>

          {/* Meta pills */}
          <div className="flex gap-2 mb-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              style={{
                background: "rgba(242,230,217,0.8)",
                borderRadius: "8px",
                color: "#5A3626",
              }}
            >
              <Clock size={12} style={{ color: "#bb6A45" }} />
              {course.duration || "Self-paced"}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              style={{
                background: "rgba(242,230,217,0.8)",
                borderRadius: "8px",
                color: "#5A3626",
              }}
            >
              <BarChart2 size={12} style={{ color: "#bb6A45" }} />
              {course.level || "Beginner"}
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-auto pt-3 flex justify-between items-center"
            style={{ borderTop: "1px solid rgba(164,106,63,0.12)" }}
          >
            <div className="flex flex-col">
              <span
                className="text-[10px] uppercase font-bold tracking-tighter"
                style={{ color: "#A46A3F" }}
              >
                Investment
              </span>
              <span
                className="text-2xl font-black"
                style={{ color: "#5A3626" }}
              >
                ₹{Number(course.price).toLocaleString("en-IN")}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate(`/coursedetail/${course._id || course.id}`, {
                  state: { course },
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center transition-all"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #bb6A45, #5A3626)",
                color: "#F2E6D9",
                boxShadow: "0 4px 14px rgba(187,106,69,0.35)",
              }}
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CourseCarousel({ courses = [] }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.offsetWidth /
        (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
      scrollRef.current.scrollBy({
        left: dir === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  if (!courses || courses.length === 0) return null;

  return (
    <section className="w-full py-8 font-sans-serif pb-2 overflow-hidden">
      <div className="max-w-[1190px] mx-auto px-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 mt-2">
            <div
              className="w-1 h-8"
              style={{ backgroundColor: "#d19A5B", borderRadius: "2px" }}
            />
            <h2 className="text-[28px] font-bold" style={{ color: "#5A3626" }}>
              Recommended Courses
            </h2>
          </div>

          <div className="flex pr-4 sm:pr-10 gap-2">
            {[
              { dir: "left", Icon: ChevronLeft },
              { dir: "right", Icon: ChevronRight },
            ].map(({ dir, Icon }) => (
              <motion.button
                key={dir}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll(dir)}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: "#fff",
                  border: "1.5px solid rgba(164,106,63,0.2)",
                  color: "#bb6A45",
                  boxShadow: "0 2px 10px rgba(90,54,38,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #bb6A45, #5A3626)";
                  e.currentTarget.style.color = "#F2E6D9";
                  e.currentTarget.style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#bb6A45";
                  e.currentTarget.style.borderColor = "rgba(164,106,63,0.2)";
                }}
              >
                <Icon size={20} />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative overflow-visible">
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden scroll-smooth py-4"
            style={{ scrollbarWidth: "none" }}
          >
            {courses.map((course, index) => (
              <CourseCard
                key={course._id || course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        .font-serif { font-family: 'Playfair Display', sans-serif; }
      `}</style>
    </section>
  );
}
