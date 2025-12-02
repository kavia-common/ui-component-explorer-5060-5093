import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ButtonGroup - Segmented control with connected corners.
 */
function ButtonGroup({ options = [], value, onChange }) {
  const [val, setVal] = useState(value || (options[0]?.value ?? ''));
  const handle = (v) => {
    setVal(v);
    onChange && onChange(v);
  };
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-gray-200 shadow-sm dark:border-gray-700">
      {options.map((o, i) => {
        const active = val === o.value;
        return (
          <button
            key={o.value}
            type="button"
            className={`px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${active ? 'bg-blue-600 text-white' : 'bg-white text-slate-800 hover:bg-gray-50 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700'} ${i !== options.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}
            aria-pressed={active}
            onClick={() => handle(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
