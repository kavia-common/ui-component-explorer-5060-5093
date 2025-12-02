import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Ratings - star display with half support (read-only).
 */
function Ratings({ value = 3.5, outOf = 5 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = outOf - full - (half ? 1 : 0);

  const Star = ({ fill = 'currentColor' }) => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill={fill} className="inline-block">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} />
      ))}
      {half ? (
        <div className="relative">
          <Star fill="#F59E0B" />
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <Star fill="#E5E7EB" />
          </div>
        </div>
      ) : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} fill="#E5E7EB" />
      ))}
      <span className="ml-1 text-xs text-slate-600 dark:text-slate-300">{value.toFixed(1)}</span>
    </div>
  );
}

export default Ratings;
