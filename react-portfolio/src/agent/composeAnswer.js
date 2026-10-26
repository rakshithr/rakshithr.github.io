import { profile } from "../data/profile";

const GREETING =
  /^(hi|hello|hey|good\s+(morning|afternoon|evening)|namaste)\b/i;

export function composeAnswer(query, retrieved) {
  const q = query.trim();
  if (!q) {
    return {
      answer:
        "Ask me about experience, GenAI skills, Bayer, HCLTech, projects, or how to contact Rakshith.",
      sources: [],
    };
  }

  if (GREETING.test(q)) {
    return {
      answer: `Hello — I'm a retrieval agent grounded in ${profile.name}'s portfolio. I answer from verified site data only (experience, skills, highlights, projects). What would you like to know?`,
      sources: [{ title: "Introduction", id: "intro" }],
    };
  }

  if (/contact|email|reach|linkedin|hire/i.test(q)) {
    const contact = retrieved.find((r) => r.chunk.id === "contact");
    if (contact) {
      return {
        answer: contact.chunk.text,
        sources: [sourceMeta(contact.chunk)],
      };
    }
  }

  const chunks = retrieved.map((r) => r.chunk);
  const unique = [];
  const seen = new Set();
  chunks.forEach((c) => {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      unique.push(c);
    }
  });

  if (!unique.length) {
    return {
      answer:
        "I couldn't find a strong match in the portfolio data. Try asking about Bayer, HCLTech, NuVeda, RAG, AI agents, or technical skills.",
      sources: [],
    };
  }

  const intro = unique.length === 1
    ? "Here's what I found in the knowledge base:"
    : "Based on retrieved context from this site:";

  const body = unique.map((c) => `• ${c.title} — ${c.text}`).join("\n\n");

  return {
    answer: `${intro}\n\n${body}`,
    sources: unique.map(sourceMeta),
  };
}

function sourceMeta(chunk) {
  return { id: chunk.id, title: chunk.title };
}
