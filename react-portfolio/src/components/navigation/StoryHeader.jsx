import React from "react";
import { CHAPTERS } from "../../data/chapters";

const StoryHeader = ({ activeIndex, onHome, onOpenAgent, mobileOpen, setMobileOpen, onJump }) => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-story-bg bg-opacity-70 backdrop-blur-xl border-b border-white border-opacity-10">
    <button type="button" className="flex items-center gap-3 text-left" onClick={onHome}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-story-amber to-amber-700 flex items-center justify-center text-black font-bold text-sm shadow-amber">
        RR
      </div>
      <span className="font-serif text-lg text-story-text">Rakshith R</span>
      <span className="hidden sm:inline text-xs font-mono text-story-amber uppercase tracking-widest opacity-80">
        · GenAI Lead
      </span>
    </button>

    <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full editorial-surface text-xs font-mono text-story-muted">
      <span className="text-story-cyan">CH {CHAPTERS[activeIndex]?.id}</span>
      <span>/ 08</span>
      <span className="mx-1 opacity-30">|</span>
      <span className="text-story-text truncate max-w-[160px]">{CHAPTERS[activeIndex]?.title}</span>
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onOpenAgent}
        className="hidden sm:flex px-3 py-2 rounded-full text-xs font-mono uppercase tracking-wider border border-story-amber border-opacity-30 text-story-amber bg-story-amber bg-opacity-10"
      >
        Ask agent
      </button>
      <button
        type="button"
        className="md:hidden p-2 rounded-lg editorial-surface text-story-text"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>
    </div>

    {mobileOpen && (
      <div className="md:hidden fixed inset-0 top-16 z-40 bg-story-bg bg-opacity-95 p-8">
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onJump(i)}
            className={`block w-full text-left py-3 border-b border-white border-opacity-5 font-serif ${
              i === activeIndex ? "text-story-amber" : "text-story-muted"
            }`}
          >
            <span className="font-mono text-xs mr-3">{ch.id}</span>
            {ch.title}
          </button>
        ))}
      </div>
    )}
  </header>
);

export default StoryHeader;
