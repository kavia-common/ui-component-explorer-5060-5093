import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TopNavigation - simple top nav bar for previews
 * Props:
 * - brand?: string
 * - links?: Array<{ label: string, href?: string }>
 */
function TopNavigation({ brand = 'Brand', links = [] }) {
  return (
    <header className="flex w-full max-w-2xl items-center justify-between border-b border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <span className="inline-block h-5 w-5 rounded bg-main-gradient ring-1 ring-black/5" aria-hidden="true" />
        <span className="font-semibold text-gray-900 dark:text-white">{brand}</span>
      </div>
      <nav className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
        {links.map((l, idx) => (
          <a key={idx} className="hover:text-blue-600 dark:hover:text-blue-400" href={l.href || '#'} onClick={(e) => e.preventDefault()}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default TopNavigation;
