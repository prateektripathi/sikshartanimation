import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const FullScreenRippleEffect = () => {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to full window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const createRipple = (x, y) => {
      const ripple = {
        x,
        y,
        radius: 0,
        maxRadius: 100 + Math.random() * 80,   // smaller max radius
        alpha: 0.55 + Math.random() * 0.15,    // lower opacity starting point
        lineWidth: 1 + Math.random() * 1,      // thinner lines
      };
      ripples.current.push(ripple);

      gsap.to(ripple, {
        radius: ripple.maxRadius,
        alpha: 0,
        lineWidth: 0,
        duration: 3,
        ease: "power1.out",
        onUpdate: draw,
        onComplete: () => {
          ripples.current = ripples.current.filter((r) => r !== ripple);
        },
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple) => {
        // Create radial gradient for soft glowing edges
        const gradient = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          ripple.radius * 0.8,
          ripple.x,
          ripple.y,
          ripple.radius
        );

        gradient.addColorStop(0, `rgba(0, 140, 255, 0)`);
        gradient.addColorStop(0.85, `rgba(0, 140, 255, 0)`);
        gradient.addColorStop(1, `rgba(0, 140, 255, ${ripple.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = ripple.lineWidth;

        // Stronger, softer glow with shadow
        ctx.shadowColor = `rgba(0, 140, 255, ${ripple.alpha * 0.4})`;
        ctx.shadowBlur = 25;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
      });
    };

    const handleMouseMove = (e) => {
      // Add ripples less frequently (every 100ms max)
      if (!handleMouseMove.lastTime || Date.now() - handleMouseMove.lastTime > 100) {
        createRipple(e.clientX, e.clientY);
        handleMouseMove.lastTime = Date.now();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial random ripples fewer and spaced out
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        createRipple(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }, i * 1500);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default FullScreenRippleEffect;
