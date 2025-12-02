import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ToggleCount - shows a count with enable/disable toggle
 * Props: initial?: number
 */
function ToggleCount({ initial = 0 }) {
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(initial);
  return (
    <div className="flex items-center gap-3">
      <button
        className={`rounded-full px-3 py-1 text-xs font-medium ${enabled ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
        onClick={() => setEnabled((e) => !e)}
        aria-pressed={enabled}
      >
        {enabled ? 'Enabled' : 'Disabled'}
      </button>
      <button
        disabled={!enabled}
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Increment
      </button>
      <div className="text-sm text-slate-800 dark:text-slate-200">Count: {count}</div>
    </div>
  );
}

export default ToggleCount;
