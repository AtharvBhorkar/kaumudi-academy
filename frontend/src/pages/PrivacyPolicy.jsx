import { useState } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import home5 from "../assets/home/home5.webp";

export default function PrivacyPolicy() {
  const [active, setActive] = useState("introduction");

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        title="Privacy Policy | Kaumudi Sanskrit Academy by Graphura India"
        description="Read how Kaumudi Sanskrit Academy, a venture of Graphura India Private Limited, collects, uses, and protects your information."
        canonicalPath="/privacy"
        og={{ type: "website" }}
        keywords={["Privacy Policy", "Kaumudi Academy Privacy", "Graphura India Private Limited data protection", "Sanskrit Academy terms"]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            description: "Read how Kaumudi Sanskrit Academy collects, uses, and protects your information.",
            url: (typeof window !== "undefined" ? window.location.origin : "") + "/privacy",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: (typeof window !== "undefined" ? window.location.origin : "") + "/" },
              { "@type": "ListItem", position: 2, name: "Privacy Policy", item: (typeof window !== "undefined" ? window.location.origin : "") + "/privacy" },
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
            style={{ backgroundImage: "url(" + home5 + ")" }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(90,54,38,0.68)" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold drop-shadow-lg mb-4">
              Privacy Policy
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
              How We Collect, Use, and Protect Your Information
            </p>
          </div>
        </motion.div>
      </div>

      {/* MOBILE TOC PILLS — original */}
      <div className="lg:hidden mt-5 px-3 sm:px-5">
        <div className="flex sm:justify-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button onClick={() => scrollTo("introduction")} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap" style={active === "introduction" ? { backgroundColor: "#5a3626", color: "#fff", borderColor: "#5a3626" } : { backgroundColor: "rgba(255,255,255,0.75)", color: "#5a3626", borderColor: "#c9a87c" }}>Introduction</button>
          <button onClick={() => scrollTo("data-collection")} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap" style={active === "data-collection" ? { backgroundColor: "#5a3626", color: "#fff", borderColor: "#5a3626" } : { backgroundColor: "rgba(255,255,255,0.75)", color: "#5a3626", borderColor: "#c9a87c" }}>Data Collection</button>
          <button onClick={() => scrollTo("use-of-data")} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap" style={active === "use-of-data" ? { backgroundColor: "#5a3626", color: "#fff", borderColor: "#5a3626" } : { backgroundColor: "rgba(255,255,255,0.75)", color: "#5a3626", borderColor: "#c9a87c" }}>Use of Data</button>
          <button onClick={() => scrollTo("children-info")} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap" style={active === "children-info" ? { backgroundColor: "#5a3626", color: "#fff", borderColor: "#5a3626" } : { backgroundColor: "rgba(255,255,255,0.75)", color: "#5a3626", borderColor: "#c9a87c" }}>{"Children's Info"}</button>
          <button onClick={() => scrollTo("contact-info")} className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap" style={active === "contact-info" ? { backgroundColor: "#5a3626", color: "#fff", borderColor: "#5a3626" } : { backgroundColor: "rgba(255,255,255,0.75)", color: "#5a3626", borderColor: "#c9a87c" }}>Contact Info</button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="w-full px-4 sm:px-6 lg:pl-16 lg:pr-16 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6 lg:gap-20">

        {/* DESKTOP SIDEBAR — sticky fix */}
       <motion.aside
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="hidden lg:block rounded-2xl p-6 shadow-lg overflow-hidden"
  style={{
    backgroundColor: "#5a3626",
    position: "relative",
    top: "1rem",
    alignSelf: "start",
    height: "fit-content",
    minHeight: "350px",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: "url(https://i.pinimg.com/736x/a1/d1/a4/a1d1a4f0e226fe4bb35f97e51aca6eb6.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.3,
      borderRadius: "inherit",
    }}
  />
  <div style={{ position: "relative", zIndex: 1 }}>
    <h3 className="font-serif font-bold text-white mb-2 text-2xl">
      Table of Contents
    </h3>
    <div className="w-14 h-[2px] bg-[#d6b25e] mb-5" />
    <div className="flex flex-col gap-2 text-sm">
      <a href="#introduction" onClick={() => setActive("introduction")} className="block px-3 py-2.5 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "introduction" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Introduction</a>
      <a href="#data-collection" onClick={() => setActive("data-collection")} className="block px-3 py-2.5 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "data-collection" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Data Collection</a>
      <a href="#use-of-data" onClick={() => setActive("use-of-data")} className="block px-3 py-2.5 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "use-of-data" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Use of Data</a>
      <a href="#children-info" onClick={() => setActive("children-info")} className="block px-3 py-2.5 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "children-info" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>{"Children's Information"}</a>
      <a href="#contact-info" onClick={() => setActive("contact-info")} className="block px-3 py-2.5 rounded-md border-l-4 transition-all duration-200 hover:bg-white/10 hover:translate-x-1" style={active === "contact-info" ? { borderColor: "#d6b25e", backgroundColor: "rgba(0,0,0,0.20)", color: "white" } : { borderColor: "transparent", color: "white" }}>Contact Information</a>
    </div>
  </div>
</motion.aside>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-2 sm:px-4 py-2 leading-relaxed"
          style={{ color: "#6b4b3e" }}
        >
          <h2 id="introduction" className="font-serif text-2xl sm:text-3xl font-bold mb-8 scroll-mt-32" style={{ color: "#7b2d1f" }}>
            Welcome to our privacy policy!
          </h2>
          {/* <GoldenDivider /> */}
          <p className="mb-6 text-sm sm:text-base">
            At Curely, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you interact with our website or services.
          </p>
          <p className="mb-10 text-sm sm:text-base">
            We are committed to maintaining transparency about how data is handled and ensuring that your trust in our platform is respected at every step.
          </p>
           <GoldenDivider />
          <h3 id="data-collection" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Data Collection
          </h3>
          
          <p className="mb-4 text-sm sm:text-base">
            We collect information to provide better services, improve user experience, and maintain platform security.
          </p>
          <p className="font-semibold mb-2 text-sm sm:text-base">1. Information You Provide Directly</p>
          <ul className="list-disc pl-5 sm:pl-6 mb-6 text-sm sm:text-base space-y-1">
            <li>Name, email, and contact information</li>
            <li>Feedback and form submissions</li>
            <li>Preferences shared during communication</li>
            <li>Account-related information if applicable</li>
          </ul>
          <p className="font-semibold mb-2 text-sm sm:text-base">2. Automatically Collected Information</p>
          <ul className="list-disc pl-5 sm:pl-6 mb-6 text-sm sm:text-base space-y-1">
            <li>IP address, browser type, and device information</li>
            <li>Pages visited, time spent, and interaction data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          <p className="font-semibold mb-2 text-sm sm:text-base">3. Third-Party Sources</p>
          <ul className="list-disc pl-5 sm:pl-6 mb-10 text-sm sm:text-base space-y-1">
            <li>Social media interactions</li>
            <li>Analytics and advertising partners</li>
            <li>External service providers</li>
          </ul>


          <GoldenDivider />
          <h3 id="use-of-data" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Use of Data
          </h3>
          {/* <GoldenDivider /> */}
          <p className="mb-4 text-sm sm:text-base">
            Information collected is used strictly to operate, improve, and secure our services.
          </p>
          <ul className="list-disc pl-5 sm:pl-6 mb-10 text-sm sm:text-base space-y-1">
            <li>Providing and personalizing services</li>
            <li>Responding to queries and support requests</li>
            <li>Improving website performance and usability</li>
            <li>Legal and regulatory compliance</li>
          </ul>
            
             <GoldenDivider />
          <h3 id="children-info" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            {"Children's Information"}
          </h3>
          
          <p className="mb-6 text-sm sm:text-base">
            Our services are not directed toward children under the age of 13. We do not knowingly collect personal information from minors.
          </p>
          <p className="mb-10 text-sm sm:text-base">
            If we become aware that a child has provided personal information, we will take immediate steps to remove such data from our records.
          </p>
          
           <GoldenDivider />
          <h3 id="contact-info" className="font-serif text-xl sm:text-2xl font-bold mb-3 scroll-mt-32" style={{ color: "#7b1f14" }}>
            Contact Information
          </h3>
          
          <div className="pt-2">
            <p className="text-sm sm:text-base mb-3" style={{ color: "#7b5a4c" }}>
              If you have any questions, concerns, or requests related to this Privacy Policy, please contact our support team.
            </p>
            <p className="text-sm sm:text-base mb-6" style={{ color: "#7b5a4c" }}>
              Continued use of our services indicates acceptance of this Privacy Policy and any future updates made to it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}