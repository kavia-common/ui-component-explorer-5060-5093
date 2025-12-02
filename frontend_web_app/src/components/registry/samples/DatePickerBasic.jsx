import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * DatePickerBasic - minimal date input with optional calendar helper.
 * Notes:
 * - For a richer calendar UI, you can dynamically import react-day-picker at runtime.
 *   npm i react-day-picker
 * - This sample uses a pure HTML date input by default to avoid external deps.
 * Props:
 * - value?: string (yyyy-mm-dd)
 * - onChange?: (value: string) => void
 */
function DatePickerBasic({ value = '', onChange }) {
  const [val, setVal] = useState(value);
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  const handle = (e) => {
    const next = e.target.value;
    setVal(next);
    onChange?.(next);
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <input
        type="date"
        value={val}
        onChange={handle}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Tip: For a calendar UI, install react-day-picker and dynamically import it on demand.
      </div>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-gray-50 focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
        onClick={async () => {
          try {
            // Dynamic import at runtime so bundler won't require the package if it's not installed.
            // eslint-disable-next-line no-unused-vars
            const mod = await import(/* webpackIgnore: true */ 'react-day-picker').catch(() => null);
            setCalendarLoaded(Boolean(mod));
          } catch {
            setCalendarLoaded(false);
          }
        }}
      >
        Try load calendar (if installed)
      </button>
      {calendarLoaded ? (
        <div className="rounded-md border border-dashed border-gray-300 p-2 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
          Calendar module detected. Integrate <code>DayPicker</code> where needed.
        </div>
      ) : null}
    </div>
  );
}

export default DatePickerBasic;
