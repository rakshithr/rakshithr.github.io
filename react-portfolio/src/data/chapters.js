import { profile } from "./profile";

/** Editorial scroll chapters — aligned with Gemini narrative, verified contact from profile */
export const CHAPTERS = [
  {
    id: "00",
    slug: "intro",
    title: "Rakshith R",
    subtitle: profile.headline,
    period: "NOW",
    summary:
      "Architecting autonomous agent workflows, enterprise RAG systems, and full-stack platforms with production discipline and editorial clarity.",
    tag: "INTRO · VISION & LEAD IDENTITY",
  },
  {
    id: "01",
    slug: "foundations",
    title: "First Production",
    subtitle: "Core Engineering & Web Foundations",
    period: "2016 – 2017",
    role: "Software Engineer · Web Developer",
    company: "Inode Technologies · ICMG",
    description:
      "Forged foundations in JavaScript, PHP, MySQL, and CSS. Built web backends, responsive interfaces, and database-backed features from scratch.",
    highlights: [
      "PHP/MySQL backends and REST-style integrations",
      "DOM-driven JavaScript and async, event-driven UI patterns",
      "Responsive layouts before modern CSS grid was ubiquitous",
    ],
    tech: ["JavaScript", "PHP", "MySQL", "HTML5/CSS3", "REST APIs"],
  },
  {
    id: "02",
    slug: "evolution",
    title: "Full-Stack Evolution",
    subtitle: "React & Node Ecosystems",
    period: "2017 – 2021",
    role: "Full-stack Developer",
    company: "Infomaze Technologies",
    description:
      "Moved legacy stacks toward SPAs—Node microservices, React frontends, and integrations built for maintainability and throughput.",
    highlights: [
      "React dashboards and component-driven frontends",
      "Node.js services and API integrations",
      "Database tuning and delivery in agile squads",
    ],
    tech: ["React.js", "Node.js", "Express", "SQL", "REST", "Docker"],
  },
  {
    id: "03",
    slug: "leadership",
    title: "Leadership & Enterprise Scale",
    subtitle: "Architecture & Mentorship",
    period: "2021 – 2025",
    role: "Lead Full Stack → Team Lead",
    company: "NuVeda",
    description:
      "Directed technical vision for enterprise LMS on AWS—GraphQL, CI/CD, security-minded delivery, and mentoring engineers across the stack.",
    highlights: [
      "Led engineering for corporate learning platforms on AWS",
      "GraphQL APIs, Jenkins pipelines, Dockerized workflows",
      "Team rituals, code quality, and cross-functional delivery",
    ],
    tech: ["React", "GraphQL", "AWS", "Jenkins", "Docker", "Node.js"],
  },
  {
    id: "04",
    slug: "genai-pivot",
    title: "GenAI Shift & RAG Pipelines",
    subtitle: "Intelligent Workflows & Vector Search",
    period: "2025",
    role: "Technical Lead · GenAI",
    company: "HCLTech",
    description:
      "Enterprise LLM integration—hybrid RAG, semantic search, embeddings, and guardrails for production agent harnesses on AWS.",
    highlights: [
      "Production RAG and vector search architectures",
      "Multi-agent orchestration and retrieval frameworks",
      "Cost/latency awareness and validation layers",
    ],
    tech: ["Python", "LangChain", "AWS", "Vector DB", "FastAPI", "LLM APIs"],
  },
  {
    id: "05",
    slug: "agent-architecture",
    title: "Autonomous AI Leadership",
    subtitle: "Multi-Agent Systems & Enterprise Copilots",
    period: "TODAY",
    role: "Software Engineer · GenAI R&D",
    company: "Bayer Digital Hub India",
    description: profile.about.current,
    highlights: profile.highlights.slice(0, 3),
    tech: [
      "Agent orchestration",
      "RAG",
      "Python / Node",
      "React",
      "AWS",
      "LLM workflows",
    ],
  },
  {
    id: "06",
    slug: "ships",
    title: "Selected Engineering Ships",
    subtitle: "Proof on the bench",
    period: "2020 – 2026",
    description:
      "Highlights from Bayer, HCLTech, and NuVeda—agents, SaaS scale, and middleware that survived production scrutiny.",
    ships: [
      {
        title: "Agentic Knowledge Workflows",
        category: "Multi-Agent AI",
        company: "Bayer",
        summary:
          "Enterprise agent workflows and LLM R&D—leadership demos, internal spotlight (#GetToKnowUs), hackathon insight pipelines.",
        metrics: "Leadership-ready harness · GenAI spotlight",
        tech: ["LangGraph", "RAG", "React", "Python", "AWS"],
      },
      {
        title: "Enterprise Retrieval Stack",
        category: "GenAI Platform",
        company: "HCLTech",
        summary:
          "RAG, multi-agent orchestration, and vector search on AWS for client-scale intelligent systems.",
        metrics: "TL ownership · AWS-native delivery",
        tech: ["RAG", "Vector search", "Python", "Lambda"],
      },
      {
        title: "Corporate Learning Platform",
        category: "Full-Stack SaaS",
        company: "NuVeda",
        summary:
          "LMS and learning workflows with cloud deployment, GraphQL, and CI/CD across team-lead tenure.",
        metrics: "Team lead · AWS · GraphQL",
        tech: ["React", "GraphQL", "AWS", "Jenkins"],
      },
      {
        title: "Full-Stack Product Delivery",
        category: "Web Systems",
        company: "Infomaze",
        summary:
          "Years of end-to-end features—APIs, React UIs, and integrations shipped to real users.",
        metrics: "4+ years · Full-stack ownership",
        tech: ["React", "Node.js", "REST", "SQL"],
      },
    ],
  },
  {
    id: "07",
    slug: "engine",
    title: "Tech Stack & Agent Engine",
    subtitle: "Full-stack mastery meets GenAI infrastructure",
    period: "CORE MATRICES",
    description: profile.skills.intro,
    categories: [
      {
        name: "GenAI & Agent Frameworks",
        items: [
          "RAG",
          "Multi-agent orchestration",
          "Embeddings",
          "Prompt engineering",
          "LLM APIs",
        ],
      },
      {
        name: "Full-Stack Core",
        items: [
          "React.js",
          "TypeScript",
          "Node.js",
          "Python",
          "GraphQL",
          "REST",
        ],
      },
      {
        name: "Data & Vector Layer",
        items: [
          "Vector DBs",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "S3",
        ],
      },
      {
        name: "Cloud & DevOps",
        items: [
          "AWS Lambda",
          "API Gateway",
          "Docker",
          "Jenkins",
          "CI/CD",
        ],
      },
    ],
  },
  {
    id: "08",
    slug: "contact",
    title: "Direct Line & Connections",
    subtitle: "Let's build the next generation of intelligent systems",
    period: "CONTACT",
    description:
      "Open to AI engineering leadership, agent architecture work, and high-impact full-stack + GenAI product builds.",
    email: profile.email,
    github: profile.links.github,
    linkedin: profile.links.linkedin,
    location: `${profile.location} · Available globally (remote)`,
  },
];
