import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { profile } from "../../data/profile";

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem clamp(1rem, 4vw, 2.5rem);
  background: linear-gradient(
    180deg,
    rgba(10, 9, 8, 0.92),
    rgba(10, 9, 8, 0.4)
  );
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
`;

const Brand = styled(Link)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.8rem;
  color: ${(p) => p.theme.text};
  text-decoration: none;
  letter-spacing: 0.04em;
`;

const Meta = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => p.theme.muted};
  @media (max-width: 640px) {
    display: none;
  }
`;

const Mail = styled.a`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.68rem;
  color: ${(p) => p.theme.accent};
  text-decoration: none;
  border-bottom: 1px solid rgba(232, 196, 168, 0.35);
  &:hover {
    color: ${(p) => p.theme.beam};
  }
`;

const StoryNav = () => (
  <Bar>
    <Brand to="/">{profile.name}</Brand>
    <Meta>Scroll story · full-stack → AI lead</Meta>
    <Mail href={`mailto:${profile.email}`}>Email</Mail>
  </Bar>
);

export default StoryNav;
