import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { profile } from "../../data/profile";

const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(6, 10, 18, 0.75);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 229, 255, 0.12);
`;

const Brand = styled(NavLink)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${(p) => p.theme.text};
  text-decoration: none;
  span {
    color: ${(p) => p.theme.accent};
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  align-items: center;
  @media (max-width: 640px) {
    font-size: 0.8rem;
    gap: 0.5rem;
  }
`;

const Link = styled(NavLink)`
  font-family: ${(p) => p.theme.fontFamily};
  font-size: 0.8rem;
  color: ${(p) => p.theme.muted};
  text-decoration: none;
  transition: color 0.2s;
  &.active,
  &:hover {
    color: ${(p) => p.theme.accent};
  }
`;

const Cta = styled.a`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid ${(p) => p.theme.glassBorder};
  border-radius: 6px;
  color: ${(p) => p.theme.accent};
  text-decoration: none;
  &:hover {
    background: rgba(0, 229, 255, 0.1);
  }
`;

const TopNav = () => (
  <Bar>
    <Brand to="/">
      {profile.name.split(" ")[0]}<span>.</span>R
    </Brand>
    <Links>
      <Link to="/" exact>Home</Link>
      <Link to="/experience">Work</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/about">About</Link>
      <Link to="/skills">Systems</Link>
      <Cta href={`mailto:${profile.email}`}>Contact</Cta>
    </Links>
  </Bar>
);

export default TopNav;
