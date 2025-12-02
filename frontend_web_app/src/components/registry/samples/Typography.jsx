import React from "react";

/**
 * PUBLIC_INTERFACE
 * Typography
 * Common text styles: headings, paragraphs, lead, muted, code, and kbd.
 */
export default function Typography() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Heading 1
        </h1>
        <p className="text-gray-500">Use for page titles</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Heading 2</h2>
        <p className="text-gray-500">Section titles</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Heading 3</h3>
        <p className="text-gray-500">Subsections</p>
      </div>
      <p className="text-gray-700 dark:text-gray-200">
        This is a normal paragraph. It supports{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          inline code
        </code>{" "}
        and <strong>bold</strong> text.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Lead text is larger and more relaxed for intros.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Muted text for hints.</p>
      <div className="space-x-2">
        <KBD>Ctrl</KBD>
        <span className="text-gray-500">+</span>
        <KBD>K</KBD>
        <span className="text-gray-500">to open search</span>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * KBD
 * Keyboard key UI element.
 */
export function KBD({ children }) {
  return (
    <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      {children}
    </kbd>
  );
}
