import React, { useState } from "react";
import { IconBot, IconSend, IconX } from "../narrative/icons";
import { retrieve } from "../../agent/retriever";
import { composeAnswer } from "../../agent/composeAnswer";
import { QUICK_PROMPTS } from "../../data/journey";

const CareerDrawer = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Rakshith AI Assistant — grounded in this site's résumé. Ask about Bayer, agents, RAG, leadership, or contact.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!open) return null;

  const send = (text) => {
    const userText = text.trim();
    if (!userText) return;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMessage("");
    setIsTyping(true);
    window.setTimeout(() => {
      const chunks = retrieve(userText, 4);
      const { answer } = composeAnswer(userText, chunks);
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
      setIsTyping(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(inputMessage);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-60 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md h-full bg-story-panel border-l border-white border-opacity-10 p-6 flex flex-col animate-slideInRight">
        <div className="flex justify-between items-center pb-4 border-b border-white border-opacity-10">
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-story-cyan bg-opacity-10 border border-story-cyan border-opacity-30 flex items-center justify-center">
              <IconBot className="w-4 h-4 text-story-cyan" />
            </div>
            <div>
              <div className="text-sm font-serif text-story-text">Rakshith AI Assistant</div>
              <div className="text-[10px] font-mono text-story-emerald">ONLINE</div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg bg-white bg-opacity-5" aria-label="Close">
            <IconX />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 py-3">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-story-amber border-opacity-25 text-story-muted hover:text-story-amber"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 py-2" data-lenis-prevent>
          {messages.map((m, idx) => (
            <div key={`${idx}-${m.sender}`} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  m.sender === "user"
                    ? "bg-story-amber bg-opacity-15 border border-story-amber border-opacity-25 text-story-text"
                    : "editorial-surface text-story-muted"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-xs font-mono text-story-cyan animate-pulse">Retrieving…</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="pt-3 border-t border-white border-opacity-10 flex gap-2">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask anything…"
            className="flex-1 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl px-3 py-2 text-xs text-story-text focus:outline-none focus:border-story-cyan focus:border-opacity-40"
          />
          <button type="submit" className="px-3 py-2 rounded-xl bg-story-amber text-black" aria-label="Send">
            <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerDrawer;
