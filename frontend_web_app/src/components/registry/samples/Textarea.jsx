import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Textarea - multi-line text control
 * Props:
 * - label?: string
 * - rows?: number
 * - placeholder?: string
 * - helper?: string
 */
function Textarea({ label = 'Message', rows = 4, placeholder = 'Write your message...', helper = 'Max 500 characters' }) {
  return (
    <div className="w-full max-w-xl">
      {label ? <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label> : null}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      {helper ? <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{helper}</div> : null}
    </div>
  );
}

export default Textarea;
