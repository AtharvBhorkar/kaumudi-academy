import React, { useState, useMemo, useEffect, useRef } from "react";
import videoBg from "../assets/Courselisting.mp4";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/useAuthHook";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Check,
  Clock,
  BarChart3,
  Filter,
  BookOpen,
  LayoutGrid,
  List,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { getAllCourses } from "../lib/api";
import SEO from "../components/SEO";

/* ─────────────────────────────────────────────
   SEARCH BAR
   BEFORE: gap:"1rem", padding:"1rem 1.5rem" – caused flex overflow on 320px
   AFTER:  gap:"0.75rem", clamp font, min-w-0 on input, overflow:hidden on row
───────────────────────────────────────────── */
const SearchBar = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="neu-surface"
      style={{
        borderRadius: 28,
        padding: 6,
        boxShadow: focused
          ? "4px 4px 12px rgba(0,0,0,0.15),-4px -4px 12px rgba(255,255,255,0.6),0 0 0 3px hsl(30 55% 59%/0.35)"
          : undefined,
      }}
    >
      <div
        className="neu-inset"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          borderRadius: 22,
          padding: "0.85rem 1.1rem",
          overflow: "hidden",   /* prevents inner content pushing width */
          minWidth: 0,
        }}
      >
        <Search size={18} color="hsl(18,42%,25%)" strokeWidth={2.2} style={{ opacity: 0.6, flexShrink: 0 }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search for courses"
          style={{
            width: "100%",
            minWidth: 0,          /* BEFORE: missing → flex child could overflow */
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#2D2417",
            fontSize: "clamp(0.875rem,2.5vw,1rem)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        />
        {value && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange("")}
            style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
            aria-label="Clear search"
          >
            <X size={14} color="hsl(18,42%,25%)" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   FILTER CONFIG (single source of truth)
───────────────────────────────────────────── */
const FILTER_SECTIONS = [
  {
    title: "Mode of Study", key: "mode",
    options: [
      { label: "Online Live", val: "ONLINE" },
      { label: "Physical Class", val: "OFFLINE" },
    ],
  },
  {
    title: "Duration", key: "duration",
    options: [
      { label: "Monthly", val: "__fixed_monthly" },
      { label: "Semester", val: "__fixed_semester" },
      { label: "3 Months", val: "__fixed_3m" },
      { label: "6 Months", val: "__fixed_6m" },
      { label: "Year", val: "__fixed_year" },
    ],
  },
  {
    title: "Difficulty Level", key: "level",
    options: [
      { label: "Prathama (Beginner)", val: "Prathama (Beginner)" },
      { label: "Madhyama (Intermediate)", val: "Madhyama (Intermediate)" },
      { label: "Kovida (Advanced)", val: "Kovida (Advanced)" },
    ],
  },
];

/* ─────────────────────────────────────────────
   NEU CHECKBOX
   BEFORE: <label> wrapping <span onClick> → double-fire + inaccessible
   AFTER:  hidden native checkbox + htmlFor, no double event
───────────────────────────────────────────── */
const NeuCheckbox = ({ id: externalId, label, checked, onChange }) => {
  const uid = useRef(`nchk-${Math.random().toString(36).slice(2)}`);
  const id = externalId || uid.current;
  return (
    <label
      htmlFor={id}
      style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", marginBottom: "0.55rem", userSelect: "none" }}
    >
      <input id={id} type="checkbox" checked={checked} onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <motion.span
        whileTap={{ scale: 0.85 }}
        style={{
          height: 20, width: 20, minWidth: 20, borderRadius: 5,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: checked ? "#74271E" : "#F2E6D9",
          boxShadow: checked
            ? "inset 2px 2px 4px rgba(0,0,0,0.3)"
            : "3px 3px 6px rgba(0,0,0,0.12),-3px -3px 6px rgba(255,255,255,0.6)",
          transition: "background 0.2s",
        }}
      >
        {checked && <Check size={11} color="#fff" strokeWidth={3} />}
      </motion.span>
      <span style={{ fontSize: "0.84rem", color: "#4A4135", overflowWrap: "break-word", wordBreak: "break-word" }}>
        {label}
      </span>
    </label>
  );
};

/* ─────────────────────────────────────────────
   FILTER SIDEBAR (desktop)
───────────────────────────────────────────── */
const FilterSidebar = ({ filters, onToggle, onReset }) => (
  <motion.div className="neu-surface"
    style={{ borderRadius: 24, padding: "1.4rem", position: "sticky", top: "5.5rem", overflow: "hidden", minWidth: 0 }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
      <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#2D2417" }}>Refine Search</h3>
      <button onClick={onReset}
        style={{ fontSize: "0.72rem", color: "#74271E", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
        Reset All
      </button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
      {FILTER_SECTIONS.map((section) => (
        <div key={section.key}>
          <p style={{ fontSize: "0.64rem", opacity: 0.6, marginBottom: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, color: "#4A4135" }}>
            {section.title}
          </p>
          {section.options.map((opt) => (
            <NeuCheckbox
              key={opt.val}
              id={`sb-${section.key}-${opt.val}`}
              label={opt.label}
              checked={filters[section.key].includes(opt.val)}
              onChange={() => onToggle(section.key, opt.val)}
            />
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SORT DROPDOWN
   BEFORE: no outside-click close, left-aligned (could overflow right edge)
   AFTER:  ref+listener close, right:0 aligned, max-width viewport-safe
───────────────────────────────────────────── */
const SORT_OPTIONS = [
  { label: "Relevance", val: "relevance" },
  { label: "Price: Low → High", val: "priceAsc" },
  { label: "Price: High → Low", val: "priceDesc" },
  { label: "Duration: Shortest", val: "durationAsc" },
  { label: "Duration: Longest", val: "durationDesc" },
];

const SortDropdown = ({ sortBy, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, []);

  const current = SORT_OPTIONS.find((o) => o.val === sortBy)?.label ?? "Relevance";

  return (
    <div ref={ref} className="neu-surface"
      style={{ borderRadius: 16, padding: "0.5rem 0.85rem", position: "relative", minWidth: 0, width: "100%", maxWidth: 195 }}
    >
      <div onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: "0.4rem" }}
      >
        <span style={{ fontSize: "0.82rem", color: "#4A4135", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
          {current}
        </span>
        <ChevronDown size={13} style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="neu-surface"
            style={{
              position: "absolute", top: "calc(100% + 6px)",
              right: 0,                          /* BEFORE: left:0 → overflowed right edge on mobile */
              left: "auto",
              minWidth: "100%", width: "max-content",
              maxWidth: "min(210px,calc(100vw - 2rem))",  /* BEFORE: no max-width → viewport overflow */
              borderRadius: 14, padding: "0.4rem",
              display: "flex", flexDirection: "column", gap: "0.2rem", zIndex: 200,
            }}
          >
            {SORT_OPTIONS.map((item) => (
              <div key={item.val}
                onClick={() => { onChange(item.val); setOpen(false); }}
                style={{
                  padding: "0.5rem 0.7rem", borderRadius: 10, cursor: "pointer",
                  fontSize: "0.82rem", whiteSpace: "nowrap",
                  background: sortBy === item.val ? "#74271E" : "transparent",
                  color: sortBy === item.val ? "#fff" : "#4A4135",
                  transition: "background 0.15s",
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FILTER CHIP
───────────────────────────────────────────── */
const FilterChip = ({ label, onRemove }) => (
  <button onClick={onRemove}
    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E6DDC8] text-xs font-medium text-[#4A4135] hover:border-[#74271E] transition-colors"
    style={{ flexShrink: 0, maxWidth: "calc(100vw - 5rem)", overflow: "hidden" }}
  >
    <span className="truncate">{label}</span>
    <X className="w-3 h-3 flex-shrink-0" />
  </button>
);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const parsePrice = (p) => Number(String(p).replace(/[^0-9]/g, "")) || 0;
const parseDurationWeeks = (d) => {
  const s = String(d).toLowerCase();
  const wk = s.match(/(\d+)\s*week/);
  const mo = s.match(/(\d+)\s*month/);
  const yr = s.match(/(\d+)\s*year/);
  if (wk) return Number(wk[1]);
  if (mo) return Number(mo[1]) * 4;
  if (yr) return Number(yr[1]) * 52;
  return 0;
};
const durationLabel = (val) =>
  ({ __fixed_monthly: "Monthly", __fixed_semester: "Semester", __fixed_3m: "3 Months", __fixed_6m: "6 Months", __fixed_year: "Year" }[val] ?? val);

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
const AllCoursesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Shastras");
  const [modeFilter, setModeFilter] = useState([]);
  const [levelFilter, setLevelFilter] = useState([]);
  const [durationFilter, setDurationFilter] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [view, setView] = useState("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ITEMS_PER_PAGE = 6;

  const fetchCourses = async () => {
    try {
      setLoading(true); setError("");
      const response = await getAllCourses();
      const payload = response;
      const list = Array.isArray(payload) ? payload : payload?.courses || payload?.items || payload?.data || [];
      const finalList = Array.isArray(list) ? list : [];

      const mapped = finalList.map((c) => {
        let priceValue = c.price || 0;
        if (typeof priceValue === "string") priceValue = parseInt(priceValue.replace(/[^0-9]/g, "")) || 0;
        const language = Array.isArray(c.language) ? c.language.join(", ") : c.language || "";
        const image = c.image?.url || c.image || "https://i.pinimg.com/736x/c6/3c/1d/c63c1d8721a4226db27c8a2b6fd3448e.jpg";
        const instructorName = c.instructor?.name ? `Sanskrit with ${c.instructor.name}` : "";
        return {
          id: c._id || c.id,
          title: c.title || c.name || "Untitled Course",
          instructor: instructorName, instructorObj: c.instructor,
          category: c.category || "General",
          mode: c.mode || "ONLINE",
          level: c.level || "All Levels",
          duration: c.duration || "",
          description: c.description || "",
          price: typeof priceValue === "number" ? priceValue : 0,
          priceFormatted: `₹${(typeof priceValue === "number" ? priceValue : 0).toLocaleString("en-IN")}`,
          image, language, raw: c,
        };
      });
      setCourses(mapped);
    } catch (err) { setError("Failed to load courses"); console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category).filter((cat) => typeof cat === "string" && cat.trim() !== "")));
    return ["All Shastras", ...unique];
  }, [courses]);

  const resetFilters = () => {
    setSearchQuery(""); setActiveCategory("All Shastras");
    setModeFilter([]); setLevelFilter([]); setDurationFilter([]); setCurrentPage(1);
  };

  const toggle = (setter) => (val) =>
    setter((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const handleSidebarToggle = (group, val) => {
    if (group === "mode") toggle(setModeFilter)(val);
    if (group === "duration") toggle(setDurationFilter)(val);
    if (group === "level") toggle(setLevelFilter)(val);
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => courses.filter((course) => {
    const instructor = typeof course.instructor === "string" ? course.instructor : course.instructor?.name || "";
    const matchesSearch = (course.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Shastras" || course.category === activeCategory;
    const matchesMode = modeFilter.length === 0 || modeFilter.includes(course.mode);
    const matchesLevel = levelFilter.length === 0 || levelFilter.includes(course.level);
    const cd = (course.duration || "").trim(), s = cd.toLowerCase();
    const wkM = s.match(/(\d+)\s*week/), moM = s.match(/(\d+)\s*month/), yrM = s.match(/(\d+)\s*year/);
    const weeks = wkM ? Number(wkM[1]) : 0, months = moM ? Number(moM[1]) : 0, years = yrM ? Number(yrM[1]) : 0;
    const isMonthly = s.includes("monthly") || (months === 1 && s.includes("month")) || (weeks >= 3 && weeks <= 5);
    const is3m = (months === 3 && s.includes("month")) || (weeks >= 12 && weeks <= 14);
    const is6m = s.includes("semester") || (months === 6 && s.includes("month")) || (weeks >= 24 && weeks <= 28);
    const isYear = years >= 1 || (months >= 12 && s.includes("month")) || weeks >= 48;
    const matchesDuration = durationFilter.length === 0 || durationFilter.some((val) => {
      if (val === "__fixed_monthly") return isMonthly;
      if (val === "__fixed_3m") return is3m;
      if (val === "__fixed_6m") return is6m;
      if (val === "__fixed_semester") return is6m;
      if (val === "__fixed_year") return isYear;
      return val === cd;
    });
    return matchesSearch && matchesCategory && matchesMode && matchesLevel && matchesDuration;
  }), [searchQuery, activeCategory, modeFilter, levelFilter, durationFilter, courses]);

  const sortedCourses = useMemo(() => {
    const arr = [...filteredCourses];
    if (sortBy === "priceAsc") arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "priceDesc") arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "durationAsc") arr.sort((a, b) => parseDurationWeeks(a.duration) - parseDurationWeeks(b.duration));
    if (sortBy === "durationDesc") arr.sort((a, b) => parseDurationWeeks(b.duration) - parseDurationWeeks(a.duration));
    return arr;
  }, [filteredCourses, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCourses = sortedCourses.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const isFiltered = searchQuery !== "" || activeCategory !== "All Shastras" || modeFilter.length > 0 || levelFilter.length > 0 || durationFilter.length > 0;
  const activeFilterCount = modeFilter.length + levelFilter.length + durationFilter.length + (activeCategory !== "All Shastras" ? 1 : 0);

  /* ── RENDER ── */
  return (
    /*
     * FIX PRIMARY (root): overflow-x:hidden
     * Without this the -8px box-shadow on .neu-surface at the edge
     * of the viewport creates a horizontal scrollbar and shifts content
     * — that's exactly what caused the left-cut in the screenshot.
     */
    <div className="min-h-screen bg-[#f2e6d8] font-serif text-[#2D2417] selection:bg-[#B38B3F] selection:text-white antialiased"
      style={{ overflowX: "hidden" }}
    >
      <SEO
        title="Sanskrit Courses | Kaumudi Sanskrit Academy by Graphura India"
        description="Explore authentic Sanskrit courses at Kaumudi Sanskrit Academy."
        canonicalPath="/allcourses"
        og={{ type: "website" }}
        keywords={["Sanskrit courses online", "Kaumudi Sanskrit Academy"]}
      />

      {/* ══════════════════════════════
          HERO
          BEFORE: h-screen (100vh) — cuts off on mobile browsers with address bar
          AFTER:  min-h-[100svh] fallback → min-h-screen, max-h capped
          BEFORE: px-4 sm:px-8 — too narrow for shloka on 320px
          AFTER:  px uses clamp for symmetric breathing room
      ══════════════════════════════ */}
      <header className="relative w-full overflow-hidden"
        /* BEFORE: h-screen min-h-[600px] max-h-[900px] */
        style={{
          minHeight: "100dvh",
          height: "100dvh"
        }}
      >
        <video src={videoBg} autoPlay loop muted playsInline
          onLoadedMetadata={(e) => { e.target.playbackRate = 0.4; }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(90deg,rgba(118,71,59,0.55) 0%,rgba(110,51,36,0.45) 40%,rgba(0,0,0,0.25) 100%)" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.5) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{
            /* BEFORE: px-4 sm:px-8 — used Tailwind classes that didn't apply inside style prop */
            /* AFTER: symmetric clamp padding so nothing clips on any width ≥ 320px */
            height: "100dvh",
            padding: "4.5rem clamp(1.25rem,6vw,5rem)",
            minHeight: "100dvh",
            boxSizing: "border-box",
          }}
        >
          {/* Shloka */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mb-5 sm:mb-8 w-full"
          >
            <p className="text-[#c9a84e] leading-relaxed"
              style={{
                fontFamily: "'Noto Sans Devanagari', serif",
                /* BEFORE: clamp(1.1rem,3vw,1.9rem) — 1.1rem at 320px pushed line wider than screen */
                /* AFTER:  floor 0.9rem so it fits on iPhone SE (375px) */
                fontSize: "clamp(0.9rem,3vw,1.85rem)",
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                lineHeight: 1.8,
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              ज्ञानं मे लेख्यतां देव, बुद्धिर्मे दीयतां सदा ।<br />
              व्यासवाक्यप्रकाशेन, मार्गो मे दर्श्यतां सदा ॥
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12 sm:w-20 bg-[#c9a84e]/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84e]/80" />
              <div className="h-px w-12 sm:w-20 bg-[#c9a84e]/60" />
            </div>
          </motion.div>

          {/* Heading
              BEFORE: duplicate initial/animate/transition props → React warns, takes first set only
              AFTER:  single set, delay:0.2 preserved */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-bold leading-tight tracking-tight mb-4 w-full"
            style={{
              /* BEFORE: clamp(2.2rem,6vw,4.5rem) → 2.2rem at 375px = 33px, "Rediscover" wraps awkwardly */
              /* AFTER:  floor 1.75rem = 28px, fits comfortably on 320px */
              fontSize: "clamp(1.75rem,7vw,4.5rem)",
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
              overflowWrap: "break-word", wordBreak: "break-word",
            }}
          >
            Rediscover the Power of{" "}
            <span className="italic text-[#c9a84e]"
              style={{ textShadow: "0 4px 24px rgba(201,168,78,0.4)" }}>
              Sanskrit
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#E6E2D3] font-light leading-relaxed max-w-2xl mb-8 w-full"
            style={{ fontSize: "clamp(0.85rem,2.2vw,1.1rem)", textShadow: "0 2px 8px rgba(0,0,0,0.5)", overflowWrap: "break-word" }}
          >
            Immerse yourself in the profound heritage of classical Sanskrit through our curated traditional and modern learning programs.
          </motion.p>
        </div>
      </header>

      {/* ══════════════════════════════
          SEARCH BAR
          BEFORE: px-4 sm:px-6 lg:px-10 max-w-screen-2xl
          AFTER:  clamp padding, max-w-screen-xl (tighter, safer)
      ══════════════════════════════ */}
      <div id="courses-section" className="relative z-30 w-full"
        style={{ padding: "2.5rem clamp(1rem,4vw,2.5rem) 0" }}>
        <div className="max-w-screen-xl mx-auto">
          <SearchBar value={searchQuery} onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }} />
        </div>
      </div>

      {/* ══════════════════════════════
          CATEGORY TABS
          BEFORE: missing entirely (computed but never rendered)
          AFTER:  horizontal scroll with no-scrollbar, flex-shrink-0 per pill
      ══════════════════════════════ */}
      {categories.length > 1 && (
        <div className="w-full mt-4" style={{ padding: "0 clamp(1rem,4vw,2.5rem)" }}>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex gap-2 no-scrollbar" style={{ overflowX: "auto", paddingBottom: 4 }}>
              {categories.map((cat) => (
                <button key={cat}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                  style={{
                    whiteSpace: "nowrap", flexShrink: 0,
                    padding: "0.38rem 0.9rem", borderRadius: 999,
                    fontSize: "0.7rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                    background: activeCategory === cat ? "#74271E" : "#F2E6D9",
                    color: activeCategory === cat ? "#fff" : "#4A4135",
                    boxShadow: activeCategory === cat
                      ? "inset 2px 2px 5px rgba(0,0,0,0.2)"
                      : "3px 3px 6px rgba(0,0,0,0.1),-3px -3px 6px rgba(255,255,255,0.6)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          MAIN LAYOUT
          BEFORE: grid-cols-[300px_1fr] px-4 lg:px-10 max-w-screen-2xl
          AFTER:  grid-cols-[260px_1fr], clamp padding, max-w-screen-xl
      ══════════════════════════════ */}
      <div className="w-full max-w-screen-xl mx-auto pb-16"
        style={{ padding: "2rem clamp(1rem,4vw,2.5rem) 4rem" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-7">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block min-w-0">
            <FilterSidebar
              filters={{ mode: modeFilter, duration: durationFilter, level: levelFilter }}
              onToggle={handleSidebarToggle}
              onReset={resetFilters}
            />
          </aside>

          {/* Main content */}
          <main className="min-w-0 py-1">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5">
              {/* Active chips */}
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                <span className="text-sm font-bold text-[#4A4135] flex-shrink-0">
                  {sortedCourses.length} results
                </span>
                {isFiltered && (
                  <>
                    {activeCategory !== "All Shastras" && (
                      <FilterChip label={activeCategory}
                        onRemove={() => { setActiveCategory("All Shastras"); setCurrentPage(1); }} />
                    )}
                    {modeFilter.map((m) => (
                      <FilterChip key={`m-${m}`} label={m}
                        onRemove={() => { setModeFilter(modeFilter.filter((x) => x !== m)); setCurrentPage(1); }} />
                    ))}
                    {levelFilter.map((l) => (
                      <FilterChip key={`l-${l}`} label={l}
                        onRemove={() => { setLevelFilter(levelFilter.filter((x) => x !== l)); setCurrentPage(1); }} />
                    ))}
                    {durationFilter.map((d) => (
                      <FilterChip key={`d-${d}`} label={durationLabel(d)}
                        onRemove={() => { setDurationFilter(durationFilter.filter((x) => x !== d)); setCurrentPage(1); }} />
                    ))}
                    <button onClick={resetFilters}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#74271E] text-white text-xs font-bold flex-shrink-0">
                      Clear All
                    </button>
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0" style={{ alignSelf: "flex-start" }}>
                {/* Mobile filter button
                    BEFORE: missing — mobileFiltersOpen state existed but nothing triggered it
                    AFTER:  visible on mobile only, shows badge count */}
                <button onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#E2D4A6] bg-white text-[#4A4135] relative flex-shrink-0"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal size={13} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#74271E] text-white font-black rounded-full flex items-center justify-center"
                      style={{ fontSize: 9, width: 16, height: 16 }}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <SortDropdown sortBy={sortBy} onChange={(v) => { setSortBy(v); setCurrentPage(1); }} />

                {/* Grid/List toggle */}
                <div className="neu-surface flex-shrink-0"
                  style={{ borderRadius: 14, padding: "0.25rem", display: "flex", gap: "0.2rem" }}>
                  {[{ mode: "grid", Icon: LayoutGrid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                    <button key={mode} onClick={() => setView(mode)} aria-label={`${mode} view`}
                      style={{
                        padding: "0.42rem", borderRadius: 10, border: "none", cursor: "pointer",
                        background: view === mode ? "#74271E" : "transparent",
                        color: view === mode ? "#fff" : "#4A4135",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course cards */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-11 h-11 rounded-full border-4 border-[#E2D4A6] border-t-[#74271E] animate-spin mb-4" />
                <p className="text-[#4A4135] font-semibold text-sm">Loading courses…</p>
              </div>
            ) : error ? (
              <div className="neu-surface flex flex-col items-center text-center"
                style={{ borderRadius: 28, padding: "3.5rem 1.5rem", gap: "1.2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="neu-inset"
                  style={{ height: 88, width: 88, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Search size={36} color="#5A3626" />
                </div>
                <h2 style={{ fontSize: "clamp(1.15rem,4vw,1.55rem)", fontWeight: 700, color: "#74271E" }}>
                  Failed to load courses
                </h2>
                <p style={{ opacity: 0.7, fontSize: "0.88rem" }}>Something went wrong. Please try again.</p>
                <button
                  onClick={fetchCourses}
                  className="text-white py-2 px-6 text-sm rounded-lg bg-[#682c29] cursor-pointer border border-[#682c29] transition-all duration-300 shadow-[3px_3px_6px_#4a1e1c,-3px_-3px_6px_#8a3a36] hover:shadow-[4px_4px_10px_#4a1e1c,-4px_-4px_10px_#8a3a36] active:shadow-[inset_2px_2px_6px_#4a1e1c,inset_-2px_-2px_6px_#8a3a36] active:scale-95"
                >
                  Try Again
                </button>
              </div>

            ) : paginatedCourses.length > 0 ? (
              /*
               * BEFORE: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
               *         Inside lg:grid-cols-[300px_1fr], the "lg" breakpoint
               *         also triggers the 3-col card grid, making cards tiny.
               * AFTER:  sm:grid-cols-2 xl:grid-cols-3
               *         Cards go 2-col at 640px, 3-col only at 1280px (xl)
               *         where there's enough room alongside the sidebar.
               */
              <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-5"}>
                {paginatedCourses.map((course) => (
                  <motion.div key={course.id}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45 }}
                    className={[
                      "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl",
                      "border border-[#E2D4A6]/40 transition-all duration-500 hover:-translate-y-1",
                      "min-w-0 w-full",  /* FIX: prevents card from stretching grid */
                      view === "list" ? "flex flex-col sm:flex-row" : "flex flex-col",
                    ].join(" ")}
                  >
                    {/* Image
                        BEFORE: list view used w-1/3 which breaks at narrow widths
                        AFTER:  fixed w-44 md:w-52 with minHeight */}
                    <div
                      className={["relative overflow-hidden flex-shrink-0",
                        view === "list" ? "w-full sm:w-44 md:w-52" : "w-full"].join(" ")}
                      style={view === "list" ? { minHeight: 160 } : { aspectRatio: "16/10" }}
                    >
                      <img src={course.image?.url || "https://placehold.co/300x200"} alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        style={view === "list" ? { height: "100%", minHeight: 160, objectFit: "cover" } : {}}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-[#74271E] text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {course.mode}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-0.5 bg-[#74271E]/90 text-white text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={[
                      "p-4 sm:p-5 flex flex-col flex-grow",
                      "bg-[#FDFCF7]/50 group-hover:bg-white transition-colors",
                      "min-w-0",  /* FIX: prevents text overflow in flex child */
                      view === "list" ? "sm:flex-1" : "",
                    ].join(" ")}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <BookOpen className="w-3 h-3 text-[#B38B3F] flex-shrink-0" />
                        <span className="text-[10px] font-bold text-[#8B6D31] uppercase tracking-wide truncate">
                          {course.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#2D2417] leading-snug mb-2 group-hover:text-[#74271E] transition-colors line-clamp-2"
                        style={{ fontSize: "clamp(0.93rem,2.5vw,1.05rem)" }}>
                        {course.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed mb-3 line-clamp-2 flex-grow">
                        {course.description || `A ${course.duration} immersive journey for ${course.level} seekers.`}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between py-2.5 border-y border-[#E2D4A6]/30 mb-3">
                          <div className="flex items-center gap-1 min-w-0">
                            <Clock className="w-3.5 h-3.5 text-[#B38B3F] flex-shrink-0" />
                            <span className="text-xs font-bold text-[#4A4135] truncate">{course.duration || "—"}</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0 ml-2">
                            <BarChart3 className="w-3.5 h-3.5 text-[#B38B3F] flex-shrink-0" />
                            <span className="text-xs font-bold text-[#4A4135] truncate max-w-[90px]">{course.level}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base font-bold text-[#74271E] tabular-nums tracking-tight flex-shrink-0">
                            {course.priceFormatted || "₹0"}
                          </span>
                          <button
                            onClick={() => navigate(`/coursedetail/${course.id}`, { state: { course } })}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c9a84e] hover:bg-[#b38b3f] text-white text-[10px] font-bold uppercase tracking-wider rounded-md transition-all shadow-sm active:scale-95 flex-shrink-0"
                          >
                            Learn More
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            ) : (
              <div className="py-20 flex flex-col items-center justify-center bg-white border border-[#E2D4A6] rounded-2xl text-center px-4">
                <div className="w-14 h-14 bg-[#FDFCF7] rounded-full flex items-center justify-center mb-5 border border-[#E2D4A6]">
                  <Search className="w-5 h-5 text-stone-300" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2417] mb-2">No Shastras Found</h3>
                <p className="text-stone-500 italic mb-2 text-sm">Try adjusting your filters to find what you seek.</p>
                <p className="text-sm text-stone-400 mb-6">
                  {courses.length === 0
                    ? "There are no active courses available right now."
                    : `${courses.length} course${courses.length !== 1 ? "s" : ""} fetched — none match current filters.`}
                </p>
                <button onClick={resetFilters}
                  className="px-7 py-2.5 bg-[#74271E] text-white rounded-xl text-xs font-bold uppercase tracking-widest">
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {sortedCourses.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
                  className="p-2.5 rounded-xl border border-[#E2D4A6] text-[#8B6D31] hover:bg-white transition-all disabled:opacity-30 flex-shrink-0"
                  aria-label="Previous page">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => setCurrentPage(n)}
                    className={["w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all flex-shrink-0",
                      n === safePage
                        ? "bg-[#74271E] text-white shadow-lg shadow-[#74271E]/20"
                        : "text-[#8B6D31] bg-white border border-[#E2D4A6] hover:border-[#B38B3F]"].join(" ")}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
                  className="p-2.5 rounded-xl border border-[#E2D4A6] text-[#8B6D31] hover:bg-white transition-all disabled:opacity-30 flex-shrink-0"
                  aria-label="Next page">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ══════════════════════════════
          MOBILE FILTER DRAWER
          BEFORE: plain div, no animation, wrong duration options
          AFTER:  AnimatePresence spring slide-in, same options as desktop
      ══════════════════════════════ */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/45"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full bg-[#FBF4E2] border-r border-[#E2D4A6] shadow-2xl overflow-y-auto no-scrollbar"
              style={{ width: "min(88vw,340px)" }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#74271E]" />
                    <h3 className="text-base font-bold text-[#2D2417]">Filters</h3>
                  </div>
                  <button onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-xl border border-[#E2D4A6] bg-white" aria-label="Close filters">
                    <X className="w-4 h-4 text-[#74271E]" />
                  </button>
                </div>

                <div className="space-y-7">
                  {[
                    { section: FILTER_SECTIONS[0], state: modeFilter, setter: setModeFilter },
                    { section: FILTER_SECTIONS[1], state: durationFilter, setter: setDurationFilter },
                    { section: FILTER_SECTIONS[2], state: levelFilter, setter: setLevelFilter },
                  ].map(({ section, state, setter }) => (
                    <div key={section.key}>
                      <p className="text-[10px] font-black tracking-[0.15em] text-[#8B6D31] mb-3 uppercase opacity-70">
                        {section.title}
                      </p>
                      {section.options.map((opt) => (
                        <NeuCheckbox
                          key={opt.val}
                          id={`mob-${section.key}-${opt.val}`}
                          label={opt.label}
                          checked={state.includes(opt.val)}
                          onChange={() => { toggle(setter)(opt.val); setCurrentPage(1); }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#74271E] text-white text-sm font-bold">
                    Apply & Close
                  </button>
                  <button onClick={() => { resetFilters(); setMobileFiltersOpen(false); }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#E2D4A6] text-sm font-bold text-[#4A4135]">
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════
          GLOBAL STYLES
      ══════════════════════════════ */}
      <style>{`
        /*
         * PRIMARY FIX: This resolves the left-cut bug seen in the screenshot.
         * The .neu-surface element has box-shadow with -8px offset, which
         * extends 8px past the LEFT edge when placed near viewport edge on mobile.
         * That 8px creates hidden scrollable area, and the browser centers content
         * in the wider area → visible content appears shifted right / cut left.
         */
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw;
        }

        /*
         * RESPONSIVE SHADOWS:
         * On mobile use smaller spread so shadows stay inside viewport bounds.
         * On desktop keep original deeper shadows for the neumorphic look.
         */
        @media (max-width: 639px) {
          .neu-surface {
            background: #F2E6D9;
            box-shadow:
              3px 3px 8px rgba(0,0,0,0.12),
              -3px -3px 8px rgba(255,255,255,0.56);
          }
          .neu-inset {
            background: #F2E6D9;
            box-shadow:
              inset 2px 2px 5px rgba(0,0,0,0.12),
              inset -2px -2px 5px rgba(255,255,255,0.56);
          }
        }
        @media (min-width: 640px) {
          .neu-surface {
            background: #F2E6D9;
            box-shadow:
              8px 8px 16px rgba(0,0,0,0.15),
              -8px -8px 16px rgba(255,255,255,0.6);
          }
          .neu-inset {
            background: #F2E6D9;
            box-shadow:
              inset 4px 4px 8px rgba(0,0,0,0.15),
              inset -4px -4px 8px rgba(255,255,255,0.6);
          }
        }

        /* Hide scrollbars (category tabs + drawer) — cross-browser */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AllCoursesPage;