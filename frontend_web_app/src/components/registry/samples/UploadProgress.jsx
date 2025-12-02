import React from 'react';

/**
 * PUBLIC_INTERFACE
 * UploadProgress - file uploading row with progress
 */
function UploadProgress({ filename = 'file.png', percent = 42 }) {
  const v = Math.max(0, Math.min(100, percent));
  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-200 p-3 dark:border-gray-800">
      <div className="h-10 w-10 flex-none rounded bg-gray-200 dark:bg-gray-700" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{filename}</div>
        <div className="mt-1 h-1.5 w-full rounded bg-gray-200 dark:bg-gray-700">
          <div className="h-1.5 rounded bg-blue-600 transition-[width] dark:bg-blue-500" style={{ width: `${v}%` }} />
        </div>
      </div>
      <div className="text-xs tabular-nums text-slate-600 dark:text-slate-300">{v}%</div>
    </div>
  );
}

export default UploadProgress;
