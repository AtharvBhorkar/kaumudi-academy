import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronRight } from "lucide-react";
import logo from "../assets/logo-bgremove.webp";
import { useAuth } from "../context/useAuthHook";

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/allcourses" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Contact", to: "/contact" },
];

/* ─────────────────────────────────────────
   NEOMORPHIC DESIGN TOKENS  (dark-maroon)
   Base surface   : #2e0d09
   Highlight wall : rgba(90,22,12, 0.85)   ← "lighter" face
   Shadow wall    : rgba(6, 0, 0, 0.95)    ← "darker" face
───────────────────────────────────────── */

const NEO = {
  base: "#2e0d09",
  surface: "#3a110d",
  raised: "-5px -5px 12px rgba(88,20,10,0.75), 6px 6px 14px rgba(4,0,0,0.92)",
  raisedSm: "-3px -3px 7px rgba(88,20,10,0.7), 3px 3px 8px rgba(4,0,0,0.9)",
  inset: "inset -3px -3px 7px rgba(88,20,10,0.65), inset 3px 3px 8px rgba(4,0,0,0.9)",
  gold: "#d6b15c",
  goldDark: "#a8842a",
  goldGlow: "0 0 18px rgba(214,177,92,0.35), 0 0 40px rgba(214,177,92,0.12)",
  pillRaised: "-4px -4px 9px rgba(88,20,10,0.7), 4px 4px 10px rgba(4,0,0,0.9)",
  pillInset: "inset -2px -2px 6px rgba(88,20,10,0.6), inset 2px 2px 7px rgba(4,0,0,0.88)",
};

/* ─────────────────────────────────────────
   ANIMATIONS
───────────────────────────────────────── */

