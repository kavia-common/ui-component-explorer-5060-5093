import React from 'react';

/**
 * PUBLIC_INTERFACE
 * DevicesMockup - simple phone and laptop mock frames.
 */
function DevicesMockup() {
  return (
    <div className="flex items-end gap-6">
      {/* Phone */}
      <div className="relative h-40 w-20 rounded-3xl border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-gray-300 px-3 py-0.5 text-[8px] text-gray-600 dark:bg-gray-600 dark:text-gray-200">
          • • •
        </div>
        <div className="m-2 h-[136px] rounded-2xl bg-gray-100 dark:bg-gray-800" />
      </div>
      {/* Laptop */}
      <div className="relative h-32 w-56 rounded-lg border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="m-2 h-24 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="absolute left-1/2 top-full h-2 w-64 -translate-x-1/2 rounded-b-lg bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default DevicesMockup;
