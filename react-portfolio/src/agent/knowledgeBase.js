import { profile, experience, agentSteps } from "../data/profile";
import { Work } from "../data/WorkData";

/** Flatten site content into retrievable chunks for the career agent. */
export function buildKnowledgeChunks() {
  const chunks = [];

  const push = (id, title, text, tags = []) => {
    chunks.push({
      id,
      title,
      text: text.trim(),
      tags,
      tokens: tokenize(`${title} ${text} ${tags.join(" ")}`),
    });
  };

  push("intro", "Introduction", `${profile.name}. ${profile.headline}. ${profile.tagline}`, [
    "about",
    "bio",
  ]);
  push("thesis", "Philosophy", profile.thesis, ["ai", "opinion"]);
  push("about-summary", "About", profile.about.summary, ["background"]);
  push("about-current", "Current role", profile.about.current, ["bayer", "job"]);
  push("education", "Education", profile.about.education, ["school"]);
  push("certifications", "Certifications", profile.about.certifications, ["certs"]);
  push("awards", "Awards", profile.about.awards, ["honors"]);

  profile.highlights.forEach((h, i) => {
    push(`highlight-${i}`, "Career highlight", h, ["achievements"]);
  });

  profile.skills.layers.forEach((layer) => {
    push(`skill-${layer.title}`, layer.title, layer.items, ["skills", "stack"]);
  });
  push("tools", "Tools", profile.skills.tools, ["tools"]);
  push("skills-intro", "Technical focus", profile.skills.intro, ["skills"]);

  experience.forEach((job) => {
    push(
      `exp-${job.id}`,
      job.name,
      `${job.name} (${job.date}). Roles: ${job.tags.join(", ")}.`,
      ["experience", "work", ...job.tags.map((t) => t.toLowerCase())]
    );
  });

  agentSteps.forEach((step) => {
    push(`agent-${step.id}`, `Agent architecture: ${step.label}`, step.detail, [
      "agents",
      "architecture",
      step.id,
    ]);
  });

  Work.forEach((p) => {
    push(
      `project-${p.id}`,
      p.name,
      `${p.description} Tags: ${p.tags.join(", ")}.`,
      ["projects", ...p.tags]
    );
  });

  push(
    "contact",
    "Contact",
    `Email: ${profile.email}. LinkedIn: ${profile.links.linkedin}. GitHub: ${profile.links.github}. Location: ${profile.location}.`,
    ["contact", "email", "linkedin"]
  );

  return chunks;
}

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}
