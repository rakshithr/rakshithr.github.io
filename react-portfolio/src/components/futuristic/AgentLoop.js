import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { agentSteps } from "../../data/profile";

const Section = styled.section`
  margin-top: 4rem;
`;

const Title = styled.h2`
  display: block;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  margin-bottom: 1.25rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const StepBtn = styled.button`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${(p) => (p.$active ? p.theme.accent : p.theme.glassBorder)};
  background: ${(p) =>
    p.$active ? `rgba(${p.theme.accentRgb}, 0.15)` : p.theme.glass};
  color: ${(p) => (p.$active ? p.theme.accent : p.theme.muted)};
  box-shadow: ${(p) =>
    p.$active ? `0 0 20px rgba(${p.theme.accentRgb}, 0.25)` : "none"};
`;

const Panel = styled(motion.div)`
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: ${(p) => p.theme.glass};
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${(p) => p.theme.text};
`;

const Code = styled.span`
  display: block;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  color: ${(p) => p.theme.accent2};
  margin-bottom: 0.5rem;
`;

const AgentLoop = () => {
  const [active, setActive] = useState(agentSteps[0].id);
  const step = agentSteps.find((s) => s.id === active) || agentSteps[0];

  return (
    <Section id="agent-loop">
      <Title>Agent control plane</Title>
      <Row>
        {agentSteps.map((s, i) => (
          <StepBtn
            key={s.id}
            type="button"
            $active={active === s.id}
            onClick={() => setActive(s.id)}
          >
            {String(i + 1).padStart(2, "0")} · {s.label}
          </StepBtn>
        ))}
      </Row>
      <AnimatePresence mode="wait">
        <Panel
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Code>run_step → {step.code}</Code>
          {step.detail}
        </Panel>
      </AnimatePresence>
    </Section>
  );
};

export default AgentLoop;
