import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TimePicker - native time input with Tailwind styling
 * Props:
 * - label?: string
 * - defaultValue?: string (HH:MM)
 */
function TimePicker({ label = 'Select time', defaultValue = '09:30' }) {
  return (
    <div className="w-full max-w-xs">
      {label ? <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label> : null}
      <input
        type="time"
        defaultValue={defaultValue}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
}

export default TimePicker;
