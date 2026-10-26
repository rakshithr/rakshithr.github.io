import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import portraitSrc from "../../assets/Images/Profile.png";

const SIZE = 400;
const CELL = 3;
const ASSEMBLE_MS = 2800;

const spinCW = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const spinCCW = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const HeroRoot = styled.section`
  position: relative;
  width: min(420px, 92vw);
  margin: 0 auto;
  aspect-ratio: 1;
`;

const HudOuter = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(${(p) => p.theme.accentRgb}, 0.35);
  box-shadow: 0 0 48px rgba(${(p) => p.theme.accentRgb}, 0.18);
  pointer-events: none;
`;

const HudRing = styled.div`
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  border: 1px dashed rgba(${(p) => p.theme.accentRgb}, 0.4);
  animation: ${spinCW} 32s linear infinite;
`;

const HudRingInner = styled.div`
  position: absolute;
  inset: 9%;
  border-radius: 50%;
  border: 2px solid rgba(${(p) => p.theme.accent2Rgb}, 0.3);
  border-top-color: ${(p) => p.theme.accent};
  animation: ${spinCCW} 18s linear infinite;
`;

const Frame = styled.div`
  position: absolute;
  inset: 14%;
  border-radius: 50%;
  overflow: hidden;
  cursor: crosshair;
  border: 1px solid rgba(${(p) => p.theme.accentRgb}, 0.45);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
  transform: perspective(800px)
    rotateX(${(p) => p.$tiltY}deg)
    rotateY(${(p) => p.$tiltX}deg);
  transition: transform 0.15s ease-out;
`;

const Portrait = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: ${(p) => p.$show ? 1 : 0};
  transition: opacity 0.6s ease;
  z-index: 2;
`;

const CanvasLayer = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: ${(p) => (p.$show ? 3 : 1)};
  opacity: ${(p) => (p.$show ? 0 : 1)};
  transition: opacity 0.8s ease;
  pointer-events: none;
`;

const Glare = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 229, 255, 0.25),
    transparent 70%
  );
  transform: translate(${(p) => p.$x}px, ${(p) => p.$y}px);
  pointer-events: none;
  z-index: 4;
  mix-blend-mode: screen;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 0.2s;
`;

const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 5;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 229, 255, 0.04) 2px,
    rgba(0, 229, 255, 0.04) 3px
  );
`;

const Label = styled.p`
  position: absolute;
  bottom: -4%;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${(p) => p.theme.mono};
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  color: ${(p) => p.theme.muted};
  white-space: nowrap;
`;

function buildParticles(img) {
  const off = document.createElement("canvas");
  off.width = SIZE;
  off.height = SIZE;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(SIZE / iw, SIZE / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (SIZE - dw) / 2, (SIZE - dh) / 2, dw, dh);
  const { data, width, height } = ctx.getImageData(0, 0, SIZE, SIZE);
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const r = SIZE * 0.48;
  const particles = [];

  for (let y = 0; y < height; y += CELL) {
    for (let x = 0; x < width; x += CELL) {
      const dx = x + CELL / 2 - cx;
      const dy = y + CELL / 2 - cy;
      if (dx * dx + dy * dy > r * r) continue;
      const i = (y * width + x) * 4;
      if (data[i + 3] < 80) continue;
      const angle = Math.random() * Math.PI * 2;
      const dist = r * (0.5 + Math.random() * 0.5);
      particles.push({
        bx: x + CELL / 2,
        by: y + CELL / 2,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      });
    }
  }
  return particles;
}

const JarvisHero = ({ imageSrc = portraitSrc }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const [assembled, setAssembled] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0, active: false });

  const drawAssembly = useCallback((t) => {
    const canvas = canvasRef.current;
    const particles = particlesRef.current;
    if (!canvas || !particles || !startRef.current) return;

    const elapsed = t - startRef.current;
    const progress = Math.min(1, elapsed / ASSEMBLE_MS);
    const ease = 1 - Math.pow(1 - progress, 3);

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x = p.x + (p.bx - p.x) * (0.08 + ease * 0.12);
      p.y = p.y + (p.by - p.y) * (0.08 + ease * 0.12);
      const alpha = 0.4 + ease * 0.55;
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
      ctx.fillRect(p.x - CELL / 2, p.y - CELL / 2, CELL, CELL);
    }

    if (progress >= 1) {
      setAssembled(true);
      return;
    }
    rafRef.current = requestAnimationFrame(drawAssembly);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      particlesRef.current = buildParticles(img);
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(drawAssembly);
    };
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imageSrc, drawAssembly]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: -py * 10 });
    setGlare({
      x: e.clientX - rect.left - 60,
      y: e.clientY - rect.top - 60,
      active: true,
    });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, active: false }));
  };

  return (
    <HeroRoot aria-label="Portrait visualization">
      <HudOuter initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HudRing />
        <HudRingInner />
        <Frame
          $tiltX={tilt.x}
          $tiltY={tilt.y}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <Portrait src={imageSrc} alt="Rakshith R" $show={assembled} />
          <CanvasLayer ref={canvasRef} $show={assembled} width={SIZE} height={SIZE} />
          <Glare $x={glare.x} $y={glare.y} $active={glare.active && assembled} />
          <Scanlines />
        </Frame>
      </HudOuter>
      <Label>
        {assembled ? "IDENTITY LOCKED · HOVER TO SCAN" : "ASSEMBLING BIOMETRIC MESH…"}
      </Label>
    </HeroRoot>
  );
};

export default JarvisHero;
