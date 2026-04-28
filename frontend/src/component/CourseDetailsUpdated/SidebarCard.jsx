import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthHook";
import { getMyEnrollments } from "../../lib/api";

const SidebarCard = ({ price, courseData }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);

  const courseId = courseData?._id || courseData?.id;

  useEffect(() => {
    if (!isAuthenticated || !courseId) return;
    const check = async () => {
      try {
        setCheckingEnrollment(true);
        const res = await getMyEnrollments();
        const enrollments = res?.data || res?.enrollments || res || [];
        const enrolled = enrollments.some((e) => {
          const enrolledCourseId =
            e?.course?._id || e?.courseId || e?.course || null;
          return enrolledCourseId?.toString() === courseId?.toString();
        });
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error("Enrollment check failed", err);
      } finally {
        setCheckingEnrollment(false);
      }
    };
    check();
  }, [isAuthenticated, courseId]);

  const formatPrice = (p) => {
    if (!p) return "0";
    const numPrice =
      typeof p === "string" ? parseInt(p.replace(/[^0-9]/g, "")) || 0 : p;
    return numPrice.toLocaleString("en-IN");
  };

  const features = [
    "120+ Hours of Live Instruction",
    "Certificate of Completion",
    "Access to Library & Recordings",
    "Lifetime Discussion Forum Access",
    "Expert Scholars with Proven Pedagogy & Wisdom",
  ];

  useEffect(() => {
    if (visibleFeatures < features.length) {
      const timer = setTimeout(
        () => setVisibleFeatures((prev) => prev + 1),
        500,
      );
      return () => clearTimeout(timer);
    }
  }, [visibleFeatures]);

  const enrollState = !isAuthenticated
    ? "guest"
    : checkingEnrollment
      ? "checking"
      : isEnrolled
        ? "enrolled"
        : "available";

  /* Octagonal clip — 8 sides, cuts all corners */
  const octagonClip =
    "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)";

  /* Chamfered button shape */
  const chamferBtn =
    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";

  return (
    <div
      className="sticky top-10 max-w-[380px] flex flex-col overflow-hidden"
      style={{
        clipPath: octagonClip,
        background: "#fff",
        boxShadow: "0 24px 70px rgba(90,54,38,0.18)",
      }}
    >
      {/* ── Diagonal clipped Price Header ── */}
      <div
        className="relative px-8 pt-8 pb-20 text-white text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #5A3626 0%, #bb6A45 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
          marginBottom: "-2rem",
        }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d19A5B 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Rotating diamond */}
        <div
          className="absolute -top-6 -right-6 w-24 h-24 rotate-45 opacity-15"
          style={{ backgroundColor: "#d19A5B" }}
        />

        <p
          className="text-[11px] uppercase tracking-[0.3em] font-bold mb-3"
          style={{ color: "rgba(242,230,217,0.65)" }}
        >
          Full Course Fee
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-5xl font-black tracking-tight">
            ₹{formatPrice(price)}
          </span>
          <span
            className="text-lg line-through font-medium"
            style={{ color: "rgba(242,230,217,0.4)" }}
          >
            ₹{formatPrice(price * 3)}
          </span>
        </div>
        {/* Parallelogram EMI badge */}
        <div
          className="mt-4 inline-block text-[11px] font-black px-7 py-2 uppercase tracking-widest"
          style={{
            backgroundColor: "#d19A5B",
            color: "#5A3626",
            clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
          }}
        >
          Monthly EMI Starts
        </div>
      </div>

      {/* ── Features List ── */}
      <div className="px-7 pt-10 pb-4">
        <ul className="space-y-4">
          {features.map((item, i) => (
            <li
              key={i}
              className={`flex gap-3 items-start leading-snug transition-all duration-500 ${
                i < visibleFeatures
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              {/* Diamond check instead of circle */}
              <div
                className="flex-shrink-0 mt-1 w-5 h-5 rotate-45 flex items-center justify-center"
                style={{ backgroundColor: "rgba(209,154,91,0.2)" }}
              >
                <CheckCircle
                  size={10}
                  style={{
                    color: "#d19A5B",
                    transform: "rotate(-45deg)",
                  }}
                  strokeWidth={3}
                />
              </div>
              <span
                className="font-semibold text-[15px]"
                style={{ color: "#A46A3F" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Buttons ── */}
      <div className="px-7 pb-8 pt-3 flex flex-col gap-3">
        <div
          className="w-full h-px mb-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(164,106,63,0.2), transparent)",
          }}
        />

        {enrollState === "enrolled" ? (
          <div
            className="w-full py-4 font-bold text-lg flex items-center justify-center gap-2 text-white"
            style={{
              clipPath: chamferBtn,
              backgroundColor: "#3B6D11",
            }}
          >
            <CheckCircle size={20} /> Already Purchased
          </div>
        ) : enrollState === "checking" ? (
          <div
            className="w-full py-4 font-bold text-lg flex items-center justify-center"
            style={{
              clipPath: chamferBtn,
              backgroundColor: "rgba(164,106,63,0.12)",
              color: "#A46A3F",
            }}
          >
            Checking...
          </div>
        ) : (
          <Link
            to={isAuthenticated ? "/courseBuy" : "/login"}
            className="w-full"
            state={
              isAuthenticated
                ? {
                    courseId,
                    courseName: courseData?.title,
                    price: courseData?.price,
                    startDate: courseData?.startDate,
                    endDate: courseData?.endDate,
                    level: courseData?.level,
                    language: courseData?.language,
                    mode: "Live Online",
                  }
                : { from: `/coursedetail/${courseId}` }
            }
          >
            <button
              className="w-full py-4 font-bold text-lg text-white flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group"
              style={{
                clipPath: chamferBtn,
                background: "linear-gradient(135deg, #bb6A45 0%, #5A3626 100%)",
                boxShadow: "0 8px 28px rgba(187,106,69,0.38)",
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative z-10">Enroll Now</span>
              <span className="relative z-10 text-xl">→</span>
            </button>
          </Link>
        )}

        <Link
          to="/inquiry"
          className="w-full"
          state={{
            courseName: courseData?.title || "Sanskrit for Beginners",
            duration: courseData?.duration || "6 Months",
            language: courseData?.language || "Sanskrit/Hindi",
            level: courseData?.level || "Prathama (Beginner)",
          }}
        >
          <button
            className="w-full py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              clipPath: chamferBtn,
              border: "2px solid #bb6A45",
              color: "#bb6A45",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(187,106,69,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Inquiry <span className="text-xl">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SidebarCard;
