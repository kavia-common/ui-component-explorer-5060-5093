import React, { useState, useId } from 'react';

/**
 * PUBLIC_INTERFACE
 * StrongPassword - password field with live strength indicator (basic heuristic)
 * Props: label?: string, placeholder?: string
 */
export function StrongPassword({ label = 'Password', placeholder = 'Enter a strong password' }) {
  const id = useId();
  const [val, setVal] = useState('');
  const score = getScore(val);
  const colors = ['bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-600'];
  const labels = ['Very weak', 'Weak', 'Okay', 'Good', 'Strong'];

  return (
    <div className="w-full max-w-sm">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label>
      <input
        id={id}
        type="password"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        aria-describedby={`${id}-strength`}
      />
      <div className="mt-2">
        <div className="mb-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div className={`h-1.5 rounded-full ${colors[score]}`} style={{ width: `${((score + 1) / 5) * 100}%` }} />
        </div>
        <div id={`${id}-strength`} className="text-xs text-slate-600 dark:text-slate-300">{labels[score]}</div>
      </div>
    </div>
  );
}

function getScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (pw.length >= 12) s++;
  return Math.min(s, 4);
}

/**
 * PUBLIC_INTERFACE
 * TogglePassword - password input with show/hide toggle
 * Props: label?: string
 */
export function TogglePassword({ label = 'Password' }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const [val, setVal] = useState('');
  return (
    <div className="w-full max-w-sm">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-slate-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-gray-700/40"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}
