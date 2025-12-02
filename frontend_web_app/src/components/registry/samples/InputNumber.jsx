import React, { useId, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * InputNumber - numeric input with increment/decrement buttons
 * Props:
 * - label?: string
 * - min?: number
 * - max?: number
 * - step?: number
 * - defaultValue?: number
 * - onChange?: (value: number) => void
 */
function InputNumber({ label = 'Quantity', min = 0, max = 100, step = 1, defaultValue = 1, onChange }) {
  const id = useId();
  const [val, setVal] = useState(defaultValue);

  const clamp = (n) => Math.max(min, Math.min(max, n));

  const set = (n) => {
    const v = clamp(n);
    setVal(v);
    onChange?.(v);
  };

  return (
    <div className="w-full max-w-xs">
      {label ? (
        <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">
          {label}
        </label>
      ) : null}
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => set(val - step)}
          className="rounded-l-md border border-r-0 border-gray-300 bg-white px-3 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/40"
          aria-label="Decrement"
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={val}
          min={min}
          max={max}
          step={step}
          onChange={(e) => set(Number(e.target.value || 0))}
          className="w-full border-y border-gray-300 px-3 py-2 text-center text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={() => set(val + step)}
          className="rounded-r-md border border-l-0 border-gray-300 bg-white px-3 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/40"
          aria-label="Increment"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default InputNumber;
