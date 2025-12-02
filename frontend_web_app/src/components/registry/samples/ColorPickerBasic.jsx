import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ColorPickerBasic - minimal color input with optional advanced picker.
 * Notes:
 * - For a richer UI, install react-colorful and enable the lazy import.
 *   npm i react-colorful
 * - Ships with native <input type="color"> fallback by default.
 * Props:
 * - color?: string (#RRGGBB)
 * - onChange?: (color: string) => void
 */
function ColorPickerBasic({ color = '#2563EB', onChange }) {
  const [val, setVal] = useState(color);
  const [advancedLoaded, setAdvancedLoaded] = useState(false);

  const handle = (e) => {
    const next = e.target.value;
    setVal(next);
    onChange?.(next);
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <input
        type="color"
        value={val}
        onChange={handle}
        className="h-9 w-12 cursor-pointer rounded-md border border-gray-300 bg-white p-0 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-800"
        aria-label="Pick color"
      />
      <div className="flex-1">
        <input
          type="text"
          value={val}
          onChange={(e) => handle({ target: { value: e.target.value } })}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          aria-label="Color hex"
        />
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Tip: Install react-colorful for an advanced picker.
        </div>
        <button
          type="button"
          className="mt-2 inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-gray-50 focus-ring-main-gradient dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700"
          onClick={async () => {
            try {
              // eslint-disable-next-line no-unused-vars
              const mod = await import(/* webpackIgnore: true */ 'react-colorful').catch(() => null);
              setAdvancedLoaded(Boolean(mod && mod.HexColorPicker));
            } catch {
              setAdvancedLoaded(false);
            }
          }}
        >
          Try load advanced picker (if installed)
        </button>
        {advancedLoaded ? (
          <div className="mt-2 rounded-md border border-dashed border-gray-300 p-2 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
            Advanced picker module detected. Integrate <code>HexColorPicker</code> where needed.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ColorPickerBasic;
