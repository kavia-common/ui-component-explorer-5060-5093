import React from "react";

/**
 * Navs sample: horizontal and vertical variants for simple navigation sections.
 */
const NavLink = ({ active, children }) => (
  <button
    className={[
      "px-3 py-2 text-sm rounded-md transition-colors",
      active
        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
    ].join(" ")}
  >
    {children}
  </button>
);

const Navs = () => {
  const items = ["Overview", "Integrations", "Usage", "Settings"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Horizontal</div>
        <div className="flex flex-wrap gap-2">
          {items.map((l, i) => (
            <NavLink key={l} active={i === 0}>{l}</NavLink>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Vertical</div>
        <div className="flex flex-col gap-2">
          {items.map((l, i) => (
            <NavLink key={l} active={i === 0}>{l}</NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navs;
