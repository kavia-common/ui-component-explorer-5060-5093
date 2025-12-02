import React, { useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * PinInput - 4 digit PIN entry with auto-advance
 * Props:
 * - length?: number
 */
function PinInput({ length = 4 }) {
  const [values, setValues] = useState(Array.from({ length }, () => ''));
  const refs = useRef(Array.from({ length }, () => React.createRef()));

  const onChange = (i, v) => {
    if (!/^[0-9]?$/.test(v)) return;
    const next = values.slice();
    next[i] = v;
    setValues(next);
    if (v && i < length - 1) {
      refs.current[i + 1].current?.focus();
    }
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) {
      refs.current[i - 1].current?.focus();
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1].current?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      refs.current[i + 1].current?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((val, i) => (
        <input
          key={i}
          ref={refs.current[i]}
          inputMode="numeric"
          aria-label={`Digit ${i + 1}`}
          value={val}
          onChange={(e) => onChange(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="h-10 w-10 rounded-md border border-gray-300 text-center text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      ))}
    </div>
  );
}

export default PinInput;
