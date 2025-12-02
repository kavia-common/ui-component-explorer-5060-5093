import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PreviewCanvas - Container for component live preview area.
 * Props:
 * - height?: number
 * - children?: ReactNode (for future dynamic previews)
 * - note?: string (footnote or helper)
 */
function PreviewCanvas({ height = 140, children, note }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
      <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Live Preview</div>
      <div
        className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40"
        style={{ minHeight: `${height}px` }}
      >
        {children || (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Preview area (static placeholder)
          </span>
        )}
      </div>
      {note && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{note}</div>}
    </div>
  );
}

export default PreviewCanvas;
