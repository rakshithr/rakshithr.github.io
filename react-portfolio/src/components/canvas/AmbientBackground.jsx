import React, { useEffect, useRef } from "react";

/** Lightweight 2D particle field — React 17 / CRA safe (no R3F). */
const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let raf;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.2,
      dx: (Math.random() - 0.5) * 0.0002,
      dy: (Math.random() - 0.5) * 0.00015,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > 1) p.dx *= -1;
        if (p.y < 0 || p.y > 1) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242, 235, 227, 0.12)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-story-amber opacity-10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-story-cyan opacity-10 blur-[140px]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f2ebe3_1px,transparent_1px)] bg-[length:24px_24px]" />
    </div>
  );
};

export default AmbientBackground;
