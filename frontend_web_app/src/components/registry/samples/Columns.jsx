import React from "react";

/**
 * PUBLIC_INTERFACE
 * Columns
 * A responsive column layout with configurable gap and counts across breakpoints.
 */
export default function Columns({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  gap = "6",
  className = "",
}) {
  /**
   * cols: { base, sm, md, lg, xl } number of columns per breakpoint
   */
  const colClasses = [
    cols.base ? `grid-cols-${cols.base}` : "grid-cols-1",
    cols.sm ? `sm:grid-cols-${cols.sm}` : "",
    cols.md ? `md:grid-cols-${cols.md}` : "",
    cols.lg ? `lg:grid-cols-${cols.lg}` : "",
    cols.xl ? `xl:grid-cols-${cols.xl}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`grid gap-${gap} ${colClasses} ${className}`}>{children}</div>
  );
}
