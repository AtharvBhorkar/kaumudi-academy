import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CurriculumAccordion = ({ curriculumData }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("kaumudi_token");

  const fallbackModules = [
    {
      title: "Introduction to Paspashahnika",
      isLocked: false,
      content: [
        "Purpose of Grammar (Vyakarana-prayojanam)",
        "Concept of Shabda and Artha",
        "Linguistic Analysis methodology in Mahabhashya",
      ],
    },
    {
      title: "Shivasutra and Pratyahara Analysis",
      isLocked: false,
      content: [
        "Significance of Maheshwara Sutras",
        "Formation of Pratyaharas",
        "Phonetic classifications",
      ],
    },
    {
      title: "Sutra Interpretation Principles",
      isLocked: true,
      content: [
        "Sutra structure analysis",
        "Paribhasha implementation",
        "Vartika perspectives",
      ],
    },
  ];

  const modules =
    Array.isArray(curriculumData) && curriculumData.length
      ? curriculumData
      : curriculumData && typeof curriculumData === "object"
        ? Object.entries(curriculumData).map(([title, items]) => ({
            title,
            isLocked: false,
            content: Array.isArray(items) ? items : [],
          }))
        : fallbackModules;

  const handleToggle = (index, isLocked) => {
    if (isLocked && !isLoggedIn) {
      navigate("/auth");
      return;
    }
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="font-sans-serif">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8 mt-12">
        <div
          className="w-1 h-8"
          style={{ backgroundColor: "#d19A5B", borderRadius: "2px" }}
        />
        <h2 className="text-[28px] font-bold" style={{ color: "#5A3626" }}>
          Curriculum
        </h2>
      </div>

      <div className="space-y-3">
        {modules.map((module, index) => {
          const isOpen = openIndex === index;
          const showAsLocked = module.isLocked && !isLoggedIn;

          return (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300"
              style={{
                borderRadius: isOpen ? "20px 20px 20px 20px" : "20px",
                border: isOpen
                  ? "1.5px solid rgba(209,154,91,0.5)"
                  : "1.5px solid rgba(164,106,63,0.15)",
                backgroundColor: "#fff",
                boxShadow: isOpen
                  ? "0 8px 32px rgba(90,54,38,0.12)"
                  : "0 2px 8px rgba(90,54,38,0.05)",
              }}
            >
              <button
                onClick={() => handleToggle(index, module.isLocked)}
                className="w-full flex justify-between items-center p-5 text-left"
                style={{
                  background: isOpen
                    ? "linear-gradient(90deg, rgba(242,230,217,0.6) 0%, #fff 100%)"
                    : "#fff",
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Number badge — pill shape when open */}
                  <div
                    className="flex items-center justify-center text-[13px] font-black text-white flex-shrink-0 transition-all duration-300"
                    style={{
                      width: isOpen ? "auto" : "36px",
                      height: "36px",
                      padding: isOpen ? "0 14px" : "0",
                      borderRadius: "100px",
                      background: showAsLocked
                        ? "rgba(164,106,63,0.3)"
                        : isOpen
                          ? "linear-gradient(135deg, #d19A5B, #bb6A45)"
                          : "linear-gradient(135deg, #bb6A45, #5A3626)",
                    }}
                  >
                    {isOpen ? `0${index + 1}` : index + 1}
                  </div>

                  <span
                    className="text-[17px] font-bold"
                    style={{ color: showAsLocked ? "#A46A3F" : "#5A3626" }}
                  >
                    {module.title}
                  </span>
                </div>

                <div className="flex-shrink-0 ml-4">
                  {showAsLocked ? (
                    <Lock size={18} style={{ color: "#d19A5B" }} />
                  ) : isOpen ? (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(209,154,91,0.15)" }}
                    >
                      <ChevronUp size={18} style={{ color: "#bb6A45" }} />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(164,106,63,0.08)" }}
                    >
                      <ChevronDown size={18} style={{ color: "#A46A3F" }} />
                    </div>
                  )}
                </div>
              </button>

              {isOpen && (!module.isLocked || isLoggedIn) && (
                <div
                  className="px-6 pb-6 pt-2"
                  style={{
                    borderTop: "1px solid rgba(164,106,63,0.15)",
                    background: "rgba(242,230,217,0.35)",
                  }}
                >
                  {/* Accent bar */}
                  <div
                    className="w-12 h-1 rounded-full mb-4 mt-3"
                    style={{ backgroundColor: "#d19A5B" }}
                  />
                  <ul className="space-y-3">
                    {module.content &&
                      module.content.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-medium text-[15px]"
                          style={{ color: "#5A3626" }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: "rgba(187,106,69,0.15)" }}
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: "#bb6A45" }}
                            />
                          </div>
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CurriculumAccordion;
