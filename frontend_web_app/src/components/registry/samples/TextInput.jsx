import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TextInput - simple input for previews
 * Props:
 * - placeholder?: string
 * - value?: string
 * - onChange?: (value: string) => void
 */
function TextInput({ placeholder = 'Type here', value = '', onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
    />
  );
}

export default TextInput;
