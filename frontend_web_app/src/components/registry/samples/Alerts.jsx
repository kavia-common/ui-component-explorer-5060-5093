import React from 'react';

function BaseAlert({ tone = 'info', title, message }) {
  const tones = {
    info: { ring: 'ring-blue-200 dark:ring-blue-900', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'ℹ️' },
    success: { ring: 'ring-emerald-200 dark:ring-emerald-900', bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: '✓' },
    warning: { ring: 'ring-amber-200 dark:ring-amber-900', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: '⚠️' },
    error: { ring: 'ring-red-200 dark:ring-red-900', bg: 'bg-red-50 dark:bg-red-900/20', icon: '⨯' },
  };
  const t = tones[tone] || tones.info;
  return (
    <div className={`flex items-start gap-3 rounded-md border border-transparent p-3 ring-1 ${t.ring} ${t.bg}`}>
      <div className="mt-0.5">{t.icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        {message ? <div className="text-sm opacity-80">{message}</div> : null}
      </div>
    </div>
  );
}

export default BaseAlert;
