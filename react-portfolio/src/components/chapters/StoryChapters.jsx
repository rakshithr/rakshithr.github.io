import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "../../data/chapters";
import { INTRO_STATS, STACK_TABS } from "../../data/journey";
import AgentNetworkCanvas from "../narrative/AgentNetworkCanvas";
import { IconSend } from "../narrative/icons";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ id, children, className = "" }) => (
  <section
    id={`chapter-${id}`}
    data-chapter={id}
    className={`min-h-screen flex items-center px-6 md:px-20 pt-24 pb-16 relative ${className}`}
  >
    {children}
  </section>
);

const useTitleReveal = (ref, wrapperRef) => {
  useEffect(() => {
    const scroller = wrapperRef?.current;
    if (!ref.current || !scroller) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [ref, wrapperRef]);
};

export const Chapter00 = ({ wrapperRef }) => {
  const titleRef = useRef(null);
  useTitleReveal(titleRef, wrapperRef);
  const ch = CHAPTERS[0];
  return (
    <Section id="00">
      <div className="max-w-4xl mx-auto w-full">
        <p className="chapter-label mb-4">Chapter 00 {"//"} {ch.tag}</p>
        <h1 ref={titleRef} className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight text-story-text mb-6">
          From full-stack lead
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-story-amber to-story-cyan">
            to GenAI &amp; agent architect.
          </span>
        </h1>
        <p className="text-lg text-story-muted max-w-2xl mb-10">{ch.summary}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white border-opacity-10">
          {INTRO_STATS.map((s) => (
            <div key={s.label}>
              <div className="text-xl font-serif text-story-amber">{s.value}</div>
              <div className="text-[10px] font-mono text-story-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const ChapterEra = ({ chapter, wrapperRef }) => {
  const titleRef = useRef(null);
  useTitleReveal(titleRef, wrapperRef);
  return (
    <Section id={chapter.id}>
      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="chapter-label mb-2">
            Chapter {chapter.id} {"//"} {chapter.period}
          </p>
          <h2 ref={titleRef} className="font-serif text-4xl sm:text-5xl text-story-text mb-3">
            {chapter.title}
          </h2>
          <p className="text-sm font-mono text-story-cyan mb-1">{chapter.role}</p>
          <p className="text-sm font-mono text-story-muted mb-6">{chapter.company}</p>
          <p className="text-story-muted leading-relaxed mb-6">{chapter.description}</p>
          <ul className="space-y-2 mb-8">
            {chapter.highlights?.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-story-text">
                <span className="text-story-amber mt-1.5">·</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {chapter.tech?.map((t) => (
              <span key={t} className="px-3 py-1 text-xs font-mono editorial-surface text-story-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 editorial-surface p-8 relative">
          <span className="text-6xl font-mono text-white text-opacity-10">{chapter.id}</span>
          <p className="chapter-label mt-4">Milestone</p>
          <p className="font-serif text-xl text-story-text mt-2">{chapter.subtitle}</p>
        </div>
      </div>
    </Section>
  );
};

export const Chapter05 = ({ wrapperRef }) => {
  const chapter = CHAPTERS[5];
  const pinRef = useRef(null);
  const titleRef = useRef(null);
  useTitleReveal(titleRef, wrapperRef);

  useEffect(() => {
    const scroller = wrapperRef?.current;
    if (!pinRef.current || !scroller) return undefined;
    const st = ScrollTrigger.create({
      trigger: pinRef.current,
      scroller,
      start: "top top",
      end: "+=80%",
      pin: true,
      scrub: 0.8,
    });
    return () => st.kill();
  }, [wrapperRef]);

  return (
    <div ref={pinRef}>
      <Section id="05" className="min-h-[140vh]">
        <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="chapter-label">Chapter 05 {"//"} {chapter.period}</p>
            <h2 ref={titleRef} className="font-serif text-4xl sm:text-5xl text-story-text mt-2 mb-4">
              {chapter.title}
            </h2>
            <p className="text-sm font-mono text-story-cyan mb-4">
              {chapter.role} · {chapter.company}
            </p>
            <p className="text-story-muted leading-relaxed mb-6">{chapter.description}</p>
            <ul className="space-y-2 text-sm text-story-text">
              {chapter.highlights?.map((h) => (
                <li key={h}>— {h}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <AgentNetworkCanvas />
          </div>
        </div>
      </Section>
    </div>
  );
};

export const Chapter06 = ({ wrapperRef }) => {
  const ch = CHAPTERS[6];
  const titleRef = useRef(null);
  const [modal, setModal] = useState(null);
  useTitleReveal(titleRef, wrapperRef);

  return (
    <Section id="06">
      <div className="max-w-6xl mx-auto w-full">
        <p className="chapter-label">Chapter 06 // ships</p>
        <h2 ref={titleRef} className="font-serif text-4xl text-story-text mb-4">
          {ch.title}
        </h2>
        <p className="text-story-muted mb-8 max-w-2xl">{ch.description}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {ch.ships.map((ship) => (
            <motion.button
              key={ship.title}
              type="button"
              onClick={() => setModal(ship)}
              whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
              style={{ transformPerspective: 800 }}
              className="text-left editorial-surface p-6 hover:border-story-cyan hover:border-opacity-30 transition-colors"
            >
              <span className="text-xs font-mono text-story-amber">{ship.category}</span>
              <h3 className="font-serif text-lg text-story-text mt-2">{ship.title}</h3>
              <p className="text-xs text-story-muted mt-2 line-clamp-3">{ship.summary}</p>
              <p className="text-[10px] font-mono text-story-emerald mt-3">{ship.metrics}</p>
            </motion.button>
          ))}
        </div>
        {modal && (
          <div className="fixed inset-0 z-[55] flex items-center justify-center p-6 bg-black bg-opacity-70" role="dialog">
            <div className="max-w-lg w-full editorial-surface p-8">
              <h3 className="font-serif text-2xl text-story-text">{modal.title}</h3>
              <p className="text-sm text-story-muted mt-4">{modal.summary}</p>
              <p className="text-xs font-mono text-story-emerald mt-4">{modal.metrics}</p>
              <button type="button" className="mt-6 text-sm font-mono text-story-amber" onClick={() => setModal(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export const Chapter07 = ({ wrapperRef }) => {
  const ch = CHAPTERS[7];
  const titleRef = useRef(null);
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(null);
  useTitleReveal(titleRef, wrapperRef);
  const activeTab = STACK_TABS[tab];
  const linked = new Set(
    selected ? activeTab.items.find((i) => i.id === selected)?.links || [] : []
  );

  return (
    <Section id="07">
      <div className="max-w-5xl mx-auto w-full">
        <p className="chapter-label">Chapter 07 // matrix</p>
        <h2 ref={titleRef} className="font-serif text-4xl text-story-text mb-4">
          {ch.title}
        </h2>
        <p className="text-story-muted mb-6">{ch.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {STACK_TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(i);
                setSelected(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase ${
                tab === i ? "bg-story-cyan bg-opacity-15 text-story-cyan border border-story-cyan border-opacity-30" : "editorial-surface text-story-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {activeTab.items.map((item) => {
            const isSel = selected === item.id;
            const isLinked = linked.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(isSel ? null : item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSel
                    ? "bg-story-amber bg-opacity-20 border-story-amber text-story-text"
                    : isLinked
                    ? "ring-1 ring-story-cyan text-story-cyan"
                    : "editorial-surface text-story-muted"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export const Chapter08 = () => {
  const ch = CHAPTERS[8];
  return (
    <Section id="08">
      <div className="max-w-3xl mx-auto text-center w-full">
        <p className="chapter-label">Chapter 08 // contact</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-story-text mb-6">
          Direct line <span className="italic text-story-amber">&amp; agent</span>
        </h2>
        <p className="text-story-muted mb-8">{ch.description}</p>
        <div className="editorial-surface p-4 flex items-center justify-between gap-4 max-w-md mx-auto mb-8">
          <span className="font-mono text-sm text-story-text truncate">{ch.email}</span>
          <a href={`mailto:${ch.email}`} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-story-amber text-black text-xs font-medium">
            Send <IconSend className="w-3 h-3" />
          </a>
        </div>
        <div className="flex justify-center gap-6 text-xs font-mono text-story-muted">
          <a href={ch.github} className="hover:text-story-cyan" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={ch.linkedin} className="hover:text-story-cyan" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
        <footer className="mt-12 flex flex-wrap justify-center gap-4 text-[11px] font-mono text-story-muted opacity-60">
          <Link to="/experience">Résumé</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </footer>
      </div>
    </Section>
  );
};
