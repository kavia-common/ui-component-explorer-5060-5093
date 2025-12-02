import React from "react";

/**
 * PUBLIC_INTERFACE
 * Grid
 * A general-purpose CSS grid with configurable columns, gap and auto-rows.
 */
export default function Grid({
  children,
  cols = 12,
  gap = 4,
  autoRows = "minmax(0, 1fr)",
  className = "",
}) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridAutoRows: autoRows,
      }}
    >
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Grid.Item
 * Grid item with column and row span support.
 */
export function GridItem({ children, colSpan = 3, rowSpan = 1, className = "" }) {
  return (
    <div
      className={`col-span-${colSpan} row-span-${rowSpan} ${className}`}
      style={{}}
    >
      {children}
    </div>
  );
}
