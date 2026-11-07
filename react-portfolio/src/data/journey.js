import { CHAPTERS } from "./chapters";
import { profile } from "./profile";

export { CHAPTERS };

export const DESIGN = {
  bg: "#080706",
  surface: "rgba(20, 18, 16, 0.65)",
  text: "#f2ebe3",
  muted: "#8e8a85",
  cyan: "#00e5ff",
  amber: "#ff9e2c",
  emerald: "#10b981",
};

export const QUICK_PROMPTS = [
  "What do you do at Bayer?",
  "Show me agent & RAG work",
  "Full-stack → AI journey",
  "How to contact you?",
];

/** Stack matrix tabs (Ch. 07) — links show related layers when a chip is selected */
export const STACK_TABS = [
  {
    id: "agents",
    label: "Agentic",
    items: [
      { id: "langgraph", label: "LangGraph", links: ["rag", "python", "fastapi"] },
      { id: "autogen", label: "AutoGen", links: ["python", "orchestration"] },
      { id: "crewai", label: "CrewAI", links: ["python", "agents"] },
      { id: "langchain", label: "LangChain", links: ["rag", "python"] },
      { id: "rag", label: "RAG", links: ["vector", "python", "embeddings"] },
      { id: "orchestration", label: "Orchestration", links: ["langgraph", "autogen"] },
    ],
  },
  {
    id: "llm",
    label: "LLMs & Vectors",
    items: [
      { id: "openai", label: "OpenAI API", links: ["rag", "agents"] },
      { id: "pinecone", label: "Pinecone", links: ["vector", "rag"] },
      { id: "qdrant", label: "Qdrant", links: ["vector", "rag"] },
      { id: "chroma", label: "ChromaDB", links: ["vector", "rag"] },
      { id: "pgvector", label: "pgvector", links: ["postgres", "vector"] },
      { id: "vector", label: "Vector search", links: ["rag", "embeddings"] },
      { id: "embeddings", label: "Embeddings", links: ["rag", "vector"] },
    ],
  },
  {
    id: "fullstack",
    label: "Full-Stack",
    items: [
      { id: "react", label: "React / Next", links: ["typescript", "node"] },
      { id: "typescript", label: "TypeScript", links: ["react", "node"] },
      { id: "node", label: "Node.js", links: ["graphql", "react"] },
      { id: "python", label: "Python", links: ["fastapi", "rag"] },
      { id: "fastapi", label: "FastAPI", links: ["python", "agents"] },
      { id: "graphql", label: "GraphQL", links: ["node", "react"] },
      { id: "postgres", label: "PostgreSQL", links: ["pgvector"] },
    ],
  },
  {
    id: "cloud",
    label: "Cloud / Ops",
    items: [
      { id: "aws", label: "AWS", links: ["lambda", "docker"] },
      { id: "lambda", label: "Lambda", links: ["aws", "python"] },
      { id: "docker", label: "Docker", links: ["aws", "k8s"] },
      { id: "k8s", label: "Kubernetes", links: ["docker", "aws"] },
      { id: "cicd", label: "CI/CD", links: ["jenkins", "aws"] },
      { id: "jenkins", label: "Jenkins", links: ["cicd", "docker"] },
    ],
  },
];

export const INTRO_STATS = [
  { value: "9+ yrs", label: "Full-stack & AI" },
  { value: "Lead", label: "Engineering" },
  { value: "GenAI", label: "Bayer · R&D" },
  { value: "Agents", label: "RAG + orchestration" },
];

export const meta = {
  name: profile.name,
  headline: profile.headline,
  email: profile.email,
  links: profile.links,
};
