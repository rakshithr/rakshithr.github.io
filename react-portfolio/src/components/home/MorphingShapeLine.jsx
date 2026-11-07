import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../data/profile";

const Line = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  line-height: 1.5;
  color: ${(p) => p.theme.muted};
  max-width: 36rem;
  margin-top: 1.75rem;
`;

const Lead = styled.span`
  color: ${(p) => p.theme.text};
`;

const Word = styled(motion.span)`
  display: inline-block;
  color: ${(p) => p.theme.magenta};
  font-weight: 500;
  margin-left: 0.2em;
`;

const MorphingShapeLine = () => {
  const { shapeLead, shapeWords } = profile.liquid;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % shapeWords.length);
    }, 2200);
    return () => clearInterval(t);
  }, [shapeWords.length]);

  return (
    <Line>
      <Lead>{shapeLead} </Lead>
      <AnimatePresence exitBeforeEnter>
        <Word
          key={shapeWords[index]}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.45 }}
        >
          {shapeWords[index]}
        </Word>
      </AnimatePresence>
    </Line>
  );
};

export default MorphingShapeLine;
