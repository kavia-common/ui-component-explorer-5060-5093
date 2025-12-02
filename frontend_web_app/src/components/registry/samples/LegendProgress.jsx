import React from 'react';

/**
 * PUBLIC_INTERFACE
 * LegendIndicator - dot + label
 */
export function LegendIndicator({ color = 'blue', label = 'Active' }) {
  const map = {
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    gray: 'bg-gray-400',
    red: 'bg-red-500',
    green: 'bg-emerald-500',
  };
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${map[color] || map.blue}`} aria-hidden />
      <span className="text-sm text-slate-800 dark:text-slate-200">{label}</span>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Progress - determinate progress bar
 */
export function Progress({ value = 50 }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
        className="sr-only"
        aria-live="polite"
      >{`Progress: ${v}%`}</div>
      <div
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700"
      >
        <div
          className="h-2 rounded bg-blue-600 transition-[width] dark:bg-blue-500"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
