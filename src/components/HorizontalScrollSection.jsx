import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./HorizontalScrollSection.css";
import SplashCanvas from "./SplashCanvas";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    // Calculate width needed for horizontal scroll
    const totalScrollWidth = inner.scrollWidth;
    const viewportWidth = window.innerWidth;

    // GSAP horizontal scroll animation
    const tween = gsap.to(inner, {
      x: () => `-${totalScrollWidth - viewportWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: outer,
        start: "top top",
        end: () => `+=${totalScrollWidth}`, // length of scroll equals the width to scroll horizontally
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // If you use a custom scroller container (e.g SmoothScroll), add:
        // scroller: ".smooth-scroll-container-class",
      },
    });

    // Cleanup on unmount
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={outerRef} className="horizontal-outer">
      <div className="horizontal-inner" ref={innerRef}>
        {/* Your canvas or main content */}
        <SplashCanvas />
        {/* Panels */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="scroll-panel">
            <h2>Tech Vibe Panel {i + 1}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
