import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../data/profile";

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Panel = styled.div`
  margin-top: 1.25rem;
  min-height: 3.5rem;
  padding: 0.75rem 1rem;
  border-left: 2px solid ${(p) => p.theme.accent};
  background: linear-gradient(
    90deg,
    rgba(${(p) => p.theme.accentRgb}, 0.08),
    transparent
  );
  font-family: ${(p) => p.theme.mono};
  font-size: clamp(0.65rem, 1.8vw, 0.78rem);
  line-height: 1.5;
  color: ${(p) => p.theme.muted};
`;

const Label = styled.span`
  display: block;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: ${(p) => p.theme.accent};
  margin-bottom: 0.35rem;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.45em;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: ${(p) => p.theme.accent};
  animation: ${blink} 1s step-end infinite;
`;

const ProfileVoice = () => {
  const lines = useMemo(
    () => profile.voiceLines || [profile.tagline],
    []
  );
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const line = lines[index];
    let i = 0;
    setDisplay("");
    setTyping(true);

    const typeInterval = setInterval(() => {
      i += 1;
      setDisplay(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(typeInterval);
        setTyping(false);
      }
    }, 22);

    return () => clearInterval(typeInterval);
  }, [index, lines]);

  useEffect(() => {
    if (typing) return undefined;
    const t = setTimeout(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 4200);
    return () => clearTimeout(t);
  }, [typing, lines.length]);

  return (
    <Panel aria-live="polite">
      <Label>VOICE // {profile.name.toUpperCase()}</Label>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {display}
          <Cursor aria-hidden />
        </motion.span>
      </AnimatePresence>
    </Panel>
  );
};

export default ProfileVoice;
