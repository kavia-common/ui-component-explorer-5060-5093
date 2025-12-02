import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar is a presentational search input.
 * Props:
 * - placeholder?: string
 * - compact?: boolean (renders a smaller control)
 */
function SearchBar({ placeholder = 'Search…', compact = false }) {
  return (
    <div className={`w-full ${compact ? 'max-w-[180px]' : 'max-w-xl'}`}>
      <label className="sr-only" htmlFor="global-search">Search</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <input
          id="global-search"
          type="search"
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-200 bg-white pl-10 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-900/30 ${compact ? 'py-1.5 text-sm' : 'py-2.5'}`}
        />
      </div>
    </div>
  );
}

export default SearchBar;
