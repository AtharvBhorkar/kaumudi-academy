import React from "react";

const HeroSection = ({ data }) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        /* Cut top-left corner + bottom-right corner = bold asymmetric hero */
        clipPath:
          "polygon(48px 0%, 100% 0%, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0% 100%, 0% 48px)",
        boxShadow: "0 24px 70px rgba(90,54,38,0.28)",
        minHeight: "300px",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={
            data?.image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv8HjlPpt0rOT7SHaevW0xmnEg9DCgkEfvrA&s"
          }
          alt="Course Background"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
        {/* Primary dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(90,54,38,0.97) 0%, rgba(90,54,38,0.82) 55%, rgba(187,106,69,0.55) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(90,54,38,0.5), transparent)",
          }}
        />
        {/* Parallelogram stripe accent */}
        <div
          className="absolute top-0 right-0 h-full w-48 opacity-10"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, #d19A5B 100%)",
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />
        {/* Cut-corner fill — gold triangle at top-left */}
        <div
          className="absolute top-0 left-0"
          style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #d19A5B 50%, transparent 50%)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[150px] sm:min-h-[220px] md:min-h-[320px] px-8 sm:px-12 md:px-16 py-12">
        <div className="max-w-3xl space-y-5">
          {/* Badge — parallelogram shape */}
          <div className="flex">
            <span
              className="text-[11px] font-black tracking-[0.2em] uppercase px-6 py-2"
              style={{
                background: "rgba(209,154,91,0.22)",
                border: "1px solid rgba(209,154,91,0.6)",
                color: "#d19A5B",
                clipPath:
                  "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                backdropFilter: "blur(8px)",
              }}
            >
              {data?.level || "Advanced Certification"}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: "#F2E6D9" }}
          >
            {data?.title || "Advanced Paninian Grammar: Mahabhashya Study"}
          </h1>

          {/* Description */}
          <p
            className="text-sm sm:text-base md:text-lg italic max-w-2xl"
            style={{ color: "rgba(242,230,217,0.78)" }}
          >
            {data?.description ||
              "A comprehensive deep-dive into the foundational texts of Sanskrit linguistic philosophy."}
          </p>

          {/* Zigzag accent line */}
          <div className="flex items-center gap-1 pt-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "32px" : "10px",
                  height: "3px",
                  backgroundColor:
                    i === 0 ? "#d19A5B" : `rgba(209,154,91,${0.6 - i * 0.15})`,
                  clipPath:
                    "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
