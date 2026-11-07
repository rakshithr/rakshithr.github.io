import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import JarvisHero from "../futuristic/JarvisHero";
import KineticHeadline from "./KineticHeadline";
import ProfileVoice from "./ProfileVoice";
import { profile } from "../../data/profile";

const Stage = styled.section`
  position: relative;
  min-height: min(92vh, 860px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
    text-align: center;
  }
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
  @media (max-width: 900px) {
    order: 2;
  }
`;

const PortraitCol = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    order: 1;
  }
`;

const Eyebrow = styled(motion.p)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  margin-bottom: 1rem;
`;

const Sub = styled(motion.p)`
  font-size: 1.05rem;
  line-height: 1.65;
  color: ${(p) => p.theme.muted};
  max-width: 32rem;
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const ScrollCue = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: ${(p) => p.theme.muted};
  @media (max-width: 900px) {
    position: relative;
    margin-top: 2rem;
    text-align: center;
    width: 100%;
  }
`;

const Orb = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 229, 255, 0.12),
    transparent 70%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
  right: 5%;
  top: 20%;
`;

const CinematicHero = () => {
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();
  const portraitY = useTransform(scrollY, [0, 400], [0, 60]);
  const copyY = useTransform(scrollY, [0, 400], [0, -30]);
  const copyOpacity = useTransform(scrollY, [0, 280], [1, 0.35]);

  return (
    <Stage ref={ref}>
      <Orb
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Copy style={{ y: copyY, opacity: copyOpacity }}>
        <Eyebrow
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile.location} · motion · agents
        </Eyebrow>
        <KineticHeadline text={profile.headline} />
        <Sub
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {profile.tagline}
        </Sub>
        <ProfileVoice />
      </Copy>
      <PortraitCol style={{ y: portraitY }}>
        <JarvisHero />
      </PortraitCol>
      <ScrollCue
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.5 }}
      >
        SCROLL — EXPERIENCE THE STACK
      </ScrollCue>
    </Stage>
  );
};

export default CinematicHero;
