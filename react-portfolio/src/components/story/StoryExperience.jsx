import React, { useCallback, useRef, useState } from "react";
import { CHAPTERS } from "../../data/chapters";
import { useStoryScroll } from "../../hooks/useStoryScroll";
import StoryHeader from "../navigation/StoryHeader";
import ChapterRail from "../navigation/ChapterRail";
import AgentFab from "../navigation/AgentFab";
import CareerDrawer from "../navigation/CareerDrawer";
import {
  Chapter00,
  ChapterEra,
  Chapter05,
  Chapter06,
  Chapter07,
  Chapter08,
} from "../chapters/StoryChapters";
import AmbientBackground from "../canvas/AmbientBackground";

const StoryExperience = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [agentOpen, setAgentOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fabPulse, setFabPulse] = useState(true);

  const onScroll = useCallback(({ scroll, limit }) => {
    setProgress(limit > 0 ? scroll / limit : 0);
    const root = contentRef.current;
    if (!root) return;
    const sections = root.querySelectorAll("[data-chapter]");
    let idx = 0;
    sections.forEach((el, i) => {
      if (scroll >= el.offsetTop - 120) idx = i;
    });
    setActiveIndex(idx);
    if (idx >= 4) setFabPulse(false);
  }, []);

  const { scrollTo } = useStoryScroll(wrapperRef, contentRef, onScroll);

  const jump = (index) => {
    const id = CHAPTERS[index]?.id;
    const el = document.getElementById(`chapter-${id}`);
    if (el) scrollTo(el, { offset: -80 });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-story-bg text-story-text">
      <AmbientBackground />

      <StoryHeader
        activeIndex={activeIndex}
        onHome={() => jump(0)}
        onOpenAgent={() => setAgentOpen(true)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onJump={jump}
      />

      <ChapterRail activeIndex={activeIndex} progress={progress} onJump={jump} />
      <AgentFab onClick={() => setAgentOpen(true)} pulse={fabPulse} />
      <CareerDrawer open={agentOpen} onClose={() => setAgentOpen(false)} />

      <div ref={wrapperRef} className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <div ref={contentRef}>
          <Chapter00 wrapperRef={wrapperRef} />
          {CHAPTERS.slice(1, 5).map((ch) => (
            <ChapterEra key={ch.id} chapter={ch} wrapperRef={wrapperRef} />
          ))}
          <Chapter05 wrapperRef={wrapperRef} />
          <Chapter06 wrapperRef={wrapperRef} />
          <Chapter07 wrapperRef={wrapperRef} />
          <Chapter08 />
        </div>
      </div>
    </div>
  );
};

export default StoryExperience;
