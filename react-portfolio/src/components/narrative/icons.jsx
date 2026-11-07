import React from "react";

const base = "inline-block shrink-0";

export const IconBot = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 8V4H8" />
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M2 14h2M20 14h2M9 13v2M15 13v2" />
  </svg>
);

export const IconMenu = ({ className = "w-5 h-5" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const IconX = ({ className = "w-5 h-5" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconSparkles = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zm7 10l.8 3 3 .8-3 .8-.8 3-.8-3-3-.8 3-.8.8-3zM5 14l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2z" />
  </svg>
);

export const IconArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export const IconMessage = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </svg>
);

export const IconZap = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const IconCpu = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="5" y="5" width="14" height="14" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </svg>
);

export const IconMail = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconSend = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m22 2-10 10M22 2 11 13l-4 9 9-4 11-11z" />
  </svg>
);

export const IconCompass = ({ className = "w-4 h-4" }) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 8-4 8-2-4-4-2 8-2z" />
  </svg>
);
