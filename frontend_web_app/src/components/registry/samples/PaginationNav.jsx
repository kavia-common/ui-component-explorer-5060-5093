import React from "react";

/**
 * Pagination sample showcasing previous/next and numeric pages.
 */
const PaginationNav = ({ total = 5, current = 2 }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="inline-flex items-center gap-1" aria-label="Pagination">
      <button className="px-2.5 py-1.5 rounded-md text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={[
            "px-2.5 py-1.5 rounded-md text-sm border",
            p === current
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
          ].join(" ")}
        >
          {p}
        </button>
      ))}
      <button className="px-2.5 py-1.5 rounded-md text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
        Next
      </button>
    </nav>
  );
};

export default PaginationNav;
