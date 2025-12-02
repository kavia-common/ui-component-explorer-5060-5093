import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SuccessAlert - success callout with icon
 * Props:
 * - title?: string
 * - message?: string
 */
function SuccessAlert({ title = 'All set', message = 'Your changes have been saved.' }) {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300/40 dark:ring-emerald-800/50">✓</span>
        <div>
          {title ? <div className="font-semibold">{title}</div> : null}
          {message ? <div className="mt-0.5 text-emerald-800/90 dark:text-emerald-200/90">{message}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default SuccessAlert;
