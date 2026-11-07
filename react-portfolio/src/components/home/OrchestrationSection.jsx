import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { agentSteps } from "../../data/profile";

const Section = styled.section`
  margin: 4rem 0;
  padding: 2.5rem 0;
  border-top: 1px solid rgba(244, 114, 182, 0.12);
  border-bottom: 1px solid rgba(244, 114, 182, 0.12);
`;

const Eyebrow = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${(p) => p.theme.magenta};
  margin-bottom: 1rem;
`;

const H2 = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  font-weight: 600;
  margin-bottom: 2.5rem;
  span {
    display: block;
    color: ${(p) => p.theme.muted};
    font-weight: 400;
  }
`;

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Step = styled(motion.li)`
  padding: 1.25rem 1.35rem;
  border: 1px solid ${(p) => p.theme.glassBorder};
  border-radius: 12px;
  background: rgba(12, 20, 36, 0.5);
`;

const Num = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  color: ${(p) => p.theme.magenta};
  letter-spacing: 0.15em;
`;

const StepTitle = styled.h3`
  font-size: 1.05rem;
  margin: 0.5rem 0 0.35rem;
  font-weight: 600;
`;

const StepBody = styled.p`
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${(p) => p.theme.muted};
  margin: 0;
`;

const OrchestrationSection = () => (
  <Section>
    <Eyebrow>How the layer works</Eyebrow>
    <H2>
      Taste leads.
      <span>Machines follow.</span>
    </H2>
    <Steps>
      {agentSteps.map((s, i) => (
        <Step
          key={s.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <Num>
            {String(i + 1).padStart(2, "0")} / {s.label}
          </Num>
          <StepTitle>{s.label}</StepTitle>
          <StepBody>{s.detail}</StepBody>
        </Step>
      ))}
    </Steps>
  </Section>
);

export default OrchestrationSection;