const drawerVariants = {
  hidden: { opacity: 0, height: 0, y: -8 },
  visible: {
    opacity: 1, height: "auto", y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28 },
  },
  exit: { opacity: 0, height: 0, y: -6, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 7 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
};

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, loading, logout } = useAuth();
  const { pathname } = useLocation();
  const mobileMenuRef = useRef(null);

  const transparentPages = ["/", "/about", "/faculty", "/contact", "/allcourses"];
  const isHome = transparentPages.includes(pathname);

  const role = user?.role?.toUpperCase();
  const isStudentLoggedIn = !loading && isAuthenticated && role === "STUDENT";

  const handleLogout = () => { setOpen(false); logout("/"); };

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* focus-trap + escape */
  useEffect(() => {
    if (!open) return;
    mobileMenuRef.current?.querySelector("a,button")?.focus();
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ── helpers ── */
  const solidBg = `background: ${NEO.base};`;
  const navShadow = `box-shadow: ${NEO.raised}, 0 1px 0 rgba(214,177,92,0.08);`;
  const isTransparent = isHome && !scrolled;

  return (
    <>
      {/* ── GLOBAL STYLES injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Raleway:wght@400;500;600;700&display=swap');

        .ksa-nav {
          font-family: 'Raleway', sans-serif;
        }
        .ksa-brand-title {
          font-family: 'Cinzel', serif;
          letter-spacing: 0.2em;
        }
        /* raised neo pill */
        .ksa-neo-pill {
          border-radius: 50px;
          box-shadow: ${NEO.pillRaised};
          background: ${NEO.surface};
          transition: box-shadow 0.25s ease, background 0.25s ease;
        }
        .ksa-neo-pill:hover {
          box-shadow: ${NEO.pillInset};
        }
        /* inset active pill */
        .ksa-neo-pill-active {
          border-radius: 50px;
          box-shadow: ${NEO.pillInset};
          background: ${NEO.base};
        }
        /* gold button */
        .ksa-gold-btn {
          background: linear-gradient(135deg, #e0be6a 0%, #c49a38 50%, #d6b15c 100%);
          box-shadow: ${NEO.raisedSm}, ${NEO.goldGlow};
          border: none;
          border-radius: 50px;
          color: #2e0d09;
          font-family: 'Raleway', sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: box-shadow 0.22s ease, filter 0.22s ease, transform 0.15s ease;
        }
        .ksa-gold-btn:hover {
          box-shadow: ${NEO.inset}, ${NEO.goldGlow};
          filter: brightness(1.06);
        }
        .ksa-gold-btn:active {
          transform: scale(0.97);
        }
        /* logo container */
        .ksa-logo-wrap {
          border-radius: 14px;
          box-shadow: ${NEO.raised}, inset 0 0 0 1px rgba(214,177,92,0.12);
          background: ${NEO.surface};
          transition: box-shadow 0.3s ease;
        }
        .ksa-logo-wrap:hover {
          box-shadow: ${NEO.raisedSm}, inset 0 0 0 1px rgba(214,177,92,0.25), ${NEO.goldGlow};
        }
        /* divider line */
        .ksa-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(214,177,92,0.25), transparent);
        }
        /* mobile item */
        .ksa-mobile-item {
          border-radius: 12px;
          box-shadow: ${NEO.raisedSm};
          background: ${NEO.surface};
          transition: box-shadow 0.2s ease;
        }
        .ksa-mobile-item:hover,
        .ksa-mobile-item:focus-within {
          box-shadow: ${NEO.inset};
        }
        /* nav link underline dot */
        .ksa-nav-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: ${NEO.gold};
          box-shadow: 0 0 6px rgba(214,177,92,0.7);
          margin: 0 auto;
          margin-top: 3px;
        }
        /* toggle button */
        .ksa-toggle {
          border-radius: 10px;
          box-shadow: ${NEO.raisedSm};
          background: ${NEO.surface};
          border: 1px solid rgba(214,177,92,0.1);
          color: ${NEO.gold};
          transition: box-shadow 0.2s ease;
        }
        .ksa-toggle:hover {
          box-shadow: ${NEO.inset};
        }
        /* profile chip */
        .ksa-profile-chip {
          border-radius: 50px;
          box-shadow: ${NEO.raisedSm};
          background: ${NEO.surface};
          border: 1px solid rgba(214,177,92,0.15);
          transition: box-shadow 0.2s ease;
        }
        .ksa-profile-chip:hover {
          box-shadow: ${NEO.inset};
          border-color: rgba(214,177,92,0.3);
        }
        /* avatar */
        .ksa-avatar {
          background: ${NEO.base};
          box-shadow: ${NEO.inset};
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        /* scrollbar in mobile */
        .ksa-drawer::-webkit-scrollbar { width: 0; }
      `}</style>

      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="ksa-nav"
        style={{
          position: "relative",
          position: isHome ? "fixed" : "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          transition: "background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
          ...(isTransparent
            ? { background: "transparent", boxShadow: "none", borderBottom: "1px solid transparent" }
            : {
              background: NEO.base,
              boxShadow: `${NEO.raised}, 0 1px 0 rgba(214,177,92,0.1)`,
              borderBottom: "1px solid rgba(214,177,92,0.12)",
            }),
        }}
      >
        {/* subtle top accent line */}
        {!isTransparent && (
          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, rgba(214,177,92,0.5) 50%, transparent 100%)",
          }} />
        )}

        <div style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>

          {/* ─── BRAND ─── */}
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", outline: "none" }}
          >
            <motion.div
              className="ksa-logo-wrap"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              style={{ width: 48, height: 48, display: "grid", placeItems: "center", padding: 6, flexShrink: 0 }}
            >
              <img src={logo} alt="Kaumudi Logo" style={{ width: "100%", filter: "brightness(1.1) contrast(1.05)" }} />
            </motion.div>

            <div style={{ lineHeight: 1.15 }}>
              <div
                className="ksa-brand-title"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: NEO.gold,
                  letterSpacing: "0.22em",
                  textShadow: "0 0 14px rgba(214,177,92,0.4)",
                }}
              >
                KAUMUDI
              </div>
              <div style={{
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: 1,
              }}>
                Sanskrit Academy
              </div>
            </div>
          </Link>

          {/* ─── DESKTOP NAV ─── */}
          <ul style={{
            display: "none",
            alignItems: "center",
            gap: 6,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }} className="desktop-nav">
            {NAV_ITEMS.map(({ label, to }) => {
              const isActive = pathname === to;
              return (
                <li key={label} style={{ position: "relative" }}>
                  <Link
                    to={to}
                    aria-current={isActive ? "page" : undefined}
                    className=""
                    style={{
                      display: "block",
                      padding: "7px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: isActive ? NEO.gold : "rgba(255,255,255,0.78)",
                      textDecoration: "none",
                      outline: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                    {isActive && <div className="ksa-nav-dot" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ─── RIGHT ACTIONS ─── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>

            {/* Desktop: authenticated */}
            {isStudentLoggedIn ? (
              <div className="desktop-action" style={{ display: "none", alignItems: "center", gap: 10 }}>
                <Link to="/student/overview" style={{ textDecoration: "none" }}>
                  <div className="ksa-profile-chip" style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 16px 7px 8px", cursor: "pointer" }}>
                    <div className="ksa-avatar" style={{ width: 30, height: 30 }}>
                      <User size={16} color={NEO.gold} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>
                      Profile
                    </span>
                  </div>
                </Link>

                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ksa-gold-btn"
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", fontSize: 12, letterSpacing: "0.07em" }}
                >
                  <LogOut size={13} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="desktop-action" style={{ display: "none" }}>
                <Link to="/auth" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ksa-gold-btn"
                    style={{ padding: "10px 26px", fontSize: 13, letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    Student Login
                    <ChevronRight size={14} />
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
              whileTap={{ scale: 0.93 }}
              className="ksa-toggle mobile-toggle"
              style={{ padding: "9px", display: "flex", cursor: "pointer", outline: "none" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={22} color={NEO.gold} />
                  </motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={22} color={NEO.gold} />
                  </motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ─── MOBILE DRAWER ─── */}
        <AnimatePresence>
          {open && (
            <>
              {/* backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                style={{
                  position: "fixed", inset: 0, zIndex: 40,
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(3px)",
                }}
              />

              {/* panel */}
              <motion.div
                id="mobile-menu"
                ref={mobileMenuRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                className="ksa-drawer"
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "relative",
                  zIndex: 50,
                  background: NEO.base,
                  borderTop: "1px solid rgba(214,177,92,0.15)",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 72px)",
                  boxShadow: `0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(214,177,92,0.1)`,
                }}
              >
                {/* gold top accent */}
                <div style={{
                  height: 1,
                  background: "linear-gradient(90deg, transparent 0%, rgba(214,177,92,0.4) 50%, transparent 100%)",
                }} />

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  style={{ padding: "20px 20px 28px" }}
                >
                  {/* profile chip (mobile) */}
                  {isStudentLoggedIn && (
                    <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
                      <Link to="/student/overview" onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
                        <div className="ksa-mobile-item" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
                          <div className="ksa-avatar" style={{ width: 36, height: 36, flexShrink: 0 }}>
                            <User size={18} color={NEO.gold} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: NEO.gold, letterSpacing: "0.04em" }}>My Profile</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>View dashboard</div>
                          </div>
                          <ChevronRight size={16} color="rgba(214,177,92,0.5)" style={{ marginLeft: "auto" }} />
                        </div>
                      </Link>
                    </motion.div>
                  )}

                  {/* divider */}
                  {isStudentLoggedIn && <div className="ksa-divider" style={{ marginBottom: 12 }} />}

                  {/* nav links */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {NAV_ITEMS.map(({ label, to }) => {
                      const isActive = pathname === to;
                      return (
                        <motion.div key={label} variants={fadeUp}>
                          <Link
                            to={to}
                            onClick={() => setOpen(false)}
                            className={isActive ? "ksa-neo-pill-active" : "ksa-mobile-item"}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "13px 18px",
                              borderRadius: isActive ? 50 : 12,
                              textDecoration: "none",
                              fontSize: 15,
                              fontWeight: isActive ? 700 : 500,
                              letterSpacing: "0.04em",
                              color: isActive ? NEO.gold : "rgba(230,210,195,0.88)",
                            }}
                          >
                            {label}
                            <ChevronRight size={15} color={isActive ? NEO.gold : "rgba(255,255,255,0.25)"} />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* divider */}
                  <div className="ksa-divider" style={{ margin: "18px 0" }} />

                  {/* CTA */}
                  <motion.div variants={fadeUp}>
                    {isStudentLoggedIn ? (
                      <motion.button
                        onClick={handleLogout}
                        whileTap={{ scale: 0.97 }}
                        className="ksa-gold-btn"
                        style={{
                          width: "100%",
                          padding: "14px",
                          fontSize: 15,
                          letterSpacing: "0.07em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                        }}
                      >
                        <LogOut size={17} />
                        Logout
                      </motion.button>
                    ) : (
                      <Link to="/auth" onClick={() => setOpen(false)} style={{ textDecoration: "none" }}>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="ksa-gold-btn"
                          style={{
                            width: "100%",
                            padding: "14px",
                            fontSize: 15,
                            letterSpacing: "0.07em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                          }}
                        >
                          Student Login
                          <ChevronRight size={17} />
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* responsive CSS — can't use Tailwind lg: inside JSX style, so we inject it */}
        <style>{`
          @media (min-width: 1024px) {
            .desktop-nav { display: flex !important; }
            .desktop-action { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>
      </nav>
    </>
  );
}