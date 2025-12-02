import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Accordion - Accessible accordion using details/summary for semantics.
 */
function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="w-full divide-y divide-gray-200 rounded-md border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      {items.map((it, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div key={idx} className="p-0">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-800 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-100 dark:hover:bg-blue-900/20"
              aria-expanded={isOpen}
              aria-controls={`section-${idx}`}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
            >
              <span className="font-medium">{it.title}</span>
              <span className={`transition ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div
              id={`section-${idx}`}
              className={`px-4 pb-4 text-sm text-slate-700 dark:text-slate-200 ${isOpen ? 'block' : 'hidden'}`}
              role="region"
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
