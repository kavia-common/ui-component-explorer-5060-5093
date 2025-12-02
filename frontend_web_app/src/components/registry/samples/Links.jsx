import React from "react";

/**
 * PUBLIC_INTERFACE
 * Links
 * Accessible link styles: inline, subtle, and button-like.
 */
export default function Links() {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-200">
        Inline link:{" "}
        <a
          href="#"
          className="font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
        >
          Learn more
        </a>
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Primary Action
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        Secondary
      </a>
    </div>
  );
}
