import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ColorPickerTailwind - native color input styled with Tailwind
 * Props:
 * - defaultValue?: string
 */
function ColorPickerTailwind({ defaultValue = '#2563EB' }) {
  return (
    <div className="w-full max-w-sm">
      <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">Pick color</label>
      <input
        type="color"
        defaultValue={defaultValue}
        className="h-9 w-12 cursor-pointer rounded-md border border-gray-300 bg-white p-0 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800"
        aria-label="Pick color"
      />
    </div>
  );
}
export default ColorPickerTailwind;
