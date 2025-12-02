import React from "react";

/**
 * PUBLIC_INTERFACE
 * CustomScrollbar
 * Demonstrates a scrollable container with styled scrollbars.
 */
export default function CustomScrollbar() {
  return (
    <div className="h-48 overflow-auto rounded-md border border-gray-200 p-4 custom-scrollbar dark:border-gray-800">
      <div className="space-y-3">
        {[...Array(20)].map((_, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-200">
            Scroll line {i + 1}: Tailwind-based custom scrollbar.
          </p>
        ))}
      </div>
    </div>
  );
}
