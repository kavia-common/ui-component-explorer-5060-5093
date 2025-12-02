import React from "react";

/**
 * MegaMenu sample component using CSS-only hover/focus-within for mega panel display.
 * Accessible via focus on trigger and links. No JS required for panel toggle.
 */
const MegaMenu = () => {
  const sections = [
    {
      title: "Products",
      links: [
        { label: "Analytics", desc: "Understand your traffic", href: "#" },
        { label: "Commerce", desc: "Payments & subscriptions", href: "#" },
        { label: "Messaging", desc: "In-app & email", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", desc: "API and guides", href: "#" },
        { label: "Blog", desc: "News and tutorials", href: "#" },
        { label: "Community", desc: "Join discussions", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", desc: "Who we are", href: "#" },
        { label: "Careers", desc: "Work with us", href: "#" },
        { label: "Press", desc: "Brand and media", href: "#" },
      ],
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-8 h-14">
          <a href="#megamenu" className="font-semibold text-gray-900 dark:text-white">Brand</a>

          <div className="relative group focus-within:outline-none">
            <button
              className="inline-flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none py-2"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Solutions
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 absolute left-0 top-full mt-2 w-[44rem]">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
                <div className="grid grid-cols-3 gap-0 divide-x divide-gray-200 dark:divide-gray-800">
                  {sections.map((sec) => (
                    <div key={sec.title} className="p-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                        {sec.title}
                      </div>
                      <ul className="space-y-2">
                        {sec.links.map((l) => (
                          <li key={l.label}>
                            <a
                              href={l.href}
                              className="group/link block rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">
                                {l.label}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{l.desc}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-blue-50/60 to-gray-50/60 dark:from-blue-950/20 dark:to-gray-900/40 px-5 py-3 text-xs text-gray-600 dark:text-gray-300">
                  Tip: Use focus-within or group-hover to keep panels open without JS.
                </div>
              </div>
            </div>
          </div>

          <a href="#" className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a>
          <a href="#" className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">Docs</a>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
