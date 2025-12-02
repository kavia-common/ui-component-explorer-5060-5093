import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ContactForm - simple layout with name, email, message
 * Props:
 * - onSubmit?: (payload) => void
 */
function ContactForm({ onSubmit }) {
  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ ok: true });
  };
  return (
    <form onSubmit={submit} className="w-full max-w-xl space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Your name" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">Message</label>
        <textarea rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="How can we help?" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition bg-main-gradient hover:brightness-105 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800">
          Send
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
