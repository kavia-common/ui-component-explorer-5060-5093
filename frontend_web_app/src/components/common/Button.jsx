import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button - Primary/secondary button with sizes.
 * Props:
 * - variant?: 'primary'|'secondary'|'ghost' (default: 'primary')
 * - size?: 'sm'|'md' (default: 'md')
 * - className?: string
 * - onClick?: () => void
 * - children: node
 * - type?: 'button'|'submit'|'reset'
 */
function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  children,
  type = 'button',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus-ring-main-gradient';
  const variants = {
    primary:
      'text-white bg-main-gradient hover:brightness-105 active:brightness-95 shadow-sm focus:ring-2 focus:ring-offset-0 focus:ring-blue-300 dark:focus:ring-blue-800',
    secondary:
      'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-blue-800',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-blue-800',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
