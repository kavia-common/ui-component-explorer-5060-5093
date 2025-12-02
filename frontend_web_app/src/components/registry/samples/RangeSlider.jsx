import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * RangeSlider - input range with value display
 * Props:
 * - min?: number
 * - max?: number
 * - step?: number
 * - defaultValue?: number
 */
function RangeSlider({ min = 0, max = 100, step = 1, defaultValue = 40 }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <div className="w-full max-w-md">
      <label className="mb-1 block text-xs font-medium text-slate-800 dark:text-slate-200">Volume</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">Value: {val}</div>
    </div>
  );
}

export default RangeSlider;
