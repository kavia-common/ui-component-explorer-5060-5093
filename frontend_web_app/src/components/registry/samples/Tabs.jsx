import React from "react";

/**
 * Tabs component with keyboard navigation (ArrowLeft/Right/Home/End) and roving tabindex.
 * Accessible with roles (tablist, tab, tabpanel).
 */
const Tabs = ({ tabs = ["Profile", "Billing", "Notifications"] }) => {
  const [index, setIndex] = React.useState(0);
  const refs = React.useRef([]);

  const onKeyDown = (e) => {
    const last = tabs.length - 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex((i) => (i === last ? 0 : i + 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex((i) => (i === 0 ? last : i - 1));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setIndex(last);
    }
  };

  React.useEffect(() => {
    refs.current[index]?.focus();
  }, [index]);

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Sample tabs"
        className="inline-flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => {
          const active = i === index;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              ref={(el) => (refs.current[i] = el)}
              tabIndex={active ? 0 : -1}
              onClick={() => setIndex(i)}
              className={[
                "px-3 py-1.5 text-sm rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors",
                active
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        {tabs.map((t, i) => {
          const active = i === index;
          return (
            <div
              key={t}
              role="tabpanel"
              id={`panel-${i}`}
              aria-labelledby={`tab-${i}`}
              hidden={!active}
            >
              <div className="text-sm text-gray-700 dark:text-gray-200">
                {t} content goes here. This panel is controlled via ARIA attributes.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
