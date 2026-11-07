import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  IconBot,
  IconMenu,
  IconX,
  IconSparkles,
  IconArrowUpRight,
  IconMessage,
  IconZap,
  IconCpu,
  IconMail,
  IconSend,
  IconCompass,
} from "./icons";
import { CHAPTERS } from "../../data/chapters";
import AgentNetworkCanvas from "./AgentNetworkCanvas";
import CareerAgentDrawer from "./CareerAgentDrawer";

const NarrativeScrollApp = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isAiAgentOpen, setIsAiAgentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = containerRef.current.clientHeight;
      const index = Math.round(scrollPosition / windowHeight);
      if (index >= 0 && index < CHAPTERS.length) {
        setActiveChapterIndex(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToChapter = (index) => {
    const targetEl = document.getElementById(`chapter-${CHAPTERS[index].id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const intro = CHAPTERS[0];
  const shipsChapter = CHAPTERS[6];
  const engineChapter = CHAPTERS[7];
  const contactChapter = CHAPTERS[8];

  return (
    <div className="relative w-screen h-screen bg-story-bg text-[#f2ebe3] font-sans overflow-hidden select-none">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#f2ebe3_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[#080706]/70 backdrop-blur-xl border-b border-[#f2ebe3]/10">
        <button
          type="button"
          className="flex items-center gap-3 text-left"
          onClick={() => scrollToChapter(0)}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-amber-500/20">
            RR
          </div>
          <div>
            <span className="font-serif text-lg font-medium tracking-tight text-[#f2ebe3]">
              Rakshith R
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-amber-500/80 uppercase tracking-widest">
              · Full-Stack &amp; AI Lead
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#f2ebe3]/70">
          <span>CHAPTER</span>
          <span className="text-amber-400 font-bold">{CHAPTERS[activeChapterIndex].id}</span>
          <span>/</span>
          <span>08</span>
          <span className="mx-2 opacity-30">|</span>
          <span className="text-[#f2ebe3] truncate max-w-[180px]">
            {CHAPTERS[activeChapterIndex].title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAiAgentOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all text-xs font-mono uppercase tracking-wider"
          >
            <IconBot className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ask agent</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#f2ebe3]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </header>

      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3" aria-label="Chapters">
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToChapter(idx)}
              className="group flex items-center gap-3 py-1"
            >
              <span
                className={`text-[11px] font-mono transition-all duration-300 ${
                  isActive
                    ? "text-amber-400 opacity-100 font-bold"
                    : "text-[#f2ebe3]/40 opacity-0 group-hover:opacity-100"
                }`}
              >
                {ch.id}. {ch.title}
              </span>
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] ring-4 ring-amber-500/20"
                    : "w-2 h-2 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080706]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-20 md:hidden">
          <div className="text-xs font-mono text-amber-500/80 uppercase tracking-widest mb-6">
            {"// Narrative index"}
          </div>
          <div className="flex flex-col gap-4">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className={`flex items-center gap-4 text-left py-2 border-b border-white/5 ${
                  idx === activeChapterIndex ? "text-amber-400 font-serif text-xl" : "text-white/70"
                }`}
              >
                <span className="font-mono text-xs text-amber-500/60">{ch.id}</span>
                <span>{ch.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <main
        ref={containerRef}
        className="relative z-10 w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <section
          id="chapter-00"
          className="w-full h-screen snap-start flex items-center justify-center px-6 md:px-20 relative pt-20"
        >
          <div className="max-w-4xl w-full mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-6">
              <IconSparkles />
              <span>CHAPTER 00 — FULL-STACK → AI LEAD</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-[#f2ebe3] mb-6">
              From core full-stack lead <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-orange-400">
                to GenAI &amp; agent architect.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#f2ebe3]/70 font-light max-w-2xl leading-relaxed mb-10">
              {intro.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToChapter(5)}
                className="px-6 py-3.5 rounded-full bg-[#f2ebe3] text-[#080706] font-medium text-sm flex items-center gap-2 hover:bg-amber-400 transition-all"
              >
                <span>Explore current AI leadership</span>
                <IconArrowUpRight />
              </button>
              <button
                type="button"
                onClick={() => setIsAiAgentOpen(true)}
                className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-[#f2ebe3] font-medium text-sm flex items-center gap-2 backdrop-blur-md"
              >
                <IconMessage className="w-4 h-4 text-amber-400" />
                <span>Interrogate career agent</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-[#f2ebe3]/10">
              <div>
                <div className="text-2xl font-serif text-amber-400">10 yrs</div>
                <div className="text-xs font-mono text-[#f2ebe3]/50">ENGINEERING</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-amber-400">Full-stack</div>
                <div className="text-xs font-mono text-[#f2ebe3]/50">ROOT</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-amber-400">GenAI</div>
                <div className="text-xs font-mono text-[#f2ebe3]/50">CURRENT LAYER</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-amber-400">Agents</div>
                <div className="text-xs font-mono text-[#f2ebe3]/50">RAG + ORCHESTRATION</div>
              </div>
            </div>
          </div>
        </section>

        {CHAPTERS.slice(1, 6).map((chapter) => (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="w-full min-h-screen snap-start flex items-center justify-center px-6 md:px-20 relative pt-16 py-12"
          >
            <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-mono text-xs">
                    CHAPTER {chapter.id}
                  </span>
                  <span className="text-xs font-mono text-[#f2ebe3]/40 uppercase tracking-widest">
                    {chapter.period}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f2ebe3] mb-2">
                  {chapter.title}
                </h2>
                <div className="text-sm font-mono text-amber-400/90 mb-4 flex flex-wrap items-center gap-2">
                  <span>{chapter.role}</span>
                  <span className="opacity-40">·</span>
                  <span className="text-[#f2ebe3]/80">{chapter.company}</span>
                </div>
                <p className="text-base sm:text-lg text-[#f2ebe3]/70 font-light leading-relaxed mb-6">
                  {chapter.description}
                </p>
                <div className="space-y-3 mb-8">
                  {chapter.highlights?.map((h) => (
                    <div key={h} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <p className="text-sm text-[#f2ebe3]/80 leading-snug">{h}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {chapter.tech?.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-story-panel border border-[#f2ebe3]/10 text-xs font-mono text-[#f2ebe3]/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                {chapter.id === "05" ? (
                  <AgentNetworkCanvas />
                ) : (
                  <div className="w-full p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                    <div className="font-mono text-6xl font-extralight text-white/10 mb-4">{chapter.id}</div>
                    <div className="text-xs font-mono text-amber-400 mb-2 uppercase tracking-widest">
                      Milestone
                    </div>
                    <h3 className="text-xl font-serif text-[#f2ebe3] mb-3">{chapter.subtitle}</h3>
                    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-amber-400">
                      <IconZap />
                      <span>{chapter.period}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        <section
          id="chapter-06"
          className="w-full min-h-screen snap-start flex items-center justify-center px-6 md:px-20 relative pt-16 py-12"
        >
          <div className="max-w-6xl w-full mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-mono text-xs">
                CHAPTER 06
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#f2ebe3] mb-6">
              {shipsChapter.title}
            </h2>
            <p className="text-[#f2ebe3]/60 mb-8 max-w-2xl">{shipsChapter.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shipsChapter.ships.map((ship) => (
                <div
                  key={ship.title}
                  className="p-6 rounded-2xl bg-story-panel border border-[#f2ebe3]/10 hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                      {ship.category}
                    </span>
                    <span className="text-xs font-mono text-[#f2ebe3]/40">{ship.company}</span>
                  </div>
                  <h3 className="text-lg font-serif text-[#f2ebe3] mb-2">{ship.title}</h3>
                  <p className="text-xs text-[#f2ebe3]/70 leading-relaxed mb-4">{ship.summary}</p>
                  <div className="text-xs font-mono text-emerald-400/90 mb-3 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/10">
                    {ship.metrics}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ship.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-[#f2ebe3]/50 px-2 py-0.5 rounded bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="chapter-07"
          className="w-full min-h-screen snap-start flex items-center justify-center px-6 md:px-20 relative pt-16 py-12"
        >
          <div className="max-w-5xl w-full mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-mono text-xs">
                CHAPTER 07
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#f2ebe3] mb-4">
              {engineChapter.title}
            </h2>
            <p className="text-[#f2ebe3]/60 mb-8 max-w-2xl">{engineChapter.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {engineChapter.categories.map((cat) => (
                <div key={cat.name} className="p-6 rounded-2xl bg-story-panel border border-[#f2ebe3]/10">
                  <h3 className="text-sm font-mono text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <IconCpu />
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-[#f2ebe3]/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="chapter-08"
          className="w-full h-screen snap-start flex items-center justify-center px-6 md:px-20 relative pt-16"
        >
          <div className="max-w-4xl w-full mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-6">
              <IconMail />
              <span>CHAPTER 08 — DIRECT LINE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#f2ebe3] mb-6">
              Ready to build autonomous <br />
              <span className="italic text-amber-400">AI architectures?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#f2ebe3]/70 font-light max-w-xl mx-auto mb-10">
              {contactChapter.description}
            </p>
            <div className="p-4 sm:p-6 rounded-2xl bg-story-panel border border-[#f2ebe3]/10 max-w-md mx-auto mb-10 flex items-center justify-between gap-4">
              <div className="text-left overflow-hidden">
                <div className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest">Email</div>
                <div className="text-sm sm:text-base font-mono text-[#f2ebe3] truncate">{contactChapter.email}</div>
              </div>
              <a
                href={`mailto:${contactChapter.email}`}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-medium text-xs hover:bg-amber-400 transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>Send</span>
                <IconSend className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href={contactChapter.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#f2ebe3]/60 hover:text-amber-400 uppercase tracking-wider"
              >
                GitHub ↗
              </a>
              <a
                href={contactChapter.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#f2ebe3]/60 hover:text-amber-400 uppercase tracking-wider"
              >
                LinkedIn ↗
              </a>
              <div className="flex items-center gap-2 text-xs font-mono text-[#f2ebe3]/40">
                <IconCompass />
                {contactChapter.location}
              </div>
            </div>
            <footer className="mt-12 flex flex-wrap justify-center gap-4 text-[11px] font-mono text-[#f2ebe3]/30">
              <Link to="/experience" className="hover:text-amber-400/80">
                Full résumé
              </Link>
              <Link to="/projects" className="hover:text-amber-400/80">
                Projects
              </Link>
              <Link to="/about" className="hover:text-amber-400/80">
                About
              </Link>
              <span>© {new Date().getFullYear()} Rakshith R</span>
            </footer>
          </div>
        </section>
      </main>

      <CareerAgentDrawer open={isAiAgentOpen} onClose={() => setIsAiAgentOpen(false)} />
    </div>
  );
};

export default NarrativeScrollApp;
