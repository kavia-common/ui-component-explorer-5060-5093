import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Radio - two-option radio group
 * Props:
 * - options?: string[]
 */
function Radio({ options = ['Monthly', 'Yearly'] }) {
  const [value, setValue] = useState(options[0]);
  const name = 'radio-demo';
  return (
    <fieldset className="w-full max-w-md">
      <legend className="mb-1 text-xs font-medium text-slate-800 dark:text-slate-200">Billing</legend>
      <div className="flex gap-6">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={(e) => setValue(e.target.value)}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800"
            />
            <span className="text-slate-800 dark:text-slate-200">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default Radio;
