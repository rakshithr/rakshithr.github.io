import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import JarvisHero from "../futuristic/JarvisHero";
import MorphingShapeLine from "./MorphingShapeLine";
import { profile } from "../../data/profile";

const breathe = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
`;

const Hero = styled.section`
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: calc(100vh - 5rem);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1rem, 4vw, 3rem);
  align-items: center;
  padding: 2rem clamp(1.25rem, 5vw, 4rem) 3rem;
  overflow: hidden;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 1rem;
  }
`;

const Tunnel = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
      ellipse 55% 70% at 72% 45%,
      rgba(248, 250, 252, 0.14),
      transparent 55%
    ),
    radial-gradient(
      ellipse 30% 50% at 75% 50%,
      rgba(244, 114, 182, 0.35),
      transparent 70%
    ),
    linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.06) 48%,
      rgba(244, 114, 182, 0.12) 52%,
      transparent 60%
    );
  &::after {
    content: "";
    position: absolute;
    right: 18%;
    top: 15%;
    width: min(42vw, 520px);
    height: min(70vh, 640px);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(244, 114, 182, 0.08) 40%,
      transparent
    );
    filter: blur(1px);
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 72%);
    animation: ${breathe} 7s ease-in-out infinite;
  }
`;

const Meta = styled.div`
  position: absolute;
  top: 0.5rem;
  left: clamp(1.25rem, 5vw, 4rem);
  right: clamp(1.25rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.muted};
  z-index: 3;
`;

const Copy = styled(motion.div)`
  position: relative;
  z-index: 2;
  @media (max-width: 960px) {
    text-align: left;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
  span {
    display: block;
  }
  .line2 {
    background: linear-gradient(
      90deg,
      ${(p) => p.theme.beam},
      ${(p) => p.theme.magenta}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Duo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: clamp(1.1rem, 2.5vw, 1.45rem);
  line-height: 1.35;
  color: ${(p) => p.theme.text};
  strong {
    font-weight: 600;
  }
  em {
    font-style: normal;
    color: ${(p) => p.theme.muted};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 2rem;
`;

const BtnPrimary = styled(Link)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  text-decoration: none;
  color: #060a12;
  background: ${(p) => p.theme.beam};
  border: 1px solid transparent;
  transition: box-shadow 0.25s, transform 0.2s;
  &:hover {
    box-shadow: 0 0 32px rgba(244, 114, 182, 0.45);
    transform: translateY(-1px);
  }
`;

const BtnGhost = styled(Link)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  text-decoration: none;
  color: ${(p) => p.theme.text};
  border: 1px solid rgba(244, 114, 182, 0.35);
  background: rgba(6, 10, 18, 0.4);
  backdrop-filter: blur(8px);
  &:hover {
    border-color: ${(p) => p.theme.magenta};
  }
`;

const Visual = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FigCap = styled.div`
  width: min(420px, 92vw);
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(p) => p.theme.muted};
  span.accent {
    color: ${(p) => p.theme.magenta};
  }
`;

const Counter = styled.span`
  font-variant-numeric: tabular-nums;
`;

function useLocalTime(tzLabel) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
          }).format(new Date())
        );
      } catch {
        setTime(
          new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return { time, label: tzLabel };
}

const DozFxHero = () => {
  const { title, sub, est } = profile.liquid;
  const { time } = useLocalTime("BLR");

  return (
    <Hero>
      <Tunnel aria-hidden />
      <Meta>
        <span>
          Local time in Bengaluru: BLR {time}
        </span>
        <span>
          Scroll · Est. {est} · {profile.location.split(",")[0]}
        </span>
      </Meta>
      <Copy
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Title>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            {title[0]}
          </motion.span>
          <motion.span
            className="line2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
          >
            {title[1]}
          </motion.span>
        </Title>
        <Duo>
          <span>
            <strong>{sub[0]}</strong>
          </span>
          <span>
            <em>{sub[1]}</em>
          </span>
        </Duo>
        <MorphingShapeLine />
        <Actions>
          <BtnPrimary to="/#career-agent">Ask the agent</BtnPrimary>
          <BtnGhost to="/experience">See the work</BtnGhost>
        </Actions>
      </Copy>
      <Visual>
        <JarvisHero />
        <FigCap>
          <span>
            Fig. 01 · <span className="accent">Portrait study</span>
          </span>
          <Counter>000</Counter>
        </FigCap>
      </Visual>
    </Hero>
  );
};

export default DozFxHero;
