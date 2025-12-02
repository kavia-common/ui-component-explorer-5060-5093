import React from "react";

/**
 * PUBLIC_INTERFACE
 * Container
 * A responsive container with max-width variants and padding.
 */
export default function Container({ children, size = "md", className = "" }) {
  /**
   * Allowed sizes: sm, md, lg, xl, full
   */
  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}
