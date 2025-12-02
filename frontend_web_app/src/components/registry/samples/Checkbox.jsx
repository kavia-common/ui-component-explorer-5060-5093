import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Checkbox - styled checkbox with label
 * Props:
 * - label?: string
 * - defaultChecked?: boolean
 */
function Checkbox({ label = 'Subscribe to newsletter', defaultChecked = true }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex w-full max-w-md cursor-pointer select-none items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800"
      />
      <span className="text-slate-800 dark:text-slate-200">{label}</span>
    </label>
  );
}

export default Checkbox;
