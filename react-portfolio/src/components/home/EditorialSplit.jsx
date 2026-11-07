import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";

const Section = styled.section`
  margin: 5rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: end;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Fig = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: ${(p) => p.theme.magenta};
  display: block;
  margin-bottom: 0.75rem;
`;

const H2 = styled(motion.h2)`
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  span {
    display: block;
  }
  em {
    font-style: normal;
    color: ${(p) => p.theme.muted};
    font-weight: 400;
  }
`;

const Body = styled(motion.p)`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${(p) => p.theme.muted};
  max-width: 28rem;
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Pill = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid rgba(244, 114, 182, 0.25);
  border-radius: 999px;
  color: ${(p) => p.theme.text};
  strong {
    color: ${(p) => p.theme.magenta};
    margin-right: 0.35rem;
  }
`;

const EditorialSplit = () => {
  const layers = profile.skills.layers.slice(0, 5);

  return (
    <Section>
      <div>
        <Fig>Fig. 02 · Capability map</Fig>
        <H2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span>Built for</span>
          <span>
            <em>speed.</em>
          </span>
        </H2>
        <PillRow>
          {layers.map((l, i) => (
            <Pill key={l.title}>
              <strong>{String(i + 1).padStart(2, "0")}</strong>
              {l.title}
            </Pill>
          ))}
        </PillRow>
      </div>
      <Body
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        AI-assisted delivery · directed and refined by a decade in production.
        {profile.about.summary.slice(0, 200)}…
      </Body>
    </Section>
  );
};

export default EditorialSplit;
