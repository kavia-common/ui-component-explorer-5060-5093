import React, { useEffect, useRef, useState } from 'react';

/**
 * Overlays collection: Dropdown, ContextMenu, Offcanvas (Drawer), Popover, Tooltip, Modal
 * Tailwind-first, keyboard accessible interactions.
 */

/* Utility hook to close on outside click */
function useOutsideClick(ref, onOutside) {
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onOutside?.();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutside]);
}

/* Dropdown */
export function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Actions
        <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.954a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Actions"
          className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {['Edit', 'Duplicate', 'Archive'].map((item) => (
              <li key={item}>
                <button
                  role="menuitem"
                  className="block w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* Context Menu (right-click) */
export function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onContext(e) {
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
      setOpen(true);
    }
    function onClick() {
      setOpen(false);
    }
    document.addEventListener('contextmenu', onContext);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('contextmenu', onContext);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="relative">
      <div className="rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
        Right-click anywhere to open the menu.
      </div>
      {open && (
        <div
          className="fixed z-20 w-44 rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          style={{ top: pos.y, left: pos.x }}
          role="menu"
        >
          {['Open', 'Rename', 'Delete'].map((i) => (
            <button
              key={i}
              className="block w-full rounded px-2 py-1 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Offcanvas (Drawer) */
export function Offcanvas() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Drawer
      </button>
      {/* Overlay */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={close}
        />
      )}
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-80 transform bg-white shadow-xl transition-transform dark:bg-gray-900 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Drawer panel"
      >
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Offcanvas</h2>
          <button
            onClick={close}
            aria-label="Close drawer"
            className="rounded p-2 text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-sm text-slate-700 dark:text-slate-200">
          This drawer slides from the right and closes on overlay click or Escape.
        </div>
      </aside>
    </div>
  );
}

/* Popover */
export function Popover() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100 dark:hover:bg-gray-800"
      >
        Toggle Popover
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Popover"
          className="absolute left-0 z-20 mt-2 w-64 rounded-md border border-gray-200 bg-white p-3 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100"
        >
          This is a lightweight popover anchored to the trigger.
        </div>
      )}
    </div>
  );
}

/* Tooltip */
export function Tooltip() {
  const [show, setShow] = useState(false);
  return (
    <div className="inline-block">
      <button
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        aria-describedby="tip-1"
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100 dark:hover:bg-gray-800"
      >
        Hover or focus me
      </button>
      {show && (
        <div
          id="tip-1"
          role="tooltip"
          className="mt-2 inline-block rounded bg-slate-900 px-2 py-1 text-xs text-white shadow"
        >
          Helpful hint appears here.
        </div>
      )}
    </div>
  );
}

/* Modal with basic focus trap */
export function Modal() {
  const [open, setOpen] = useState(true);
  const panelRef = useRef(null);
  const firstFocusable = useRef(null);
  const lastFocusable = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && open) {
        const focusables = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        firstFocusable.current = focusables[0];
        lastFocusable.current = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable.current) {
          e.preventDefault();
          lastFocusable.current.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable.current) {
          e.preventDefault();
          firstFocusable.current.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      // Defer focus to first focusable
      setTimeout(() => {
        const btn = panelRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]');
        btn?.focus();
      }, 0);
    }
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Modal
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={panelRef}
          className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-xl outline-none dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mb-3 flex items-start justify-between">
            <h2 id="modal-title" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Confirm action
            </h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close modal"
              className="rounded p-2 text-slate-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 dark:hover:bg-gray-800"
            >
              ✕
            </button>
          </div>
          <p className="mb-4 text-sm text-slate-700 dark:text-slate-200">
            This example traps focus within the modal and closes on Escape or overlay click.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Overlays() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown />
      <Popover />
      <Tooltip />
    </div>
  );
}
