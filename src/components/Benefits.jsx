import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Benefits.css"; // <-- updated CSS file name

const AnimatedBenefits = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  const splitTextToSpans = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} style={{ display: "inline-block", opacity: 0 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const headingSpans = headingRef.current.querySelectorAll("span");
    const paraSpans = paraRef.current.querySelectorAll("span");

    gsap.fromTo(
      headingSpans,
      {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        opacity: 0,
        scale: 0.1,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "expo.out",
        duration: 1.5,
        stagger: 0.05,
      }
    );

    gsap.fromTo(
      paraSpans,
      {
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-200, 200),
        opacity: 0,
        scale: 0.1,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "expo.out",
        duration: 1.2,
        stagger: 0.08,
        delay: 1,
      }
    );
  }, []);

  return (
    <section className="animated-benefits-section" ref={sectionRef}>
      <h2 ref={headingRef}>
        {splitTextToSpans(" Benefits of Joining")}
      </h2>
      <p ref={paraRef}>
        {splitTextToSpans("Tech exposure, prizes, community & more!")}
      </p>
    </section>
  );
};

export default AnimatedBenefits;
