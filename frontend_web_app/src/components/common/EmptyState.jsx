import React from 'react';
import Button from './Button';
import Icon from './Icon';

/**
 * PUBLIC_INTERFACE
 * EmptyState - Display when no items found.
 * Props:
 * - title: string
 * - description?: string
 * - onReset?: () => void
 */
function EmptyState({ title = 'Nothing to show', description = 'Try adjusting filters or search.', onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
        <Icon name="search" className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{description}</p>}
      {onReset && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
