import { buildKnowledgeChunks, tokenize } from "./knowledgeBase";

const STOP = new Set([
  "the",
  "and",
  "for",
  "you",
  "what",
  "who",
  "how",
  "are",
  "is",
  "my",
  "me",
  "about",
  "does",
  "do",
  "can",
  "with",
  "your",
]);

let cache = null;

export function getChunks() {
  if (!cache) cache = buildKnowledgeChunks();
  return cache;
}

function scoreChunk(queryTokens, chunk) {
  const q = queryTokens.filter((t) => !STOP.has(t));
  if (!q.length) return 0;

  const chunkSet = new Set(chunk.tokens);
  let overlap = 0;
  q.forEach((t) => {
    if (chunkSet.has(t)) overlap += 1;
  });

  let tagBoost = 0;
  chunk.tags.forEach((tag) => {
    if (q.some((t) => tag.includes(t) || t.includes(tag))) tagBoost += 2;
  });

  const titleTokens = tokenize(chunk.title);
  let titleBoost = 0;
  titleTokens.forEach((t) => {
    if (q.includes(t)) titleBoost += 1.5;
  });

  return overlap * 2 + tagBoost + titleBoost;
}

export function retrieve(query, topK = 4) {
  const queryTokens = tokenize(query);
  const chunks = getChunks();

  const scored = chunks
    .map((c) => ({ chunk: c, score: scoreChunk(queryTokens, c) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return chunks.slice(0, 3).map((c) => ({ chunk: c, score: 0.1 }));
  }

  return scored.slice(0, topK);
}
