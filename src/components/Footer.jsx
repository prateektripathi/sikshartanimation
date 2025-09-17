import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import "./Footer.css"; // ✅ CSS import
import {NavLink} from "react-router-dom"
const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [hoveredLine, setHoveredLine] = useState(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const lines = [
    ["SHIKSHART "],
    ["HACKATHON IS A OPEN"],
    ["CULTURE & OPEN TO"],
    ["IDEAS AND SPONSORS"],
  ];

  return (
    <section ref={ref} className="footer-section">
      {/* Main Heading */}
      <div className="footer-heading-container">
        {lines.map((words, lineIndex) => (
          <div
            key={lineIndex}
            className={`footer-line ${
              lineIndex < 2 ? "align-left" : "align-right"
            }`}
            style={{
              WebkitTextStroke: hoveredLine === lineIndex ? "1px white" : "0",
            }}
            onMouseEnter={() => setHoveredLine(lineIndex)}
            onMouseLeave={() => setHoveredLine(null)}
          >
            {words.map((word, wordIndex) => {
              const isHovered = hoveredLine === lineIndex;
              return (
                <motion.span
                  key={wordIndex}
                  className={`footer-word ${
                    lineIndex === 1 ? "cyan-text" : "white-text"
                  }`}
                  variants={textVariants}
                  custom={lineIndex + wordIndex}
                  initial="hidden"
                  animate={controls}
                  style={{
                    color: isHovered ? "transparent" : undefined,
                    fontStyle: isHovered ? "italic" : "normal",
                    fontFamily: isHovered ? "serif" : "inherit",
                    letterSpacing: isHovered ? "4px" : "normal",
                    WebkitTextStroke: isHovered ? "1px white" : "0",
                    transition: `all 0.3s ease ${wordIndex * 0.04}s`,
                    cursor: isHovered ? "none" : "default",
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.a
        href="https://github.com/orgs/Shikshart/repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-cta"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >  
        <svg className="footer-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008.12 11c.59.11.8-.26.8-.58v-2.02c-3.3.72-4-1.42-4-1.42a3.15 3.15 0 00-1.32-1.74c-1.08-.73.08-.72.08-.72a2.5 2.5 0 011.84 1.24 2.53 2.53 0 003.47 1 2.5 2.5 0 01.75-1.59c-2.64-.3-5.42-1.32-5.42-5.89a4.6 4.6 0 011.23-3.2 4.25 4.25 0 01.12-3.16s1-.32 3.3 1.22a11.42 11.42 0 016 0C17.7 6.6 18.7 6.92 18.7 6.92a4.25 4.25 0 01.12 3.16 4.6 4.6 0 011.23 3.2c0 4.58-2.78 5.59-5.43 5.88a2.8 2.8 0 01.8 2.18v3.24c0 .32.21.7.8.58A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
        LET’S BUILD TOGETHER →
      </motion.a>

      {/* Footer Links */}
      <div className="footer-links">
        <NavLink to="/guidelines">GUIDLINES</NavLink>
        <NavLink to="/contact">CONTACTS</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <span>
          <a href="https://shikshart.com/">© SHIKSHART.COM</a>
        </span>
      </div>
    </section>
  );
};

export default Footer;
