const InstructorSection = ({ instructor }) => {
  const isPlaceholder =
    !instructor || !instructor.name || instructor.name === "Instructor TBA";

  if (isPlaceholder) {
    return (
      <section className="font-sans w-full">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-4 h-4 rotate-45 flex-shrink-0"
            style={{ backgroundColor: "#d19A5B" }}
          />
          <h2
            className="text-[22px] md:text-[26px] font-bold"
            style={{ color: "#5A3626" }}
          >
            Your Instructor
          </h2>
        </div>
        <div
          className="p-8 text-center"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 32px 100%, 0 calc(100% - 32px))",
            background: "#fff",
            border: "1.5px dashed rgba(164,106,63,0.3)",
            boxShadow: "0 4px 16px rgba(90,54,38,0.07)",
          }}
        >
          <p className="text-base font-medium" style={{ color: "#A46A3F" }}>
            Instructor details will be announced soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="font-sans w-full">
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-4 h-4 rotate-45 flex-shrink-0"
          style={{ backgroundColor: "#d19A5B" }}
        />
        <h2
          className="text-[22px] md:text-[26px] font-bold"
          style={{ color: "#5A3626" }}
        >
          Your Instructor
        </h2>
      </div>

      {/* Shield / escutcheon card shape */}
      <div
        className="relative overflow-hidden"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px))",
          background: "#fff",
          boxShadow: "0 12px 48px rgba(90,54,38,0.13)",
          paddingBottom: "40px",
        }}
      >
        {/* Gold accent strip at top-right cut */}
        <div
          className="absolute top-0 right-0"
          style={{
            width: "80px",
            height: "80px",
            background:
              "linear-gradient(225deg, rgba(209,154,91,0.35) 0%, transparent 60%)",
          }}
        />
        {/* Bottom point shadow */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "60px",
            background:
              "linear-gradient(to bottom, transparent, rgba(242,230,217,0.4))",
          }}
        />
        {/* Diagonal cream block top-right */}
        <div
          className="absolute top-0 right-0 w-52 h-36 opacity-50"
          style={{
            background:
              "linear-gradient(135deg, transparent 45%, rgba(242,230,217,0.85) 100%)",
          }}
        />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-0 md:gap-8 p-7 md:p-10">
          {/* Photo — hexagonal clip */}
          <div className="relative flex-shrink-0 mb-6 md:mb-0">
            {/* Offset glow ring */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                backgroundColor: "rgba(209,154,91,0.22)",
                transform: "scale(1.1)",
              }}
            />
            {/* Gradient ring */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "160px",
                height: "160px",
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(135deg, #d19A5B, #bb6A45)",
                padding: "3px",
              }}
            >
              <div
                style={{
                  width: "152px",
                  height: "152px",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  backgroundColor: "#F2E6D9",
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    instructor.image ||
                    "https://i.pinimg.com/1200x/4d/ce/47/4dce475c98aa927bd3bc5186fea452f0.jpg"
                  }
                  alt={instructor.name}
                  style={{
                    width: "146px",
                    height: "146px",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
            <h3
              className="text-xl sm:text-2xl md:text-[28px] font-bold mb-2 leading-tight"
              style={{ color: "#5A3626" }}
            >
              {instructor.name}
            </h3>

            {instructor.qualification && (
              <div className="mb-3 flex justify-center md:justify-start">
                <span
                  className="text-[11px] font-black uppercase tracking-widest px-4 py-1.5"
                  style={{
                    color: "#5A3626",
                    background: "rgba(209,154,91,0.18)",
                    clipPath:
                      "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                    borderLeft: "none",
                  }}
                >
                  {instructor.qualification}
                </span>
              </div>
            )}

            {instructor.bio && (
              <p
                className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed font-medium max-w-full md:max-w-2xl mb-5"
                style={{ color: "#A46A3F" }}
              >
                {instructor.bio}
              </p>
            )}

            {instructor.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start w-full">
                {instructor.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-[11px] font-bold whitespace-nowrap"
                    style={{
                      background: "#F2E6D9",
                      border: "1px solid rgba(164,106,63,0.2)",
                      color: "#5A3626",
                      /* Alternating chamfer directions for visual rhythm */
                      clipPath:
                        i % 2 === 0
                          ? "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)"
                          : "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
