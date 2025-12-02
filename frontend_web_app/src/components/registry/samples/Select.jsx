import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Select - basic dropdown select
 * Props:
 * - label?: string
 * - options?: string[]
 */
function Select({ label = 'Country', options = ['United States', 'Canada', 'United Kingdom'] }) {
  return (
    <div className="w-full max-w-xs">
      {label ? <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label> : null}
      <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
