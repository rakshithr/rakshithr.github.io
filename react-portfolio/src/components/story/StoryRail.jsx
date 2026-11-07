import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { journeyChapters } from "../../data/journey";

const Rail = styled.nav`
  position: fixed;
  right: clamp(0.75rem, 2vw, 1.5rem);
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem 0;
  text-align: right;
  opacity: ${(p) => (p.$active ? 1 : 0.4)};
  transition: opacity 0.25s;

  &::after {
    content: "";
    width: ${(p) => (p.$active ? 24 : 8)}px;
    height: 2px;
    background: ${(p) => (p.$active ? p.theme.accent : p.theme.muted)};
    transition: width 0.25s, background 0.25s;
  }

  span {
    font-family: ${(p) => p.theme.mono};
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: ${(p) => p.theme.muted};
  }
`;

const StoryRail = () => {
  const [active, setActive] = useState(journeyChapters[0]?.id);

  useEffect(() => {
    const nodes = journeyChapters
      .map((c) => document.getElementById(`chapter-${c.id}`))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id.replace("chapter-", ""));
        }
      },
      { root: null, threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -35% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const jump = (id) => {
    document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Rail aria-label="Story chapters">
      {journeyChapters.map((ch) => (
        <Dot
          key={ch.id}
          type="button"
          $active={active === ch.id}
          onClick={() => jump(ch.id)}
          title={ch.title || ch.title?.[0]}
        >
          <span>{ch.index}</span>
        </Dot>
      ))}
    </Rail>
  );
};

export default StoryRail;
