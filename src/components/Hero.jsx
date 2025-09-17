import React, { useEffect } from "react";
import { useScrambleText } from "./useScrambleText";
import "./Hero.css";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ नया Navbar import

const Hero = () => {
  const [ctaText, scrambleCta] = useScrambleText("REGISTER TODAY");
  const [titleText, scrambleTitle] = useScrambleText("HACKATHON");

  useEffect(() => {
    scrambleTitle();
  }, []);

  return (
    <div className="hero-container">
      <Navbar /> {/* ✅ नया Navbar use किया */}

      {/* Hero Content */}
      <div className="hero-content">
        <h3>.</h3>
        <h1 onMouseEnter={scrambleTitle}>{titleText}</h1>
        <h2>Ideas meet execution.</h2>
        <NavLink to="/register">
          <button className="cta-button" onMouseEnter={scrambleCta}>
            {ctaText}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
