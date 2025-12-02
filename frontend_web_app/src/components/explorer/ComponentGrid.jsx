import React from 'react';
import ComponentCard from './ComponentCard';

/**
 * PUBLIC_INTERFACE
 * ComponentGrid - Responsive grid of ComponentCard.
 * Props:
 * - items: array of component objects
 * - empty?: ReactNode (fallback when empty)
 */
function ComponentGrid({ items = [], empty = null }) {
  if (!items.length) return empty;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <ComponentCard key={it.id} item={it} />
      ))}
    </div>
  );
}

export default ComponentGrid;
