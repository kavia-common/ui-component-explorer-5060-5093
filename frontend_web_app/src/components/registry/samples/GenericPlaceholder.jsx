import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GenericPlaceholder - Uniform placeholder for sidebar items not yet implemented.
 * Props:
 * - title: string
 * - blurb?: string
 * - icon?: ReactNode (optional icon element)
 */
function GenericPlaceholder({ title = 'Coming soon', blurb = 'Sample coming soon for this section.', icon = null }) {
  return (
    <div className="w-full max-w-xl rounded-lg border border-dashed border-gray-300 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-main-gradient text-white shadow-sm ring-1 ring-black/5">
        {icon || <span className="text-sm font-semibold">UI</span>}
      </div>
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      {blurb ? (
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{blurb}</p>
      ) : null}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        This is a placeholder preview. The full interactive component will be added soon.
      </div>
    </div>
  );
}

export default GenericPlaceholder;
