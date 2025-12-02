import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import SearchBar from '../components/common/SearchBar';
import { getCategories } from '../utils/data';
import CategoryList from '../components/explorer/CategoryList';

/**
 * PUBLIC_INTERFACE
 * MainLayout provides the app shell (Header, Sidebar, Footer) and renders routed pages via <Outlet />.
 * - Header includes brand, search, and theme toggle.
 * - Sidebar collapses on mobile and lists sample categories.
 * - Footer shows minimal info.
 */
function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  // Close sidebar when route changes (mobile UX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Sync theme with html element (bridge with existing App.css + Tailwind dark)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  // Read categories from data helpers
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-surface/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400 shadow-sm" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">UI Component Explorer</span>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-6 md:flex">
            <SearchBar placeholder="Search components…" />
          </div>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <SearchBar compact placeholder="Search…" />
            </div>
            <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
          </div>
        </div>
      </header>

      {/* Layout: Sidebar + Main */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'block' : 'hidden'} md:block border-r border-gray-200 bg-surface px-4 py-4 dark:border-gray-800 dark:bg-gray-900`}
        >
          <CategoryList categories={categories} onItemClick={() => setSidebarOpen(false)} />
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-200">
            Tip: Use the search bar to quickly find components.
          </div>
        </aside>

        {/* Main content */}
        <main className="min-h-[70vh] bg-ocean-gradient p-4 md:p-6">
          <div className="rounded-xl border border-gray-200 bg-surface p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-surface py-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm text-gray-600 dark:text-gray-300">
          <span>© {new Date().getFullYear()} UI Component Explorer</span>
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
          >
            Built with React + Tailwind
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
