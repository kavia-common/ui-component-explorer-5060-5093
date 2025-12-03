import React from 'react';
import sample from './data/components.sample.json';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** Root component for the UI Component Explorer demo.
   *  Shows basic functionality: reads from local JSON and env variables.
   */
  const apiBase = (import.meta as any).env?.REACT_APP_API_BASE ?? '';
  const nodeEnv = (import.meta as any).env?.REACT_APP_NODE_ENV ?? '';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-4 shadow bg-white">
        <h1 className="text-xl font-semibold">UI Component Explorer</h1>
        <p className="text-sm text-gray-600">Environment: {String(nodeEnv)}</p>
        <p className="text-sm text-gray-600">API Base: {String(apiBase)}</p>
      </header>
      <main className="p-4">
        <h2 className="font-medium mb-2">Sample components from local JSON:</h2>
        <ul className="list-disc pl-6 space-y-1">
          {sample.components.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> — {c.category}
            </li>
          ))}
        </ul>
      </main>
      <footer className="p-4 text-xs text-gray-500">Running on 0.0.0.0:3000 via Vite</footer>
    </div>
  );
}
