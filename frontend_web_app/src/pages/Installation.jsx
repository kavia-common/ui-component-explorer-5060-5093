import React from 'react';
import Meta from '../components/common/Meta';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CodeBlock from '../components/explorer/CodeBlock';

/**
 * PUBLIC_INTERFACE
 * Installation page provides setup and dependency guidance for using the UI Component Explorer
 * in a new or existing React project. It follows the Ocean Professional theme using Tailwind CSS.
 */
const Installation = () => {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Installation' },
  ];

  const block = (code, lang = 'bash') => (
    <div className="rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="px-4 py-2 text-[11px] uppercase tracking-wider font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
        {lang}
      </div>
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-full">
      <Meta title="Installation • UI Component Explorer" description="How to install and configure Tailwind and this component library." />
      <div className="mb-6">
        <Breadcrumbs items={crumbs} />
      </div>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Installation
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
          Set up Tailwind CSS and configure your project to use the Ocean Professional themed
          components. This guide covers dependencies, configuration, and how to copy components so
          they work as-is.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-gray-50 dark:from-blue-500/10 dark:to-slate-900 border border-blue-200/40 dark:border-blue-500/20">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Ocean Professional theme uses blue and amber accents with subtle elevation and rounded corners.
            Ensure dark mode is enabled using the class strategy.
          </p>
        </div>
      </header>

      <section className="space-y-12">
        {/* Quick Start */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Quick start</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Start from a React app (Create React App, Vite, or Next.js are all fine). Install Tailwind and required tooling.
          </p>
          <div className="mt-4">
            {block(`# with npm
npm install -D tailwindcss postcss autoprefixer

# or with pnpm
pnpm add -D tailwindcss postcss autoprefixer

# or with yarn
yarn add -D tailwindcss postcss autoprefixer

# initialize tailwind config
npx tailwindcss init -p`, 'bash')}
          </div>
        </div>

        {/* Tailwind Config */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Configure Tailwind</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Update your tailwind.config.js to scan your source files and enable dark mode with the class strategy.
          </p>
          <div className="mt-4">
            {block(`/** tailwind.config.js */
module.exports = {
  darkMode: 'class',
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Ocean blue
        },
        secondary: {
          DEFAULT: '#F59E0B', // Amber accent
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.08)',
      },
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
};`, 'js')}
          </div>
        </div>

        {/* PostCSS Config */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">PostCSS setup</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Ensure PostCSS loads Tailwind and Autoprefixer. If you used <code className="px-1 rounded bg-slate-100 dark:bg-slate-800">npx tailwindcss init -p</code>, this file should be generated.
          </p>
          <div className="mt-4">
            {block(`/** postcss.config.js */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`, 'js')}
          </div>
        </div>

        {/* CSS Entry */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">CSS entry file</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Add Tailwind directives to your main stylesheet (e.g., <span className="font-mono">src/index.css</span>).
          </p>
          <div className="mt-4">
            {block(`@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Theme helpers */
:root {
  --color-primary: 37 99 235; /* #2563EB */
  --color-secondary: 245 158 11; /* #F59E0B */
}

/* Smooth transitions for theme toggles */
* {
  @apply transition-colors duration-200;
}`, 'css')}
          </div>
        </div>

        {/* Dark mode */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Enable dark mode</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Use the <span className="px-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">class</span> strategy and add the <span className="font-mono">dark</span> class to the <span className="font-mono">&lt;html&gt;</span> element. This app includes a ThemeToggle.
          </p>
          <div className="mt-4">
            {block(`<!-- index.html -->
<html lang="en" class="dark"> <!-- remove 'dark' to default to light -->
  <head>...</head>
  <body>...</body>
</html>`, 'html')}
          </div>
        </div>

        {/* Using these components in another project */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Using components in your project</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Each component shown in the explorer is built with Tailwind utilities only. To use one:
          </p>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-200">
            <li>Ensure Tailwind, PostCSS, and the config above are set up.</li>
            <li>Copy the JSX from the Preview with Code panel.</li>
            <li>Import any icons or helper components referenced (see the code header for hints).</li>
            <li>Verify classes include dark: variants if you need dark mode.</li>
            <li>Test responsiveness at common breakpoints: sm, md, lg, xl.</li>
          </ol>
          <div className="mt-4">
            {block(`// Example usage in React
import React from 'react';

export default function PrimaryButtonExample() {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
      Get started
    </button>
  );
}`, 'jsx')}
          </div>
        </div>

        {/* Scripts and tooling */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Recommended scripts</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Add convenient scripts to your package.json for development and builds.
          </p>
          <div className="mt-4">
            {block(`{
  "scripts": {
    "dev": "vite",             // or: react-scripts start
    "build": "vite build",     // or: react-scripts build
    "preview": "vite preview",
    "lint": "eslint ."
  }
}`, 'json')}
          </div>
        </div>

        {/* Project specifics */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Project specifics</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            This UI Component Explorer already includes Tailwind and dark mode support. If you copy components out,
            replicate the Tailwind configuration and ensure your app wraps pages with a container that uses similar background and text colors.
          </p>
          <ul className="mt-3 list-disc list-inside space-y-1 text-slate-700 dark:text-slate-200">
            <li>Theme: Ocean Professional (primary #2563EB, secondary #F59E0B)</li>
            <li>Layout: Sidebar on desktop, collapsible on mobile</li>
            <li>Typography: system UI with balanced sizes; see utilities for spacing and weights</li>
          </ul>
        </div>

        {/* Troubleshooting */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Troubleshooting</h2>
          <ul className="mt-3 list-disc list-inside space-y-2 text-slate-700 dark:text-slate-200">
            <li>If styles don’t apply, confirm your Tailwind content paths include your source files.</li>
            <li>Check that your build pipeline loads PostCSS with Tailwind and Autoprefixer.</li>
            <li>If dark mode doesn’t toggle, verify the <span className="font-mono">dark</span> class changes on the html element.</li>
            <li>Ensure no conflicting CSS resets override Tailwind’s base styles.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Installation;
