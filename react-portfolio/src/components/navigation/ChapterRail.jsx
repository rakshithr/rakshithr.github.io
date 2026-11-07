import React from "react";
import { CHAPTERS } from "../../data/chapters";

const ChapterRail = ({ activeIndex, progress, onJump }) => (
  <nav
    className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-4 w-48"
    aria-label="Chapters"
  >
    <div className="w-1 h-24 rounded-full bg-white bg-opacity-10 overflow-hidden mb-2">
      <div
        className="w-full bg-gradient-to-b from-story-amber to-story-cyan transition-all duration-300"
        style={{ height: `${Math.round(progress * 100)}%` }}
      />
    </div>
    <span className="font-mono text-[10px] text-story-muted">{Math.round(progress * 100)}%</span>
    {CHAPTERS.map((ch, idx) => {
      const active = idx === activeIndex;
      return (
        <button
          key={ch.id}
          type="button"
          onClick={() => onJump(idx)}
          className="group flex items-center gap-3 py-0.5"
        >
          <span
            className={`text-[10px] font-mono text-right transition-all ${
              active ? "text-story-amber opacity-100" : "text-story-muted opacity-0 group-hover:opacity-80"
            }`}
          >
            {ch.id} · {ch.title}
          </span>
          <span
            className={`rounded-full shrink-0 transition-all ${
              active
                ? "w-3 h-3 bg-story-amber shadow-amber ring-4 ring-story-amber ring-opacity-20"
                : "w-2 h-2 bg-white bg-opacity-20 group-hover:bg-opacity-50"
            }`}
          />
        </button>
      );
    })}
  </nav>
);

export default ChapterRail;
