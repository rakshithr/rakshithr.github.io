import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import StoryNav from "./StoryNav";
import StoryRail from "./StoryRail";
import { renderChapter } from "./StoryChapter";
import CareerAgent from "../agent/CareerAgent";
import { journeyChapters } from "../../data/journey";

const Page = styled.div`
  height: 100vh;
  overflow: hidden;
  background: ${(p) => p.theme.body};
`;

const Scroller = styled.main`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-snap-type: none;
  }
`;

const AgentWrap = styled.div`
  scroll-snap-align: start;
  min-height: min(100vh, 900px);
  padding: 5rem clamp(1.25rem, 5vw, 4rem) 4rem;
  background: ${(p) => p.theme.body};
  max-width: 900px;
  margin: 0 auto;
`;

const AgentLabel = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  scroll-snap-align: end;
  padding: 2rem clamp(1.25rem, 5vw, 4rem) 3rem;
  border-top: 1px solid ${(p) => p.theme.glassBorder};
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.68rem;
  color: ${(p) => p.theme.muted};

  a {
    color: ${(p) => p.theme.text};
    text-decoration: none;
    margin-right: 1rem;
    &:hover {
      color: ${(p) => p.theme.accent};
    }
  }
`;

const beams = [
  "radial-gradient(ellipse 70% 55% at 85% 40%, rgba(250,248,245,0.07), transparent 55%)",
  "radial-gradient(ellipse 60% 50% at 15% 60%, rgba(232,196,168,0.06), transparent 50%)",
  "radial-gradient(ellipse 80% 45% at 90% 30%, rgba(196,181,253,0.05), transparent 55%)",
  "none",
  "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(232,196,168,0.08), transparent 60%)",
  "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(250,248,245,0.09), transparent 50%)",
  "none",
  "none",
  "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(232,196,168,0.05), transparent 50%)",
];

const ScrollStoryHome = () => {
  const theme = useTheme();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === "#career-agent") {
      document.getElementById("career-agent")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Page>
      <StoryNav />
      <StoryRail />
      <Scroller id="story-scroller">
        {journeyChapters.map((ch, i) =>
          renderChapter(
            ch,
            theme.sectionTints?.[i] || theme.body,
            beams[i] || "none",
            i
          )
        )}
        <AgentWrap id="chapter-agent">
          <AgentLabel>Career agent · ask anything on this journey</AgentLabel>
          <CareerAgent />
        </AgentWrap>
        <Footer>
          <div>
            <Link to="/experience">Detailed résumé</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
          </div>
          <span>Full-stack → AI lead · Bengaluru</span>
        </Footer>
      </Scroller>
    </Page>
  );
};

export default ScrollStoryHome;
