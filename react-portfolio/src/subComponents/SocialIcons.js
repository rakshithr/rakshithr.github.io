import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Github, Twitter, LinkedIn } from "../components/AllSvgs";
import { DarkTheme } from "../components/Themes";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 2rem;
  z-index: 3;
  & > *:not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const Line = styled(motion.span)`
  width: 2px;
  height: 8rem;
  background-color: ${(props) =>
    props.color === "dark" ? DarkTheme.text : DarkTheme.body};
`;

const iconFill = (theme) =>
  theme === "dark" ? DarkTheme.text : DarkTheme.body;

const SocialLink = ({ href, delay, theme, children }) => (
  <motion.div
    initial={{ transform: "scale(0)" }}
    animate={{ scale: [0, 1, 1.5, 1] }}
    transition={{ type: "spring", duration: 1, delay }}
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
      <SocialLink href={linkedin} delay={1.1} theme={props.theme}>
        <LinkedIn width={25} height={25} fill={fill} />
      </SocialLink>
      <SocialLink href={github} delay={1.2} theme={props.theme}>
        <Github width={25} height={25} fill={fill} />
      </SocialLink>
      <SocialLink href={twitter} delay={1.4} theme={props.theme}>
        <Twitter width={25} height={25} fill={fill} />
      </SocialLink>
      <Line
        color={props.theme}
        initial={{ height: 0 }}
        animate={{ height: "8rem" }}
        transition={{ type: "spring", duration: 1, delay: 0.8 }}
      />
    </Icons>
  );
};

export default SocialIcons;
