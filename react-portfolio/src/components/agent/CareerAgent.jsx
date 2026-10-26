import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { retrieve } from "../../agent/retriever";
import { composeAnswer } from "../../agent/composeAnswer";
import { profile } from "../../data/profile";

const Section = styled.section`
  margin-top: 4rem;
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: ${(p) => p.theme.glass};
  backdrop-filter: blur(14px);
  border-radius: 16px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${(p) => p.theme.glassBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.accent};
`;

const Status = styled.span`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  color: ${(p) => p.theme.muted};
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 280px;
  }
`;

const Chat = styled.div`
  padding: 1rem 1.25rem 1.25rem;
  max-height: 420px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Bubble = styled.div`
  align-self: ${(p) => (p.$user ? "flex-end" : "flex-start")};
  max-width: 92%;
  padding: 0.75rem 1rem;
  border-radius: ${(p) => (p.$user ? "12px 12px 4px 12px" : "12px 12px 12px 4px")};
  background: ${(p) =>
    p.$user ? `rgba(${p.theme.accentRgb}, 0.12)` : "rgba(0,0,0,0.35)"};
  border: 1px solid ${(p) => p.theme.glassBorder};
  font-size: 0.88rem;
  line-height: 1.55;
  color: ${(p) => p.theme.text};
  white-space: pre-wrap;
`;

const Sources = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid ${(p) => p.theme.glassBorder};
  @media (min-width: 768px) {
    border-top: none;
    border-left: 1px solid ${(p) => p.theme.glassBorder};
  }
`;

const SourceTitle = styled.p`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: ${(p) => p.theme.muted};
  margin-bottom: 0.75rem;
`;

const SourceTag = styled.span`
  display: inline-block;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.6rem;
  padding: 0.25rem 0.5rem;
  margin: 0 0.35rem 0.35rem 0;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.glassBorder};
  color: ${(p) => p.theme.accent2};
`;

const InputRow = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid ${(p) => p.theme.glassBorder};
`;

const Input = styled.input`
  flex: 1;
  font-family: ${(p) => p.theme.mono};
  font-size: 0.8rem;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: rgba(0, 0, 0, 0.35);
  color: ${(p) => p.theme.text};
  outline: none;
  &:focus {
    border-color: ${(p) => p.theme.accent};
    box-shadow: 0 0 0 2px rgba(${(p) => p.theme.accentRgb}, 0.15);
  }
`;

const SendBtn = styled.button`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.7rem;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.accent};
  background: rgba(${(p) => p.theme.accentRgb}, 0.15);
  color: ${(p) => p.theme.accent};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0 1.25rem 0.75rem;
`;

const Chip = styled.button`
  font-family: ${(p) => p.theme.mono};
  font-size: 0.62rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: transparent;
  color: ${(p) => p.theme.muted};
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.accent};
    border-color: ${(p) => p.theme.accent};
  }
`;

const SUGGESTIONS = [
  "What do you do at Bayer?",
  "GenAI and agent skills",
  "HCLTech experience",
  "How to contact you?",
];

const CareerAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      text: `I'm ${profile.name}'s portfolio agent. I retrieve answers from this site's knowledge base (experience, skills, projects)—try a question below.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [sources, setSources] = useState([]);
  const [busy, setBusy] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const ask = (text) => {
    const q = text.trim();
    if (!q || busy) return;

    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");

    window.setTimeout(() => {
      const retrieved = retrieve(q, 4);
      const { answer, sources: src } = composeAnswer(q, retrieved);
      setMessages((m) => [...m, { role: "agent", text: answer }]);
      setSources(src);
      setBusy(false);
    }, 280);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <Section id="career-agent">
      <Header>
        <Title>Career RAG agent</Title>
        <Status>retrieve → compose · on-site knowledge</Status>
      </Header>
      <Chips>
        {SUGGESTIONS.map((s) => (
          <Chip key={s} type="button" onClick={() => ask(s)}>
            {s}
          </Chip>
        ))}
      </Chips>
      <Body>
        <div>
          <Chat ref={chatRef}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Bubble $user={msg.role === "user"}>{msg.text}</Bubble>
                </motion.div>
              ))}
            </AnimatePresence>
            {busy && (
              <Bubble $user={false}>Retrieving context chunks…</Bubble>
            )}
          </Chat>
          <InputRow onSubmit={onSubmit}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about experience, skills, projects…"
              aria-label="Question for career agent"
            />
            <SendBtn type="submit" disabled={busy || !input.trim()}>
              Send
            </SendBtn>
          </InputRow>
        </div>
        <Sources>
          <SourceTitle>Sources</SourceTitle>
          {sources.length === 0 ? (
            <SourceTag>—</SourceTag>
          ) : (
            sources.map((s) => (
              <SourceTag key={s.id}>{s.title}</SourceTag>
            ))
          )}
        </Sources>
      </Body>
    </Section>
  );
};

export default CareerAgent;
