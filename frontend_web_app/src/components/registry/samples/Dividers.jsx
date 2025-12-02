import React from "react";

/**
 * PUBLIC_INTERFACE
 * Dividers
 * Horizontal rules and labeled dividers.
 */
export default function Dividers() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Simple hr</p>
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>
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
    </div>
  );
}
