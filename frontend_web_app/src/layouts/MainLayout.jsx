import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { getCategories } from '../utils/data';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { usePreline } from '../utils/preline';

/**
 * PUBLIC_INTERFACE
 * MainLayout provides the app shell with a fixed/sticky header and a sticky sidebar.
 * Only the central content area scrolls vertically. Sidebar collapses on mobile.
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

  // Initialize Preline behaviors on route change
  usePreline([location.pathname]);

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

  // Read categories from data helpers (not directly used here, reserved for header widgets if needed)
  getCategories();

  // Header height (px) used for sticky sidebar offset. Keep in sync with header paddings.
  const HEADER_PX = 64;

  return (
    <div className="root-layout min-h-screen flex flex-col text-text bg-background dark:bg-gray-900">
      {/* Header - fixed/sticky at top */}
      <header className="sticky top-0 z-50 border-b border-transparent bg-main-gradient text-white" role="banner">
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
              <span className="text-lg font-semibold text-white">UI Component Explorer</span>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center px-6 md:flex" />

          <div className="flex items-center gap-2">
            <div className="rounded-md ring-1 ring-white/20">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content Row: sidebar + main. Ensure min-h-0 so child can scroll */}
      <div className="mx-auto grid max-w-7xl flex-1 grid-cols-1 md:grid-cols-[270px_minmax(0,1fr)] min-h-0 w-full gap-0">
        {/* Sidebar (desktop): sticky below header */}
        <aside
          className="hidden md:block bg-main-gradient text-white sticky self-start overflow-hidden"
          style={{ top: `${HEADER_PX}px`, height: `calc(100vh - ${HEADER_PX}px)` }}
          role="complementary"
          aria-label="Sidebar navigation"
        >
          <div className="h-full">
            <Sidebar onItemClick={() => setSidebarOpen(false)} />
          </div>
        </aside>

        {/* Main content column - must be min-h-0 so its child can scroll */}
        <main className="min-h-0 flex flex-col bg-background dark:bg-gray-900">
          <div className="min-h-0 flex flex-col p-4 md:p-6">
            {/* Scrollable pane with custom scrollbar; avoid body scroll */}
            <div className="main-content flex-1 min-h-0 overflow-y-auto custom-scrollbar rounded-xl border border-gray-200 bg-background p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Drawer (overlay) */}
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
          } overflow-y-auto custom-scrollbar text-white`}
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

      {/* Footer remains outside scroll area; page height stays within viewport */}
      <footer className="border-t border-gray-200 bg-background py-6 dark:border-gray-800 dark:bg-gray-900" role="contentinfo">
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
