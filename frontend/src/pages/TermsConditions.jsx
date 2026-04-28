import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import home2 from "../assets/home/home2.webp";

export default function TermsCondition() {
  const [active, setActive] = useState("acceptance");
  const observerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const pillsRef = useRef({});
  const pillsContainerRef = useRef(null);

  const sections = [
    { id: "acceptance", label: "Acceptance" },
    { id: "use-of-services", label: "Use of Services" },
    { id: "responsibilities", label: "Responsibilities" },
    { id: "intellectual-property", label: "Intellectual Property" },
    { id: "liability", label: "Liability" },
    { id: "termination", label: "Termination" },
    { id: "law", label: "Governing Law" },
  ];

  const connectObserver = () => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    connectObserver();
    return () => observerRef.current?.disconnect();
  }, []);

  // Sirf horizontal scroll — vertical touch nahi karega
  useEffect(() => {
    const pill = pillsRef.current[active];
    const container = pillsContainerRef.current;
    if (!pill || !container) return;

    const pillLeft = pill.offsetLeft;
    const pillWidth = pill.offsetWidth;
    const containerWidth = container.offsetWidth;
    const targetScrollLeft = pillLeft - containerWidth / 2 + pillWidth / 2;

    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  }, [active]);

  const scrollTo = (id) => {
    isScrollingRef.current = true;
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      isScrollingRef.current = false;
      connectObserver();
    }, 900);
  };

  const GoldenDivider = () => (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, #d6b25e, transparent)" }} />
      <svg width="28" height="16" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="10" r="3" fill="#d6b25e" />
        <circle cx="18" cy="10" r="5.5" stroke="#d6b25e" strokeWidth="0.8" fill="none" />
        <line x1="1" y1="10" x2="8" y2="10" stroke="#d6b25e" strokeWidth="1" strokeLinecap="round" />
        <line x1="28" y1="10" x2="35" y2="10" stroke="#d6b25e" strokeWidth="1" strokeLinecap="round" />
        <circle cx="3" cy="10" r="1" fill="#d6b25e" />
        <circle cx="33" cy="10" r="1" fill="#d6b25e" />
      </svg>
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(to left, #d6b25e, transparent)" }} />
    </div>
  );

  return (
    <section className="bg-[#FBF4E2] min-h-screen py-10 mb-[-70px]">
      <SEO
        title="Terms & Conditions | Kaumudi Sanskrit Academy by Graphura India"
        description="Read the terms and conditions for using Kaumudi Sanskrit Academy services, a venture of Graphura India Private Limited."
        canonicalPath="/terms"
        og={{ type: "website" }}
        keywords={["Terms and Conditions", "Kaumudi Academy terms", "Graphura India Private Limited legal", "Academy service agreement"]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms & Conditions",
            description: "Read the terms and conditions for using Kaumudi Sanskrit Academy services.",
            url: (typeof window !== "undefined" ? window.location.origin : "") + "/terms",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: (typeof window !== "undefined" ? window.location.origin : "") + "/" },
              { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: (typeof window !== "undefined" ? window.location.origin : "") + "/terms" },
            ],
          },
        ]}
      />

      {/* HERO */}
      <div className="flex justify-center px-3 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-44 sm:h-60 lg:h-72 w-full max-w-[98vw] overflow-hidden rounded-3xl group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out scale-110 group-hover:scale-100"
            style={{ backgroundImage: `url(${home2})` }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(90,54,38,0.68)" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold drop-shadow-lg mb-4">
              Terms & Conditions
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #d6b25e)" }} />
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="10" r="3.5" fill="#d6b25e" />
                <circle cx="18" cy="10" r="6.5" stroke="#d6b25e" strokeWidth="0.8" fill="none" />
                <line x1="1" y1="10" x2="9" y2="10" stroke="#d6b25e" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="27" y1="10" x2="35" y2="10" stroke="#d6b25e" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="4" cy="10" r="1.3" fill="#d6b25e" />
                <circle cx="32" cy="10" r="1.3" fill="#d6b25e" />
              </svg>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #d6b25e)" }} />
            </div>

            <p className="text-xs sm:text-sm tracking-widest opacity-90 font-semibold uppercase">
              Please read these terms carefully before using our services
            </p>
          </div>
        </motion.div>
      </div>

      {/* MOBILE TOC PILLS */}
      <div className="lg:hidden mt-5">
        <div
          ref={pillsContainerRef}
          className="overflow-x-auto no-scrollbar px-3 sm:px-5"
        >
          <div className="flex gap-2 w-max pl-1 pr-2">
            {sections.map((item) => (
              <button
                key={item.id}
                ref={(el) => (pillsRef.current[item.id] = el)}
                onClick={() => scrollTo(item.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap transition-all duration-200 ${
                  active === item.id
                    ? "bg-[#5a3626] text-white border-[#5a3626]"
                    : "bg-white/80 text-[#5a3626] border-[#c9a87c]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="w-full px-4 sm:px-6 lg:pl-16 lg:pr-16 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6 lg:gap-20">

        {/* DESKTOP SIDEBAR — original */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block rounded-2xl p-6 h-fit shadow-lg overflow-hidden"
          style={{ backgroundColor: "#5a3626", position: "relative", top: "1rem", alignSelf: "start" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(https://i.pinimg.com/736x/59/9e/9c/599e9c8fba21bd9e4d94b5197c073ff3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.25,
              borderRadius: "inherit",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 className="font-serif font-bold text-white mb-2 text-2xl">
              Table of Contents
            </h3>
            <div className="w-14 h-[2px] bg-[#d6b25e] mb-4" />

            <div className="flex flex-col gap-1 text-sm">
              <a href="#acceptance" onClick={() => setActive("acceptance")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "acceptance" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Acceptance of Terms</a>
              <a href="#use-of-services" onClick={() => setActive("use-of-services")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "use-of-services" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Use of Services</a>
              <a href="#responsibilities" onClick={() => setActive("responsibilities")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "responsibilities" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>User Responsibilities</a>
              <a href="#intellectual-property" onClick={() => setActive("intellectual-property")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "intellectual-property" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Intellectual Property</a>
              <a href="#liability" onClick={() => setActive("liability")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "liability" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Limitation of Liability</a>
              <a href="#termination" onClick={() => setActive("termination")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "termination" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Termination</a>
              <a href="#law" onClick={() => setActive("law")} className="block px-3 py-2 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "law" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Governing Law</a>
            </div>
          </div>
        </motion.aside>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-2 sm:px-4 py-2 leading-relaxed"
          style={{ color: "#6b4b3e" }}
        >
          <h2 id="acceptance" className="font-serif text-2xl sm:text-3xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b2d1f" }}>
            Acceptance of Terms
          </h2>
          {/* <GoldenDivider /> */}
          <p className="mb-10 text-sm sm:text-base">
            By accessing or using Curely's website, applications, or services, you agree to be bound by these Terms & Conditions. If you do not agree, you must discontinue use immediately.
          </p>
           
           <GoldenDivider />
          <h3 id="use-of-services" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Use of Services
          </h3>
          
          <ul className="list-disc pl-5 sm:pl-6 mb-10 text-sm sm:text-base space-y-1">
            <li>Services are provided for personal and lawful use only</li>
            <li>You must not misuse, disrupt, or attempt unauthorized access</li>
            <li>Accuracy of information provided is your responsibility</li>
          </ul>
            
            <GoldenDivider />
          <h3 id="responsibilities" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            User Responsibilities
          </h3>
        
          <p className="mb-10 text-sm sm:text-base">
            Users agree to comply with all applicable laws and regulations while using the platform. Any activity that violates ethical, legal, or security standards is strictly prohibited.
          </p>
          
          <GoldenDivider />
          <h3 id="intellectual-property" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Intellectual Property
          </h3>
          
          <p className="mb-10 text-sm sm:text-base">
            All content, branding, logos, and materials available on this platform are the exclusive property of Curely and protected by intellectual property laws. Unauthorized reproduction is prohibited.
          </p>
          
          <GoldenDivider />
          <h3 id="liability" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Limitation of Liability
          </h3>
          
          <p className="mb-10 text-sm sm:text-base">
            Curely shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform, to the fullest extent permitted by law.
          </p>
           
           <GoldenDivider />
          <h3 id="termination" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Termination of Access
          </h3>
          
          <p className="mb-10 text-sm sm:text-base">
            We reserve the right to suspend or terminate access to our services without prior notice if these terms are violated.
          </p>
          
          <GoldenDivider />
          <h3 id="law" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Governing Law
          </h3>
        
          <p className="text-sm sm:text-base mb-8" style={{ color: "#7b5a4c" }}>
            These Terms & Conditions shall be governed and interpreted in accordance with the laws of the applicable jurisdiction. Continued use of the services signifies acceptance of these terms.
          </p>
        </motion.div>
      </div>
    </section>
  );
}