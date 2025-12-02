import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Toasts - Tailwind-only toast stack with simple state.
 */
function Toasts() {
  const [items, setItems] = useState([{ id: 1, text: 'Saved successfully' }]);
  const add = () => setItems((arr) => [...arr, { id: Date.now(), text: 'Notification' }]);
  const remove = (id) => setItems((arr) => arr.filter((t) => t.id !== id));
  return (
    <div className="relative h-40 w-full">
      <button
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white shadow hover:bg-blue-700"
        onClick={add}
      >
        Show toast
      </button>
      <div className="pointer-events-none absolute right-3 top-3 flex w-72 flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start justify-between gap-3 rounded-md border border-gray-200 bg-white p-3 shadow dark:border-gray-800 dark:bg-gray-800"
          >
            <div className="text-sm text-slate-800 dark:text-slate-200">{t.text}</div>
            <button
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
              onClick={() => remove(t.id)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toasts;
