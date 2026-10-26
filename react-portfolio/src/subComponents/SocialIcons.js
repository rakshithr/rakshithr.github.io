import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Github, Twitter, LinkedIn } from "../components/AllSvgs";
import { DarkTheme, futuristicTheme } from "../components/Themes";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 1.25rem;
  z-index: 40;
  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
  @media (max-width: 640px) {
    left: 0.5rem;
    transform: scale(0.9);
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 5rem;
  background: linear-gradient(
    transparent,
    ${(p) => p.$color},
    transparent
  );
`;

const iconFill = (theme) => {
  if (theme === "futuristic") return futuristicTheme.accent;
  if (theme === "dark") return DarkTheme.text;
  return DarkTheme.body;
};

const lineColor = (theme) => {
  if (theme === "futuristic") return futuristicTheme.accent;
  if (theme === "dark") return DarkTheme.text;
  return DarkTheme.body;
};

const SocialLink = ({ href, delay, theme, children }) => (
  <motion.div
    initial={{ transform: "scale(0)" }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", duration: 0.6, delay }}
  >
    <NavLink
      style={{ color: "inherit" }}
      target="_blank"
      rel="noopener noreferrer"
      to={{ pathname: href }}
    >
      {children}
    </NavLink>
  </motion.div>
);

const SocialIcons = (props) => {
  const fill = iconFill(props.theme);
  const { linkedin, github, twitter } = profile.links;

  return (
    <Icons>
      <SocialLink href={linkedin} delay={0.2} theme={props.theme}>
        <LinkedIn width={22} height={22} fill={fill} />
      </SocialLink>
      <SocialLink href={github} delay={0.3} theme={props.theme}>
        <Github width={22} height={22} fill={fill} />
      </SocialLink>
      <SocialLink href={twitter} delay={0.4} theme={props.theme}>
        <Twitter width={22} height={22} fill={fill} />
      </SocialLink>
      <Line
        $color={lineColor(props.theme)}
        initial={{ height: 0 }}
        animate={{ height: "5rem" }}
        transition={{ type: "spring", duration: 0.8, delay: 0.1 }}
      />
    </Icons>
  );
};

export default SocialIcons;
