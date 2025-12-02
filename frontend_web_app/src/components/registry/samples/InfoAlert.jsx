import React from 'react';

/**
 * PUBLIC_INTERFACE
 * InfoAlert - informational callout with icon
 * Props:
 * - title?: string
 * - message?: string
 */
function InfoAlert({ title = 'Heads up', message = 'This is an informational alert.' }) {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-sm text-blue-800 shadow-sm dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-200">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm ring-2 ring-blue-300/40 dark:ring-blue-800/50">i</span>
        <div>
          {title ? <div className="font-semibold">{title}</div> : null}
          {message ? <div className="mt-0.5 text-blue-800/90 dark:text-blue-200/90">{message}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default InfoAlert;
