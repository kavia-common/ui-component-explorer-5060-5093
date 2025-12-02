import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Lists - bulleted and numbered lists plus icons.
 */
export function Lists() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ul className="list-disc space-y-1 pl-5">
        <li>Semantic HTML</li>
        <li>Accessible colors</li>
        <li>Responsive spacing</li>
      </ul>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Install Tailwind</li>
        <li>Configure theme</li>
        <li>Build components</li>
      </ol>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ListGroup - bordered stacked list items.
 */
export function ListGroup({ items = [] }) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-md border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      {items.map((it, i) => (
        <button
          key={i}
          className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800/60"
          role="listitem"
        >
          <span className="text-sm text-slate-800 dark:text-slate-200">{it.title}</span>
          <span className="text-xs text-blue-600 dark:text-blue-400">›</span>
        </button>
      ))}
    </div>
  );
}

export default Lists;
