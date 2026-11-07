import React, { useState } from "react";
import { IconBot, IconSend, IconX } from "./icons";
import { retrieve } from "../../agent/retriever";
import { composeAnswer } from "../../agent/composeAnswer";

const CareerAgentDrawer = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Greetings. I am Rakshith's career agent—grounded in his résumé and this scroll story. Ask about Bayer, HCLTech, NuVeda, stack, or leadership.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!open) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMessage("");
    setIsTyping(true);

    window.setTimeout(() => {
      const chunks = retrieve(userText, 4);
      const { answer: botReply } = composeAnswer(userText, chunks);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md h-full bg-story-panel border-l border-[#f2ebe3]/10 p-6 flex flex-col shadow-2xl animate-slideInRight">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <IconBot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-serif text-[#f2ebe3]">Career RAG agent</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE · SITE KNOWLEDGE</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#f2ebe3]/70"
            aria-label="Close agent"
          >
            <IconX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((m, idx) => (
            <div
              key={`${idx}-${m.sender}`}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                  m.sender === "user"
                    ? "bg-amber-500/20 border border-amber-500/30 text-amber-200 rounded-br-none"
                    : "bg-white/5 border border-white/10 text-[#f2ebe3]/90 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-white/5 text-xs text-amber-400 font-mono animate-pulse">
                Retrieving…
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/10 flex gap-2">
          <input
            type="text"
            placeholder="Ask about experience, stack, Bayer…"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#f2ebe3] focus:outline-none focus:border-amber-500/50 font-sans"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-medium hover:bg-amber-400 transition-colors"
            aria-label="Send"
          >
            <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerAgentDrawer;
