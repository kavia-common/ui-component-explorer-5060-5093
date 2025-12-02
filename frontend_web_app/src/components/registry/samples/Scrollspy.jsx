import React from "react";

/**
 * Scrollspy sample: highlights active section based on scroll position with IntersectionObserver.
 */
const sections = [
  { id: "intro", title: "Introduction" },
  { id: "usage", title: "Usage" },
  { id: "api", title: "API" },
  { id: "faq", title: "FAQ" },
];

const Scrollspy = () => {
  const [active, setActive] = React.useState(sections[0].id);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      <nav className="sticky top-4 h-fit rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
        <ul className="space-y-1">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={[
                    "block rounded px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800",
                  ].join(" ")}
                >
                  {s.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-12">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, beatae? Repellat
              atque velit, omnis, amet deserunt, aliquid magni laboriosam id saepe eos illum.
              Cupiditate, consequuntur fuga! Repellat, ipsam tenetur?
            </p>
            <div className="h-48 md:h-64 mt-3 rounded-lg bg-gradient-to-tr from-blue-500/10 to-gray-100 dark:from-blue-900/20 dark:to-gray-800" />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Scrollspy;
