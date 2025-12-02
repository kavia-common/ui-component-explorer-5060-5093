import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Skeleton - animated gray bars/blocks.
 */
function Skeleton({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700 motion-reduce:animate-none"
        />
      ))}
      <div className="mt-3 h-20 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700 motion-reduce:animate-none" />
    </div>
  );
}

export default Skeleton;
