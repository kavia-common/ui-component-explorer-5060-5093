import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Input - basic text input with label and helper text
 * Props:
 * - label?: string
 * - placeholder?: string
 * - helper?: string
 * - value?: string
 * - onChange?: (value: string) => void
 */
function Input({ label = 'Label', placeholder = 'Type here', helper = 'Helper text', value = '', onChange }) {
  return (
    <div className="w-full max-w-md">
      {label ? (
        <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label>
      ) : null}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      {helper ? (
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{helper}</div>
      ) : null}
    </div>
  );
}

export default Input;
