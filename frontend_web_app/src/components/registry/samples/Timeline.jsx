import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Timeline - vertical events with dots and connectors.
 */
function Timeline({ items = [] }) {
  return (
    <ol className="relative space-y-6 border-l border-gray-200 pl-4 dark:border-gray-800">
      {items.map((it, i) => (
        <li key={i} className="space-y-1">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" aria-hidden />
          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{it.title}</div>
          {it.date ? <div className="text-xs text-slate-600 dark:text-slate-300">{it.date}</div> : null}
        </li>
      ))}
    </ol>
  );
}

export default Timeline;
