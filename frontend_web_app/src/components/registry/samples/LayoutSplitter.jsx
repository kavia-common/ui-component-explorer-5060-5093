import React, { useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * LayoutSplitter
 * Two-pane horizontal layout with a draggable splitter. No external libraries.
 */
export default function LayoutSplitter({
  left,
  right,
  initial = 40, // percentage
  minLeft = 20,
  minRight = 20,
  className = "",
  height = "320px",
}) {
  const containerRef = useRef(null);
  const [leftPct, setLeftPct] = useState(initial);
  const dragging = useRef(false);

  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.userSelect = "none";
  };
  const onMouseUp = () => {
    dragging.current = false;
    document.body.style.userSelect = "";
  };
  const onMouseMove = (e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    const clamped = Math.min(100 - minRight, Math.max(minLeft, pct));
    setLeftPct(clamped);
  };

  React.useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 ${className}`}
      style={{ height }}
    >
      <div className="flex h-full w-full">
        <div
          className="h-full overflow-auto p-4 custom-scrollbar"
          style={{ width: `${leftPct}%` }}
        >
          {left}
        </div>
        <div
          role="separator"
          aria-orientation="vertical"
          className="group relative flex w-1 cursor-col-resize items-stretch bg-gray-200 transition-colors hover:bg-blue-400 dark:bg-gray-700 dark:hover:bg-blue-500"
          onMouseDown={onMouseDown}
          title="Drag to resize"
        >
          <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none rounded bg-gray-800 px-2 py-0.5 text-xs text-white group-hover:block">
            Drag
          </span>
        </div>
        <div className="h-full flex-1 overflow-auto p-4 custom-scrollbar">
          {right}
        </div>
      </div>
    </div>
  );
}
