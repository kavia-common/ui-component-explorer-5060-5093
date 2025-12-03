import React from "react";

/**
 * PUBLIC_INTERFACE
 * Dividers
 * Colored HRs, labeled dividers, and a vertical button group with center label.
 */
export default function Dividers() {
  return (
    <div className="space-y-8">
      {/* Colored HRs */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Colored hr</p>
        <hr className="border-[#2563EB]/40" />
        <hr className="border-[#F59E0B]/40" />
        <hr className="border-[#EF4444]/40" />
      </div>

      {/* Labeled divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            Or continue
          </span>
        </div>
      </div>

      {/* Vertical button group with label */}
      <div className="inline-flex flex-col items-stretch rounded-md border bg-white p-2 text-sm dark:border-gray-800 dark:bg-gray-900">
        <button className="rounded-md px-3 py-1.5 text-[#111827] hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800" aria-label="Move up">
          Move up
        </button>
        <div className="my-1 flex items-center">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="mx-2 text-xs text-slate-500">Arrange</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>
        <button className="rounded-md px-3 py-1.5 text-[#111827] hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-gray-800" aria-label="Move down">
          Move down
        </button>
      </div>
    </div>
  );
}
