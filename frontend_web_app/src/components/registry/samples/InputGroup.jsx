import React from 'react';

/**
 * PUBLIC_INTERFACE
 * InputGroup - input with leading addon and trailing action
 * Props:
 * - label?: string
 * - addon?: string
 * - placeholder?: string
 * - button?: string
 */
function InputGroup({ label = 'Website', addon = 'https://', placeholder = 'example.com', button = 'Go' }) {
  return (
    <div className="w-full max-w-lg">
      {label ? (
        <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label>
      ) : null}
      <div className="flex">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-slate-600 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-300">
          {addon}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="min-w-0 flex-1 border-y border-gray-300 px-3 py-2 text-sm focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="button"
          className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
        >
          {button}
        </button>
      </div>
    </div>
  );
}

export default InputGroup;
