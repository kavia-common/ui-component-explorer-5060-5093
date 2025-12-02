import React from 'react';

/**
 * PUBLIC_INTERFACE
 * BasicModal - accessible modal preview (static open)
 * Props:
 * - title?: string
 * - open?: boolean
 */
function BasicModal({ title = 'Confirm action', open = true }) {
  if (!open) return null;
  return (
    <div className="relative w-full">
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-md bg-black/30" />
      {/* Dialog */}
      <div className="relative mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Are you sure you want to proceed? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-blue-800" type="button">
            Cancel
          </button>
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800" type="button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicModal;
