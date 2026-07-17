"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    // Hide default browser scrollbars
    const style = document.createElement("style");
    style.innerHTML = `
      html {
        scrollbar-width: none !important;
      }
      html::-webkit-scrollbar {
        display: none !important;
      }
      body {
        -ms-overflow-style: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Observe body height changes
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleScrollTo = (clientY) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: ratio * totalHeight,
      behavior: "instant",
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleScrollTo(e.clientY);

    const handleMouseMove = (moveEvent) => {
      handleScrollTo(moveEvent.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className={`fixed right-0 top-0 bottom-0 w-1.5 sm:w-2 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/5 dark:hover:bg-white/10 z-[9999] cursor-pointer transition-all duration-300 ${isDragging ? "w-2.5 bg-slate-900/15 dark:bg-white/15" : ""
        }`}
      style={{ userSelect: "none" }}
    >
      {/* The progress/loading bar that grows */}
      <div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-500"
        style={{
          height: `${scrollProgress}%`,
        }}
      />
    </div>
  );
}
