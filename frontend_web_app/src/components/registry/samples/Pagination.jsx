import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Pagination - simple pagination controls
 * Props:
 * - page: number
 * - totalPages: number
 */
function Pagination({ page = 1, totalPages = 5 }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-800" aria-label="Pagination">
      <button className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-blue-800" disabled={page <= 1} type="button">
        Prev
      </button>
      {pages.map((p) => {
        const active = p === page;
        return (
          <button
            key={p}
            type="button"
            className={`rounded px-2 py-1 text-sm transition focus:outline-none focus:ring-2 ${active ? 'bg-blue-600 text-white shadow focus:ring-blue-300 dark:focus:ring-blue-800' : 'text-gray-700 hover:bg-gray-100 focus:ring-blue-300 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-blue-800'}`}
          >
            {p}
          </button>
        );
      })}
      <button className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-blue-800" disabled={page >= totalPages} type="button">
        Next
      </button>
    </nav>
  );
}

export default Pagination;
