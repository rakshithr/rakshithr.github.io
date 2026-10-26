import React from "react";
import styled, { keyframes } from "styled-components";
import bgWorkspace from "../../assets/Images/BG.png";

const drift = keyframes`
  0% { transform: translate(0, 0) scale(1); opacity: 0.35; }
  50% { transform: translate(-2%, 1%) scale(1.05); opacity: 0.5; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
`;

const scan = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: radial-gradient(
      ellipse 120% 80% at 70% 20%,
      rgba(168, 85, 247, 0.12),
      transparent 50%
    ),
    radial-gradient(
      ellipse 90% 60% at 20% 80%,
      rgba(0, 229, 255, 0.1),
      transparent 45%
    ),
    linear-gradient(165deg, #04060c 0%, #0a1020 45%, #060a12 100%);
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(0, 229, 255, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent);
`;

const WorkspaceGlow = styled.div`
  position: absolute;
  right: -8%;
  bottom: -12%;
  width: min(55vw, 720px);
  height: min(45vh, 480px);
  background-image: url(${bgWorkspace});
  background-size: cover;
  background-position: center;
  filter: blur(28px) saturate(0.4) brightness(0.35);
  opacity: 0.45;
  animation: ${drift} 18s ease-in-out infinite;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
`;

const Scanline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(
    transparent,
    rgba(0, 229, 255, 0.03),
    transparent
  );
  animation: ${scan} 8s linear infinite;
  pointer-events: none;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.65);
  pointer-events: none;
`;

const FuturisticBackground = () => (
  <Root aria-hidden="true">
    <WorkspaceGlow />
    <Grid />
    <Scanline />
    <Vignette />
  </Root>
);

export default FuturisticBackground;
