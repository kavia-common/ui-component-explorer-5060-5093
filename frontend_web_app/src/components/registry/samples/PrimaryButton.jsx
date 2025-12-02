import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PrimaryButton - simple button used for preview registry
 * Props:
 * - label: string
 * - onClick?: () => void
 */
function PrimaryButton({ label = 'Primary', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      {label}
    </button>
  );
}

export default PrimaryButton;
