import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Spinners - a set of indeterminate loaders.
 */
function Spinners() {
  return (
    <div className="flex items-center gap-6">
      {/* Border spinner */}
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400 motion-reduce:animate-none" aria-label="Loading" />
      {/* SVG spinner */}
      <svg className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400 motion-reduce:animate-none" viewBox="0 0 24 24" aria-hidden>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z" />
      </svg>
    </div>
  );
}

export default Spinners;
