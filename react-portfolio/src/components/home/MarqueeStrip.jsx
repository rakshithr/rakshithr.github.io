import React from "react";
import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Track = styled.div`
  overflow: hidden;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  mask-image: linear-gradient(
    90deg,
    transparent,
    black 8%,
    black 92%,
    transparent
  );
  border-top: 1px solid rgba(0, 229, 255, 0.12);
  border-bottom: 1px solid rgba(0, 229, 255, 0.12);
  padding: 0.85rem 0;
`;

const Row = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 45s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => p.theme.muted};
  padding: 0 2rem;
  white-space: nowrap;
  &::before {
    content: "◈";
    color: ${(p) => p.theme.accent};
    margin-right: 0.75rem;
  }
`;

const MarqueeStrip = ({ items }) => {
  const doubled = [...items, ...items];
  return (
    <Track>
      <Row>
        {doubled.map((item, i) => (
          <Item key={i}>{item}</Item>
        ))}
      </Row>
    </Track>
  );
};

export default MarqueeStrip;
