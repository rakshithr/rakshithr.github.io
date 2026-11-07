import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Native smooth scroll on wrapper + GSAP ScrollTrigger (CRA4-safe; no Lenis ESM).
 */
export function useStoryScroll(wrapperRef, contentRef, onScroll) {
  const scrollToRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return undefined;

    const handler = () => {
      const limit = Math.max(1, content.scrollHeight - wrapper.clientHeight);
      ScrollTrigger.update();
      onScroll?.({ scroll: wrapper.scrollTop, limit });
    };

    wrapper.addEventListener("scroll", handler, { passive: true });

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length) {
          wrapper.scrollTop = value;
        }
        return wrapper.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: wrapper.clientWidth,
          height: wrapper.clientHeight,
        };
      },
    });

    ScrollTrigger.refresh();
    handler();

    scrollToRef.current = (target, { offset = -80 } = {}) => {
      if (!target) return;
      const top = target.offsetTop + offset;
      wrapper.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    return () => {
      wrapper.removeEventListener("scroll", handler);
      scrollToRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [wrapperRef, contentRef, onScroll]);

  return {
    scrollTo: (...args) => scrollToRef.current?.(...args),
  };
}
