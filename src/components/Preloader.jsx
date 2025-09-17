// src/components/Preloader.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./preloader.css";

const Preloader = ({ setIsLoaded }) => {
  const counterRef = useRef(null);
  const preloaderRef = useRef(null);
  const loadingBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count++;
      setProgress(count);

      // Animate loading bar width
      if (loadingBarRef.current) {
        loadingBarRef.current.style.width = `${count}%`;
      }

      // Animate shaking effect on the counter
      gsap.fromTo(
        counterRef.current,
        { x: -3 },
        {
          x: 3,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
        }
      );

      if (count === 100) {
        clearInterval(interval);

        // Animate out
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            setIsLoaded(true);
          },
        });
      }
    }, 20); // ~2 seconds
  }, [setIsLoaded]);

  return (
    <div className="preloader-wrapper" ref={preloaderRef}>
      <div className="preloader-content">
        <div className="preloader-counter" ref={counterRef}>
          {progress}%
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar" ref={loadingBarRef}></div>
        </div>
        <div className="preloader-text">Loading your web experience...</div>
      </div>
    </div>
  );
};

export default Preloader;
