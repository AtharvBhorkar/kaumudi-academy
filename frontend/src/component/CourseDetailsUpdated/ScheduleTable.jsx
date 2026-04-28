import React from "react";

const ScheduleTable = ({ scheduleData }) => {
  const batches = scheduleData || [];
  if (!batches || !Array.isArray(batches) || batches.length === 0) return null;

  return (
    <section className="pb-1 font-sans-serif">
      <div className="flex items-center gap-3 mb-8 mt-12">
        <div
          className="w-1 h-8"
          style={{ backgroundColor: "#d19A5B", borderRadius: "2px" }}
        />
        <h2 className="text-[28px] font-bold" style={{ color: "#5A3626" }}>
          Batch Schedule
        </h2>
      </div>

      <div
        className="overflow-hidden"
        style={{
          borderRadius: "24px",
          background: "#fff",
          boxShadow: "0 8px 40px rgba(90,54,38,0.10)",
          border: "1px solid rgba(164,106,63,0.12)",
        }}
      >
        {/* Clipped diagonal header */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #5A3626 0%, #bb6A45 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
            paddingBottom: "2rem",
          }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-15"
            style={{ backgroundColor: "#d19A5B" }}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr>
                  {["Batch Type", "Days", "Start Time", "End Time"].map((h) => (
                    <th
                      key={h}
                      className="px-8 pt-7 pb-4 text-[13px] font-black tracking-[0.1em] uppercase whitespace-nowrap"
                      style={{ color: "rgba(242,230,217,0.85)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/* Table body (outside clip) */}
        <div className="overflow-x-auto" style={{ marginTop: "-0.5rem" }}>
          <table className="w-full text-left min-w-[600px]">
            <tbody>
              {batches.map((batch, idx) => (
                <tr
                  key={idx}
                  className="transition-colors duration-200 group"
                  style={{
                    borderBottom:
                      idx < batches.length - 1
                        ? "1px solid rgba(164,106,63,0.1)"
                        : "none",
                    backgroundColor:
                      idx % 2 === 0 ? "rgba(242,230,217,0.25)" : "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(209,154,91,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "rgba(242,230,217,0.25)" : "#fff";
                  }}
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    {/* Pill-shaped batch type */}
                    <span
                      className="text-[14px] font-black px-4 py-1.5 inline-block"
                      style={{
                        background: "rgba(187,106,69,0.12)",
                        color: "#5A3626",
                        borderRadius: "8px",
                        borderLeft: "3px solid #bb6A45",
                      }}
                    >
                      {batch.batchType || batch.type || "N/A"}
                    </span>
                  </td>
                  <td
                    className="px-8 py-5 text-[14px] font-semibold whitespace-nowrap"
                    style={{ color: "#A46A3F" }}
                  >
                    {batch.days || "N/A"}
                  </td>
                  <td
                    className="px-8 py-5 text-[14px] font-semibold whitespace-nowrap"
                    style={{ color: "#A46A3F" }}
                  >
                    {batch.startTime || "N/A"}
                  </td>
                  <td
                    className="px-8 py-5 text-[14px] font-semibold whitespace-nowrap"
                    style={{ color: "#A46A3F" }}
                  >
                    {batch.endTime || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTable;
