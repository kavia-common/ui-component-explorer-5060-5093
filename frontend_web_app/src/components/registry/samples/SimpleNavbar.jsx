import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SimpleNavbar - brand with inline links
 * Props:
 * - brand?: string
 * - links?: Array<{ label: string }>
 */
function SimpleNavbar({ brand = 'Ocean', links = [{ label: 'Home' }, { label: 'Components' }, { label: 'About' }] }) {
  return (
    <header className="w-full max-w-3xl rounded-md border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-main-gradient shadow-sm ring-1 ring-black/5" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{brand}</span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
          {links.map((l, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-blue-600 dark:hover:text-blue-400">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default SimpleNavbar;
