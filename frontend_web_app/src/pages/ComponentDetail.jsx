import React from 'react';
import { useParams } from 'react-router-dom';
import { getComponentById } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * ComponentDetail shows a preview and code for a given component id using local data.
 */
function ComponentDetail() {
  const { id } = useParams();
  const component = getComponentById(id);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(component?.code || '');
    } catch (e) {
      // no-op fallback for environments without clipboard
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{component?.name || id}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {component?.description || 'Preview and copy code for this component.'}
          </p>
        </div>
        <button
          onClick={copyCode}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Copy Code
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <div className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Live Preview</div>
        <div
          className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40"
          style={{ minHeight: component?.previewHeight ? `${component.previewHeight}px` : '120px' }}
        >
          {/* Placeholder box for future dynamic rendering/iframe-based preview */}
          <span className="text-xs text-gray-500 dark:text-gray-400">Preview area (static for now)</span>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Code</div>
        <pre className="overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
{component?.code || `<div />`}
        </pre>
      </div>
    </div>
  );
}

export default ComponentDetail;
