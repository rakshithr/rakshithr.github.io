import React from "react";
import styled, { keyframes } from "styled-components";

const scrollL = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollR = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const Wrap = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const Track = styled.div`
  overflow: hidden;
  border-top: 1px solid rgba(244, 114, 182, 0.15);
  border-bottom: 1px solid rgba(244, 114, 182, 0.08);
  padding: 0.7rem 0;
  mask-image: linear-gradient(
    90deg,
    transparent,
    black 6%,
    black 94%,
    transparent
  );
`;

const Row = styled.div`
  display: flex;
  width: max-content;
  animation: ${(p) => (p.$reverse ? scrollR : scrollL)} ${(p) => p.$dur}s linear
    infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: clamp(0.65rem, 1.5vw, 0.75rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${(p) => (p.$dim ? p.theme.muted : p.theme.text)};
  padding: 0 1.75rem;
  white-space: nowrap;
`;

const DualMarquee = ({ rows = [] }) => {
  const [a, b] = rows;
  if (!a?.length) return null;

  const rowA = [...a, ...a];
  const rowB = b?.length ? [...b, ...b] : null;

  return (
    <Wrap aria-hidden>
      <Track>
        <Row $dur={38}>
          {rowA.map((item, i) => (
            <Item key={i}>{item}</Item>
          ))}
        </Row>
      </Track>
      {rowB && (
        <Track>
          <Row $reverse $dur={42}>
            {rowB.map((item, i) => (
              <Item key={i} $dim>
                {item}
              </Item>
            ))}
          </Row>
        </Track>
      )}
    </Wrap>
  );
};

export default DualMarquee;
