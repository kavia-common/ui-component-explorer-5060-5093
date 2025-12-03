import React from 'react';
import registry from '../components/registry';
// Note: Preview rendering is driven by the exact snippet string provided by data consumers.
// This module intentionally does not attempt to generate or merge fallback snippets to avoid duplication.

/**
 * PUBLIC_INTERFACE
 * getPreviewEntry - returns the registry entry for a given component id.
 * If not found, returns undefined.
 */
export function getPreviewEntry(id) {
  if (!id) return undefined;
  return registry[id];
}

/**
 * PUBLIC_INTERFACE
 * getPreviewComponent - returns a React component reference for a given id.
 * Falls back to a simple placeholder component if not found.
 */
export function getPreviewComponent(id) {
  const entry = getPreviewEntry(id);
  if (entry?.component) return entry.component;
  return function Fallback() {
    return (
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Unable to render preview for id: <span className="font-mono">{id || '(missing id)'}</span>
      </div>
    );
  };
}

/**
 * PUBLIC_INTERFACE
 * getPreviewProps - returns previewProps for the id if present, otherwise defaultProps, otherwise empty object.
 */
export function getPreviewProps(id) {
  const entry = getPreviewEntry(id);
  if (!entry) return {};
  return entry.previewProps || entry.defaultProps || {};
}
