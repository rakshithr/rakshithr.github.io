import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.h1)`
  display: block;
  font-size: clamp(2.1rem, 5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.12;
  margin-bottom: 1rem;
`;

const Line = styled.span`
  display: block;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.28em;
  background: linear-gradient(120deg, #e8f4ff 0%, #00e5ff 45%, #c4b5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const word = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const KineticHeadline = ({ text }) => {
  const lines = text.split("|").map((s) => s.trim());

  return (
    <Wrap variants={container} initial="hidden" animate="show">
      {lines.map((line, li) => (
        <Line key={li}>
          {line.split(/\s+/).map((w, wi) => (
            <Word key={`${li}-${wi}`} variants={word}>
              {w}
            </Word>
          ))}
        </Line>
      ))}
    </Wrap>
  );
};

export default KineticHeadline;
