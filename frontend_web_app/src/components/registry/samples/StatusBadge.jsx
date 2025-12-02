import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StatusBadge - badge for statuses/tags
 * Props:
 * - text: string
 * - color?: 'blue'|'amber'|'gray'
 */
function StatusBadge({ text = 'New', color = 'gray' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-900/40',
    amber: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-900/40',
    gray: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${colorMap[color]}`}>
      {text}
    </span>
  );
}

export default StatusBadge;
