import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import SearchBar from '../components/common/SearchBar';
import { getCategories } from '../utils/data';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * MainLayout provides the app shell (Header, Sidebar, Footer) and renders routed pages via <Outlet />.
 * - Header includes brand, search, and theme toggle.
 * - Sidebar collapses on mobile and lists sample categories with an accessible drawer.
 * - Footer shows minimal info.
 */
function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Close sidebar when route changes (mobile UX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Focus trap for mobile sidebar drawer
  useEffect(() => {
    if (!sidebarOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    // Collect focusable elements within the drawer
    const focusables = drawer.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    firstFocusableRef.current = first;
    lastFocusableRef.current = last;

    // Focus the first focusable element
    first?.focus();

    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
      if (e.key === 'Tab' && focusables.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  // Close on Ctrl+M (example keyboard shortcut) to toggle menu on mobile for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        setSidebarOpen((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Read categories from data helpers
  const categories = getCategories();

  return (
    <div className="min-h-screen text-text bg-app-gradient">
      {/* subtle overlay to keep Ocean surfaces readable */}
      <div className="pointer-events-none fixed inset-0 bg-white/40 dark:bg-black/30" aria-hidden="true" />
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-surface/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/70" role="banner">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus-visible:ring-2 md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              aria-controls="mobile-drawer"
              onClick={toggleSidebar}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 focus-ring-main-gradient rounded-md">
              <div className="h-8 w-8 rounded-lg bg-main-gradient shadow-sm ring-1 ring-black/5" />
              <span className="text-lg font-semibold bg-clip-text text-transparent text-main-gradient">
                UI Component Explorer
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-6 md:flex">
            <SearchBar placeholder="Search components…" />
          </div>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <SearchBar compact placeholder="Search…" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition ${
          sidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } md:hidden`}
        aria-hidden={!sidebarOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Drawer Panel */}
        <aside
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={`absolute left-0 top-0 h-full w-72 transform border-r border-gray-200 bg-surface p-4 shadow-xl transition-transform dark:border-gray-800 dark:bg-gray-900 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Menu</span>
            <button
              type="button"
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-200">
            Tip: Use the search bar to quickly find components.
          </div>
          {/* Focus sentinels for trap */}
          <button className="sr-only" onFocus={() => lastFocusableRef.current?.focus()} />
          <button className="sr-only" onFocus={() => firstFocusableRef.current?.focus()} />
        </aside>
      </div>

      {/* Desktop Layout: Sidebar + Main */}
      <div className="mx-auto hidden max-w-7xl grid-cols-[260px_minmax(0,1fr)] md:grid">
        {/* Sidebar */}
        <aside className="border-r border-gray-200 bg-surface px-4 py-4 dark:border-gray-800 dark:bg-gray-900 max-h-[calc(100vh-64px)] overflow-y-auto" role="complementary" aria-label="Sidebar navigation">
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-200">
            Tip: Use the search bar to quickly find components.
          </div>
        </aside>

        {/* Main content */}
        <main className="min-h-[70vh] p-4 md:p-6" role="main">
          <div className="rounded-xl border border-gray-200 bg-surface p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Main content (full width) */}
      <div className="mx-auto max-w-7xl md:hidden">
        <main className="min-h-[70vh] p-4 md:p-6">
          <div className="rounded-xl border border-gray-200 bg-surface p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-surface py-6 dark:border-gray-800 dark:bg-gray-900" role="contentinfo">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm text-gray-600 dark:text-gray-300">
          <span>© {new Date().getFullYear()} UI Component Explorer</span>
          <a
            className="text-blue-600 hover:underline dark:text-blue-400 focus-ring-main-gradient rounded-[3px]"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
          >
            <span className="bg-clip-text text-transparent text-main-gradient">Built with React + Tailwind</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
