import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SecondaryButton - neutral button for less prominent actions
 * Props:
 * - label: string
 * - onClick?: () => void
 */
function SecondaryButton({ label = 'Secondary', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
    >
      {label}
    </button>
  );
}

export default SecondaryButton;
