import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBox - input with search and clear actions
 * Props:
 * - placeholder?: string
 * - onSearch?: (value: string) => void
 */
function SearchBox({ placeholder = 'Search...', onSearch }) {
  const [q, setQ] = useState('');
  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <div className="relative grow">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.9 14.32a7 7 0 111.414-1.414l3.39 3.39a1 1 0 01-1.415 1.414l-3.39-3.39zM14 9a5 5 0 11-10 0 5 5 0 0110 0z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      <button
        onClick={() => onSearch?.(q)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
      {q && (
        <button
          onClick={() => setQ('')}
          className="rounded-md border border-gray-300 px-2 py-2 text-sm text-slate-700 hover:bg-gray-50 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-700/40"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBox;
