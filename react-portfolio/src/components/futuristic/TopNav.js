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
  border-bottom: 1px solid rgba(242, 235, 227, 0.1);
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
    font-size: 0.75rem;
    gap: 0.5rem;
  }
`;

const Link = styled(NavLink)`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.muted};
  text-decoration: none;
  transition: color 0.2s;
  .num {
    color: ${(p) => p.theme.magenta};
    margin-right: 0.35rem;
    font-size: 0.65rem;
  }
  &.active,
  &:hover {
    color: ${(p) => p.theme.text};
  }
`;

const Cta = styled.a`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.45rem 0.9rem;
  border: 1px solid rgba(244, 114, 182, 0.35);
  border-radius: 999px;
  color: ${(p) => p.theme.text};
  text-decoration: none;
  &:hover {
    background: rgba(244, 114, 182, 0.12);
  }
`;

const nav = [
  { to: "/", label: "Home", end: true, n: "01" },
  { to: "/experience", label: "Work", n: "02" },
  { to: "/projects", label: "Projects", n: "03" },
  { to: "/about", label: "Studio", n: "04" },
  { to: "/skills", label: "Systems", n: "05" },
];

const TopNav = () => (
  <Bar>
    <Brand to="/">
      {profile.name.split(" ")[0]}<span>.</span>R
    </Brand>
    <Links>
      {nav.map((item) => (
        <Link key={item.to} to={item.to} exact={item.end}>
          <span className="num">{item.n}</span>
          {item.label}
        </Link>
      ))}
      <Cta href={`mailto:${profile.email}`}>Say hello</Cta>
    </Links>
  </Bar>
);

export default TopNav;
