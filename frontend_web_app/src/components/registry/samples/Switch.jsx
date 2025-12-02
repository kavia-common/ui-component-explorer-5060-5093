import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Switch - accessible toggle styled like iOS
 * Props:
 * - label?: string
 * - defaultOn?: boolean
 */
function Switch({ label = 'Enable notifications', defaultOn = true }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className="group inline-flex items-center gap-3"
    >
      <span
        className={`h-5 w-9 rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <span
          className={`block h-5 w-5 translate-x-0 rounded-full bg-white shadow ring-1 ring-black/5 transition-transform ${on ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </span>
      <span className="text-sm text-slate-800 dark:text-slate-200">{label}</span>
    </button>
  );
}

export default Switch;
