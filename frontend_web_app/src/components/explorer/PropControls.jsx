import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PropControls - Placeholder panel for controlling live preview props.
 * Props:
 * - controls?: Array<{ label: string, type: 'text'|'select', options?: string[], value?: any }>
 * - onChange?: (index: number, value: any) => void
 */
function PropControls({ controls = [], onChange }) {
  if (!controls.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
        No interactive props available for this component.
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
      <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Props</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {controls.map((c, idx) => (
          <label key={idx} className="text-sm">
            <div className="mb-1 text-gray-700 dark:text-gray-300">{c.label}</div>
            {c.type === 'select' ? (
              <select
                value={c.value}
                onChange={(e) => onChange?.(idx, e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
              >
                {(c.options || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={c.value}
                onChange={(e) => onChange?.(idx, e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-2 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PropControls;
