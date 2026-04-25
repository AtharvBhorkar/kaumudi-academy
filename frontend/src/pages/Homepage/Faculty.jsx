import { motion } from "framer-motion";
import faculty1 from "../../assets/home/faculty1.webp";
import faculty2 from "../../assets/home/faculty2.webp";
import faculty3 from "../../assets/home/faculty3.webp";
import faculty4 from "../../assets/home/faculty4.webp";

const NEO_BG = "#F2E6D9";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const TempleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 3l4 3v2H8V6l4-3z" />
    <path d="M6 10h12v9H6z" />
    <path d="M10 19v-4h4v4" />
    <path d="M4 19h16" />
  </svg>
);
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5z" />
    <path d="M8 7h6M8 11h6" />
  </svg>
);
const ScrollIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M6 4h10a2 2 0 012 2v10a3 3 0 003 3H9a3 3 0 01-3-3V4z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);
const QuillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M20 4c-7 1-12 6-14 14l3-1 1 3c8-2 13-7 14-14l-4-2z" />
    <path d="M6 18l3-3" />
  </svg>
);

const renderIcon = (i) =>
  i === "temple" ? <TempleIcon /> : i === "book" ? <BookIcon /> : i === "scroll" ? <ScrollIcon /> : <QuillIcon />;

const faculty = [
  { name: "Acharya V. Shastri", role: "Dean of Vyakarana", image: faculty1, icon: "temple" },
  { name: "Dr. Meera Iyer", role: "Head of Sahitya", image: faculty2, icon: "book" },
  { name: "Swami Vidyananda", role: "Chief of Darshana Studies", image: faculty3, icon: "scroll" },
  { name: "Prof. Rahul Dev", role: "Spoken Sanskrit Expert", image: faculty4, icon: "quill" },
];

const Faculty = () => {
  return (
    <section
      id="faculty"
      className="relative overflow-hidden py-16 sm:py-28 -mt-10"
      style={{ background: NEO_BG }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          {/* Neumorphic inset pill badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{
              color: "#B86A45",
              background: NEO_BG,
              boxShadow: "inset 4px 4px 8px rgba(90,56,38,0.18), inset -4px -4px 8px rgba(255,255,255,0.75)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D19A5B" }} />
            Mentors
          </span>

          <h3
            className="mt-5 font-serif text-3xl font-extrabold tracking-wide sm:text-4xl md:text-5xl"
            style={{ color: "#5a3826" }}
          >
            Our Distinguished Faculty
          </h3>

          {/* Ornament divider */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #D19A5B)" }} />
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#D19A5B" strokeWidth="1.5">
              <path d="M12 3c1 3 3 5 6 6-3 1-5 3-6 6-1-3-3-5-6-6 3-1 5-3 6-6z" />
            </svg>
            <span className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #D19A5B)" }} />
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-20 sm:gap-24 md:gap-28 lg:gap-18 sm:grid-cols-2 lg:grid-cols-4"
        >
          {faculty.map((f) => (
            <motion.div
              key={f.name}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
              style={{ willChange: "transform" }}
            >
              {/* Outer neumorphic raised card */}
              <div
                className="relative rounded-[32px] px-6 pb-4 pt-16 text-center transition-shadow duration-300"
                style={{
                  background: NEO_BG,
                  boxShadow: "10px 10px 24px rgba(90,56,38,0.18), -10px -10px 24px rgba(255,255,255,0.78)",
                }}
              >
                {/* Light-edge gloss overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[32px]"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.45) 0%, transparent 40%)",
                  }}
                />

                {/* Avatar — neumorphic raised outer + inset inner well */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                    style={{
                      width: 120,
                      height: 120,
                      background: NEO_BG,
                      boxShadow: "8px 8px 20px rgba(90,56,38,0.22), -8px -8px 20px rgba(255,255,255,0.82)",
                      padding: 6,
                    }}
                  >
                    <div
                      className="relative h-full w-full overflow-hidden rounded-full"
                      style={{
                        boxShadow: "inset 4px 4px 10px rgba(90,56,38,0.2), inset -4px -4px 10px rgba(255,255,255,0.7)",
                        padding: 4,
                        background: NEO_BG,
                      }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-full">
                        <img
                          src={f.image}
                          alt={f.name}
                          loading="lazy"
                          width={120}
                          height={120}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ willChange: "transform" }}
                        />
                      </div>
                      {/* Gloss highlight */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5), transparent 55%)",
                        }}
                      />
                    </div>
                  </div>
                </div>  
                {/* Name */}
                <h4
                  className="font-serif text-lg font-bold sm:text-xl transition-colors duration-300 group-hover:text-[#B86A45]"
                  style={{ color: "#5a3826" }}
                >
                  {f.name}
                </h4>

                {/* Role */}
                <p className="mt-1.5 text-sm font-medium" style={{ color: "#A46A3F" }}>
                  {f.role}
                </p>

                {/* Neumorphic inset divider groove */}
                <div className="mt-5 flex items-center justify-center">
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{
                      width: 64,
                      background: NEO_BG,
                      boxShadow: "inset 3px 3px 6px rgba(90,56,38,0.18), inset -3px -3px 6px rgba(255,255,255,0.7)",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-opacity duration-300"
                      style={{ 
                        background: "linear-gradient(90deg, #D19A5B, #B86A45)",
                        width: "100%",
                        opacity: 0.6 
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Faculty;