import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import profileImg from "../../assets/Images/Profile.png";

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrapper = styled(motion.div)`
  position: relative;
  width: min(340px, 78vw);
  aspect-ratio: 1;
  margin: 0 auto;
`;

const Ring = styled.div`
  position: absolute;
  inset: -6%;
  border-radius: 50%;
  border: 1px dashed rgba(0, 229, 255, 0.35);
  animation: ${spin} 24s linear infinite;
  &::before {
    content: "";
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: 5%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 229, 255, 0.25),
    transparent 65%
  );
  animation: ${pulse} 4s ease-in-out infinite;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 229, 255, 0.45);
  box-shadow: 0 0 40px rgba(0, 229, 255, 0.2),
    0 0 80px rgba(168, 85, 247, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.5);
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 229, 255, 0.04) 2px,
      rgba(0, 229, 255, 0.04) 4px
    );
    pointer-events: none;
    z-index: 2;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: contrast(1.08) brightness(1.05);
`;

const Badge = styled.span`
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  background: rgba(6, 10, 18, 0.85);
  border: 1px solid ${(p) => p.theme.glassBorder};
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  white-space: nowrap;
`;

const ProfileHologram = () => (
  <Wrapper
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <Ring />
    <Glow />
    <Frame>
      <Img src={profileImg} alt="Rakshith R — stylized portrait" />
    </Frame>
    <Badge>signal · online</Badge>
  </Wrapper>
);

export default ProfileHologram;
