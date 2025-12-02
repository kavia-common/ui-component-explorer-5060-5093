import React, { useState, useRef, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * Dropdown - button-triggered menu
 */
export function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Actions
        <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.25 7.5l4.5 4.5 4.5-4.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {['Edit','Duplicate','Archive'].map((it) => (
            <button key={it} className="block w-full rounded px-2 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/40">
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ContextMenu - right-click menu example
 */
export function ContextMenu() {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    const close = () => setPos(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
      className="flex h-28 w-full max-w-md items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-slate-600 dark:border-gray-700 dark:text-slate-300"
    >
      Right-click inside this box
      {pos && (
        <div
          style={{ left: pos.x, top: pos.y, position: 'fixed' }}
          className="z-20 mt-1 w-40 rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          role="menu"
        >
          {['Open','Rename','Delete'].map((it) => (
            <button key={it} className="block w-full rounded px-2 py-1.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/40">
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Offcanvas - drawer from right
 */
export function Offcanvas() {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
      <button
        className="m-3 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </button>
      <div
        className={
          'absolute right-0 top-0 h-full w-64 transform bg-white p-4 shadow-xl transition-transform dark:bg-gray-800 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <div className="font-medium text-slate-800 dark:text-slate-100">Drawer</div>
          <button
            className="rounded px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700/40"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Place navigation or settings here.</p>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Popover - small anchored card
 */
export function Popover() {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Show Popover
      </button>
      {open && (
        <div className="absolute left-1/2 z-10 mt-2 w-56 -translate-x-1/2 rounded-md border border-gray-200 bg-white p-3 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="font-medium text-slate-800 dark:text-slate-100">Popover title</div>
          <p className="mt-1 text-slate-700 dark:text-slate-200">Small rich content anchored to a trigger.</p>
        </div>
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Tooltip - simple title hint
 */
export function Tooltip() {
  const [open, setOpen] = useState(false);
  return (
    <div className="inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        aria-describedby="tip-1"
      >
        Hover me
      </button>
      {open && (
        <div
          id="tip-1"
          role="tooltip"
          className="mt-1 w-max rounded bg-slate-900 px-2 py-1 text-xs text-white"
        >
          Tooltip text
        </div>
      )}
    </div>
  );
}
