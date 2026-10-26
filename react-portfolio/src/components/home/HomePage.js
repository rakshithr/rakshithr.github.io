import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FuturisticShell from "../futuristic/FuturisticShell";
import JarvisHero from "../futuristic/JarvisHero";
import AgentLoop from "../futuristic/AgentLoop";
import CareerAgent from "../agent/CareerAgent";
import { profile } from "../../data/profile";

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  min-height: min(70vh, 720px);
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    min-height: auto;
  }
`;

const Eyebrow = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  margin-bottom: 1rem;
`;

const Headline = styled.h1`
  display: block;
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #e8f4ff 0%, #00e5ff 50%, #c4b5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Sub = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${(p) => p.theme.muted};
  max-width: 32rem;
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const Thesis = styled.blockquote`
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid ${(p) => p.theme.accent2};
  font-family: ${(p) => p.theme.mono};
  font-size: 0.8rem;
  line-height: 1.6;
  color: ${(p) => p.theme.muted};
  font-style: italic;
  max-width: 32rem;
  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: ${(p) => p.theme.glass};
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.1rem 1.25rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${(p) => p.theme.text};
  &::before {
    content: "◆";
    color: ${(p) => p.theme.accent};
    margin-right: 0.5rem;
    font-size: 0.6rem;
  }
`;

const Explore = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
`;

const ExploreLink = styled(Link)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: ${(p) => p.theme.text};
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: rgba(0, 229, 255, 0.06);
  transition: all 0.2s;
  &:hover {
    border-color: ${(p) => p.theme.accent};
    box-shadow: 0 0 24px rgba(0, 229, 255, 0.15);
  }
`;

const HomePage = () => {
  useEffect(() => {
    if (window.location.hash === "#career-agent") {
      const el = document.getElementById("career-agent");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
  <FuturisticShell wide>
    <Hero>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Eyebrow>{profile.location} · agent architect</Eyebrow>
        <Headline>{profile.headline}</Headline>
        <Sub>{profile.tagline}</Sub>
        <Thesis>{profile.thesis}</Thesis>
        <Explore>
          <ExploreLink to="/experience">View experience →</ExploreLink>
          <ExploreLink to="/about">Full story →</ExploreLink>
          <ExploreLink to="/#career-agent">Ask the agent →</ExploreLink>
        </Explore>
      </motion.div>
      <JarvisHero />
    </Hero>

    <AgentLoop />

    <CareerAgent />

    <HighlightGrid>
      {profile.highlights.map((h, i) => (
        <Card
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          {h}
        </Card>
      ))}
    </HighlightGrid>
  </FuturisticShell>
  );
};

export default HomePage;
