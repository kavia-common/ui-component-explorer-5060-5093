import React from "react";

/**
 * Sidebar sample with collapsible groups and active item styles.
 */
const Group = ({ title, children }) => (
  <div className="space-y-2">
    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</div>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({ active, children }) => (
  <button
    className={[
      "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
      active
        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
    ].join(" ")}
  >
    {children}
  </button>
);

const SidebarSample = () => {
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-6">
      <aside className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 h-fit">
        <div className="space-y-6">
          <Group title="General">
            <Item active>Dashboard</Item>
            <Item>Activity</Item>
            <Item>Projects</Item>
          </Group>
          <Group title="Management">
            <Item>Teams</Item>
            <Item>Billing</Item>
            <Item>Settings</Item>
          </Group>
        </div>
      </aside>
      <main className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
        <div className="text-sm text-gray-700 dark:text-gray-200">
          Content area. Use the sidebar to navigate sections.
        </div>
      </main>
    </div>
  );
};

export default SidebarSample;
