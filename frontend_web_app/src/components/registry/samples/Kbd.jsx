import React from "react";

/**
 * PUBLIC_INTERFACE
 * KbdSample
 * Displays examples of keyboard key badges for shortcuts.
 */
export default function KbdSample() {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Single keys</div>
      <div className="flex flex-wrap items-center gap-2">
        <KBD>Esc</KBD>
        <KBD>Tab</KBD>
        <KBD>Enter</KBD>
        <KBD>⌘</KBD>
        <KBD>Ctrl</KBD>
        <KBD>Alt</KBD>
        <KBD>Shift</KBD>
      </div>

      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Combinations</div>
      <div className="flex flex-wrap items-center gap-2">
        <KBD>Ctrl</KBD>
        <span className="text-slate-500 dark:text-slate-400">+</span>
        <KBD>K</KBD>
        <span className="text-slate-500 dark:text-slate-400">Open command palette</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <KBD>⌘</KBD>
        <span className="text-slate-500 dark:text-slate-400">+</span>
        <KBD>S</KBD>
        <span className="text-slate-500 dark:text-slate-400">Save</span>
      </div>

      <div className="rounded-md border border-gray-200 bg-white p-3 text-xs text-slate-600 dark:border-gray-800 dark:bg-gray-800 dark:text-slate-300">
        Tip: Use semantic kbd elements for accessibility. Combine with screenreader-friendly labels when needed.
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * KBD
 * Keyboard key UI element used in KbdSample.
 */
export function KBD({ children }) {
  return (
    <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      {children}
    </kbd>
  );
}
