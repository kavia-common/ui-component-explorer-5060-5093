import React from "react";

/**
 * PUBLIC_INTERFACE
 * Links
 * Accessible link styles demonstrating Ocean palette, hover/opacity/underline utilities, and focus visibility.
 */
export default function Links() {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-200">
        Inline link{" "}
        <a
          href="#"
          className="font-medium text-[#2563EB] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-blue-400 dark:focus:ring-blue-800"
        >
          Learn more
        </a>
      </p>

      {/* Opacity hover */}
      <div className="space-x-4 text-sm">
        <a
          href="#"
          className="text-[#2563EB] opacity-90 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Primary
        </a>
        <a
          href="#"
          className="text-[#F59E0B] opacity-90 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-800"
        >
          Secondary
        </a>
        <a
          href="#"
          className="text-[#EF4444] opacity-90 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
        >
          Error
        </a>
      </div>

      {/* Underline color utilities */}
      <div className="space-x-4 text-sm">
        <a
          href="#"
          className="underline decoration-[#2563EB] underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Primary
        </a>
        <a
          href="#"
          className="underline decoration-[#F59E0B] underline-offset-4 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-800"
        >
          Secondary
        </a>
        <a
          href="#"
          className="underline decoration-[#EF4444] underline-offset-4 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800"
        >
          Error
        </a>
      </div>

      {/* Button-like links */}
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-md border border-transparent bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Primary Action
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-blue-800"
      >
        Secondary
      </a>
    </div>
  );
}
