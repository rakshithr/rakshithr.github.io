import React from "react";
import { IconBot } from "../narrative/icons";

const AgentFab = ({ onClick, pulse }) => (
  <button
    type="button"
    onClick={onClick}
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-story-surface border border-story-cyan border-opacity-30 text-story-text shadow-beam agent-fab-glow ${
      pulse ? "ring-2 ring-story-cyan ring-opacity-40" : ""
    }`}
    aria-label="Open career agent"
  >
    <span className="relative">
      <IconBot className="w-5 h-5 text-story-cyan" />
      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-story-emerald animate-pulse" />
    </span>
    <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider">AI Assistant</span>
  </button>
);

export default AgentFab;
