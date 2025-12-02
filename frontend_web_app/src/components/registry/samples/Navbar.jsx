import React from "react";

/**
 * Navbar sample component with responsive toggle and simple brand.
 * Tailwind-based, fully responsive and keyboard accessible toggle.
 */
const Navbar = ({ brand = "Brand", links = ["Features", "Pricing", "About"] }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-blue-600 shadow-inner" />
            <a href="#navbar" className="font-semibold text-gray-900 dark:text-white">{brand}</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="block rounded px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
