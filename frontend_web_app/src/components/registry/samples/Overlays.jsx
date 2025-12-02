import React, { useEffect, useRef, useState } from 'react';

/**
 * Overlays & Menus: Dropdown, ContextMenu, Offcanvas (Drawer), Popover, Tooltip
 * Tailwind-first, accessible interactions where applicable.
 */

// PUBLIC_INTERFACE
export function Dropdown() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        type="button"
        className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Actions
        <svg className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Actions"
          className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-md border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800"
        >
          {['Edit', 'Duplicate', 'Archive'].map((item) => (
            <button
              key={item}
              role="menuitem"
              className="block w-full rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50"
              onClick={() => setOpen(false)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onGlobal() {
      if (open) setOpen(false);
    }
    document.addEventListener('click', onGlobal);
    return () => document.removeEventListener('click', onGlobal);
  }, [open]);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div className="relative">
      <div
        className="rounded-md border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300"
        onContextMenu={(e) => {
          e.preventDefault();
          setPos({ x: e.clientX, y: e.clientY });
          setOpen(true);
        }}
        role="button"
        tabIndex={0}
        aria-label="Context menu target. Right-click or use Shift+F10."
        onKeyDown={(e) => {
          if ((e.shiftKey && e.key === 'F10') || e.key === 'ContextMenu') {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            setOpen(true);
          }
        }}
      >
        Right-click here to open a custom context menu
      </div>

      {open && (
        <div
          className="fixed z-30 w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800"
          style={{ top: pos.y, left: pos.x }}
        >
          {['Open', 'Rename', 'Delete'].map((item) => (
            <button
              key={item}
              className="block w-full rounded px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/50"
              onClick={() => setOpen(false)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
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
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Drawer
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/40 transition-opacity"
        />
      )}

      {/* Panel */}
      <aside
        aria-label="Drawer Panel"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-40 w-80 transform bg-white shadow-xl transition-transform dark:bg-slate-800 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">Panel</h3>
          <button
            onClick={close}
            className="rounded p-1 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 dark:hover:bg-slate-700/60"
            aria-label="Close Drawer"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-sm text-slate-700 dark:text-slate-200">
          Use this area for settings, filters, or secondary content.
        </div>
      </aside>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Popover() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!open) return;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        popRef.current &&
        !popRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        Toggle Popover
      </button>
      {open && (
        <div
          ref={popRef}
          role="dialog"
          aria-label="Popover"
          className="absolute left-1/2 z-20 mt-2 w-64 -translate-x-1/2 rounded-md border border-slate-200 bg-white p-3 text-sm shadow-lg ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          Helpful information appears in this small card.
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Tooltip() {
  const [show, setShow] = useState(false);
  const id = 'tooltip-1';
  return (
    <div className="relative inline-block">
      <button
        aria-describedby={show ? id : undefined}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        Hover or focus me
      </button>
      {show && (
        <div
          role="tooltip"
          id={id}
          className="absolute left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white shadow-lg"
        >
          Tooltip content
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
        </div>
      )}
    </div>
  );
}

export default {
  Dropdown,
  ContextMenu,
  Offcanvas,
  Popover,
  Tooltip,
};
