import React from 'react';

/**
 * PUBLIC_INTERFACE
 * BasicCard - simple card layout for previews
 * Props:
 * - title?: string
 * - children?: React.ReactNode
 */
function BasicCard({ title = 'Card Header', children = 'Card body content...' }) {
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      {title ? <div className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div> : null}
      <div className="text-sm text-slate-700 dark:text-slate-200">{children}</div>
    </div>
  );
}

export default BasicCard;
