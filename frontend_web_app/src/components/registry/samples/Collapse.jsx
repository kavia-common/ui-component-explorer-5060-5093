import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Collapse - basic hide/show container with heading button.
 */
function Collapse({ title = 'Details', children = 'Hidden content here.' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-gray-800/60"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className={`transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open ? <div className="px-3 pb-3 text-sm text-slate-700 dark:text-slate-200">{children}</div> : null}
    </div>
  );
}

export default Collapse;
