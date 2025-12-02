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
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-transparent bg-main-gradient text-white" role="banner">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:brightness-110 focus-ring-main-gradient md:hidden"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              aria-controls="mobile-drawer"
              onClick={toggleSidebar}
            >
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2 focus-ring-main-gradient rounded-md">
              <div className="h-8 w-8 rounded-lg bg-white/10 shadow-sm ring-1 ring-white/20" />
              <span className="text-lg font-semibold text-white">
                UI Component Explorer
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-6 md:flex">
            <div className="w-full max-w-xl">
              <SearchBar placeholder="Search components…" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <SearchBar compact placeholder="Search…" />
            </div>
            {/* Ensure toggle is visible on gradient */}
            <div className="rounded-md ring-1 ring-white/20">
              <ThemeToggle />
            </div>
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
          className={`absolute left-0 top-0 h-full w-72 transform bg-main-gradient p-4 shadow-xl transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto text-white`}
        >
          <div className="mb-3 flex items-center justify-between rounded-md px-2 py-2">
            <span className="text-sm font-semibold text-white">Menu</span>
            <button
              type="button"
              className="rounded-md p-2 text-white hover:underline sidebar-focus-ring"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
          {/* Focus sentinels for trap */}
          <button className="sr-only" onFocus={() => lastFocusableRef.current?.focus()} />
          <button className="sr-only" onFocus={() => firstFocusableRef.current?.focus()} />
        </aside>
      </div>

      {/* Desktop Layout: Sidebar + Main */}
      <div className="mx-auto hidden max-w-7xl grid-cols-[260px_minmax(0,1fr)] md:grid">
        {/* Sidebar */}
        <aside className="bg-main-gradient px-4 py-4 max-h-[calc(100vh-64px)] overflow-y-auto text-white" role="complementary" aria-label="Sidebar navigation">
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm text-slate-700 dark:text-slate-200">
          <span>© {new Date().getFullYear()} UI Component Explorer</span>
          <a
            className="text-blue-700 hover:underline dark:text-blue-300 focus-ring-main-gradient rounded-[3px]"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
          >
            <span>Built with React + Tailwind</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
