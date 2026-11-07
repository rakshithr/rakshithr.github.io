import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import portrait from "../../assets/Images/Profile.png";

const Section = styled.section`
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  align-items: center;
  padding: 5.5rem clamp(1.25rem, 5vw, 4rem) 3rem;
  background: ${(p) => p.$bg || p.theme.body};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(p) => p.$beam || "none"};
    pointer-events: none;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Index = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  color: ${(p) => p.theme.accent};
  display: block;
  margin-bottom: 1rem;
`;

const Era = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  color: ${(p) => p.theme.muted};
  letter-spacing: 0.15em;
  margin-left: 1rem;
`;

const H2 = styled(motion.h2)`
  font-size: clamp(2.25rem, 6vw, 4.25rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
`;

const Role = styled.p`
  font-size: 1.15rem;
  color: ${(p) => p.theme.beam};
  margin-bottom: 0.35rem;
`;

const Places = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.75rem;
  color: ${(p) => p.theme.muted};
  margin-bottom: 1.25rem;
`;

const Body = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.75;
  color: ${(p) => p.theme.muted};
  max-width: 42rem;
`;

const Stack = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.75rem;
  list-style: none;
  padding: 0;
`;

const Tag = styled.li`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.65rem;
  border: 1px solid ${(p) => p.theme.glassBorder};
  border-radius: 999px;
  color: ${(p) => p.theme.text};
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const TitleBlock = styled.h1`
  font-size: clamp(2.75rem, 8vw, 5rem);
  line-height: 0.95;
  font-weight: 600;
  margin-bottom: 1.25rem;
  span {
    display: block;
  }
  .soft {
    color: ${(p) => p.theme.muted};
    font-weight: 400;
  }
`;

const Lead = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  line-height: 1.5;
  margin-bottom: 1rem;
  color: ${(p) => p.theme.beam};
`;

const ScrollHint = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
  margin-top: 2rem;
`;

const Portrait = styled(motion.figure)`
  margin: 0;
  position: relative;
  figcaption {
    margin-top: 0.65rem;
    font-family: ${(p) => p.theme.mono};
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(p) => p.theme.muted};
  }
  img {
    width: 100%;
    max-width: 380px;
    border-radius: 4px;
    display: block;
    object-fit: cover;
    aspect-ratio: 4/5;
    filter: grayscale(0.15) contrast(1.05);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  }
  &::after {
    content: "";
    position: absolute;
    top: 10%;
    right: -15%;
    width: 60%;
    height: 80%;
    background: linear-gradient(
      180deg,
      rgba(250, 248, 245, 0.08),
      rgba(232, 196, 168, 0.06)
    );
    filter: blur(40px);
    z-index: -1;
  }
`;

const BenchList = styled.ol`
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BenchItem = styled(motion.li)`
  border-top: 1px solid ${(p) => p.theme.glassBorder};
  padding-top: 1rem;
  h3 {
    font-family: ${(p) => p.theme.mono};
    font-size: 0.7rem;
    color: ${(p) => p.theme.accent};
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  p {
    font-size: 0.95rem;
    line-height: 1.55;
    color: ${(p) => p.theme.text};
  }
`;

const ToolGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1.25rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ToolCard = styled.div`
  h3 {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 0.88rem;
    line-height: 1.6;
    color: ${(p) => p.theme.muted};
  }
`;

const Bullets = styled.ul`
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  color: ${(p) => p.theme.muted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function renderChapter(chapter, bg, beam, i) {
  const id = `chapter-${chapter.id}`;

  if (chapter.kind === "intro") {
    return (
      <Section key={id} id={id} $bg={bg} $beam={beam}>
        <Inner>
          <IntroGrid>
            <div>
              <Index>{chapter.index} · {chapter.location}</Index>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
                <TitleBlock
                  as={motion.h1}
                  variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                >
                  <motion.span variants={fade}>{chapter.title[0]}</motion.span>
                  <motion.span className="soft" variants={fade}>
                    {chapter.title[1]}
                  </motion.span>
                </TitleBlock>
                <Lead as={motion.p} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {chapter.lead}
                </Lead>
                <Body as={motion.p} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {chapter.body}
                </Body>
                <ScrollHint>{chapter.cta}</ScrollHint>
              </motion.div>
            </div>
            <Portrait
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={portrait} alt={chapter.title[1]} />
              <figcaption>Portrait · full-stack → AI</figcaption>
            </Portrait>
          </IntroGrid>
        </Inner>
      </Section>
    );
  }

  if (chapter.kind === "era") {
    return (
      <Section key={id} id={id} $bg={bg} $beam={beam}>
        <Inner>
          <Index>
            {chapter.index}
            <Era>{chapter.era}</Era>
          </Index>
          <H2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
          >
            {chapter.title}
          </H2>
          <Role>{chapter.role}</Role>
          <Places>{chapter.places}</Places>
          <Body
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {chapter.body}
          </Body>
          {chapter.highlight && (
            <Bullets>
              {chapter.highlight.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </Bullets>
          )}
          <Stack>
            {chapter.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </Stack>
        </Inner>
      </Section>
    );
  }

  if (chapter.kind === "bench") {
    return (
      <Section key={id} id={id} $bg={bg} $beam={beam}>
        <Inner>
          <Index>{chapter.index}</Index>
          <H2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {chapter.title}
          </H2>
          <Body>{chapter.lead}</Body>
          <BenchList>
            {chapter.items.map((item, idx) => (
              <BenchItem
                key={item.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <h3>{item.n}</h3>
                <p>{item.text}</p>
              </BenchItem>
            ))}
          </BenchList>
        </Inner>
      </Section>
    );
  }

  if (chapter.kind === "tools") {
    return (
      <Section key={id} id={id} $bg={bg} $beam={beam}>
        <Inner>
          <Index>{chapter.index}</Index>
          <H2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {chapter.title}
          </H2>
          <Body>{chapter.lead}</Body>
          <ToolGrid>
            {chapter.layers.map((layer) => (
              <ToolCard key={layer.title}>
                <h3>{layer.title}</h3>
                <p>{layer.items}</p>
              </ToolCard>
            ))}
          </ToolGrid>
        </Inner>
      </Section>
    );
  }

  if (chapter.kind === "hello") {
    return (
      <Section key={id} id={id} $bg={bg} $beam={beam}>
        <Inner>
          <Index>{chapter.index}</Index>
          <H2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {chapter.title}
          </H2>
          <Body>{chapter.lead}</Body>
          <Role style={{ marginTop: "1.5rem" }}>
            <a
              href={`mailto:${chapter.email}`}
              style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid rgba(232,196,168,0.4)" }}
            >
              {chapter.email}
            </a>
          </Role>
        </Inner>
      </Section>
    );
  }

  return null;
}
