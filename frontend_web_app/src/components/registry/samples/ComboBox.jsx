import React, { useId, useState, useRef, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * ComboBox - free text input with suggestion dropdown (Tailwind-only)
 * Props:
 * - label?: string
 * - options: string[]
 * - placeholder?: string
 * - onChange?: (value: string) => void
 */
function ComboBox({
  label = 'Choose or type',
  options = ['Apple', 'Banana', 'Blueberry', 'Grape', 'Orange'],
  placeholder = 'Type to search',
  onChange,
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    function onDocKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onDocKey);
    return () => document.removeEventListener('keydown', onDocKey);
  }, [open]);

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
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
      const pick = filtered[active];
      if (pick) {
        setValue(pick);
        onChange?.(pick);
        setOpen(false);
      }
      e.preventDefault();
    }
  };

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
        <input
          id={id}
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        {open && filtered.length > 0 && (
          <ul
            id={`${id}-listbox`}
            ref={listRef}
            role="listbox"
            className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {filtered.map((opt, idx) => (
              <li
                key={opt}
                role="option"
                aria-selected={idx === active}
                onMouseEnter={() => setActive(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue(opt);
                  onChange?.(opt);
                  setOpen(false);
                }}
                className={
                  'cursor-pointer rounded px-2 py-1.5 text-sm ' +
                  (idx === active
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200'
                    : 'text-slate-800 hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-gray-700/30')
                }
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ComboBox;
