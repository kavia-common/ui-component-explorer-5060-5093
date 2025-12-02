import React, { useId, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * AdvancedSelect - searchable select with keyboard navigation (Tailwind-only)
 * Props:
 * - label?: string
 * - options: { value: string, label: string }[]
 * - placeholder?: string
 * - onChange?: (value: string) => void
 */
function AdvancedSelect({
  label = 'Select option',
  options = [
    { value: 'alpha', label: 'Alpha' },
    { value: 'beta', label: 'Beta' },
    { value: 'gamma', label: 'Gamma' },
  ],
  placeholder = 'Search...',
  onChange,
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(options[0]?.value ?? '');

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const select = (idx) => {
    const opt = filtered[idx];
    if (!opt) return;
    setValue(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      setActive((p) => Math.min(p + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setActive((p) => Math.max(p - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter') {
      select(active);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }
  };

  const selectedLabel =
    options.find((o) => o.value === value)?.label || 'Select...';

  return (
    <div className="w-full max-w-sm">
      {label ? (
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          onKeyDown={onKeyDown}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <span>{selectedLabel}</span>
          <svg
            className="h-4 w-4 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && (
          <div
            className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            role="listbox"
            aria-labelledby={id}
          >
            <div className="border-b border-gray-200 p-2 dark:border-gray-700">
              <input
                autoFocus
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <ul className="max-h-48 overflow-auto p-1">
              {filtered.length === 0 ? (
                <li className="px-2 py-2 text-sm text-slate-500 dark:text-slate-300">
                  No results
                </li>
              ) : (
                filtered.map((o, idx) => (
                  <li
                    key={o.value}
                    role="option"
                    aria-selected={o.value === value}
                    onMouseEnter={() => setActive(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      select(idx);
                    }}
                    className={
                      'flex cursor-pointer items-center justify-between rounded px-2 py-1.5 text-sm ' +
                      (idx === active
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                        : 'text-slate-800 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-gray-700/30')
                    }
                  >
                    <span>{o.label}</span>
                    {o.value === value ? (
                      <svg
                        className="h-4 w-4 text-blue-600 dark:text-blue-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.42l-6.59 6.54-3.004-3a1 1 0 10-1.412 1.418l3.708 3.704a1 1 0 001.412 0l7.294-7.242z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedSelect;
