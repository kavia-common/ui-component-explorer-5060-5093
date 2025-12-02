import React, { useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Carousel - Tailwind-only scroll-snap carousel.
 */
function Carousel() {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <div className="absolute left-1 top-1/2 z-10 -translate-y-1/2">
        <button className="rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-200 hover:bg-white dark:bg-gray-800/80 dark:ring-gray-700" onClick={() => scrollBy(-1)} aria-label="Previous">‹</button>
      </div>
      <div className="absolute right-1 top-1/2 z-10 -translate-y-1/2">
        <button className="rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-200 hover:bg-white dark:bg-gray-800/80 dark:ring-gray-700" onClick={() => scrollBy(1)} aria-label="Next">›</button>
      </div>
      <div ref={ref} className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-md border border-gray-200 p-3 dark:border-gray-800">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-28 w-56 shrink-0 snap-start rounded-md bg-gradient-to-br from-blue-500/10 to-gray-50 ring-1 ring-gray-200 dark:from-blue-700/20 dark:to-gray-900 dark:ring-gray-800" />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
