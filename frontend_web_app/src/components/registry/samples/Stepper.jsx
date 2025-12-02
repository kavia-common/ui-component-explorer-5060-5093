import React from "react";

/**
 * Stepper sample with numbered steps and active/completed states.
 */
const Step = ({ number, title, status }) => {
  const isDone = status === "done";
  const isActive = status === "active";
  return (
    <div className="flex items-start gap-3">
      <div
        className={[
          "flex-none h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold border",
          isDone
            ? "bg-blue-600 text-white border-blue-600"
            : isActive
            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/60"
            : "bg-white dark:bg-gray-900 text-gray-500 border-gray-300 dark:border-gray-700",
        ].join(" ")}
      >
        {isDone ? (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293A1 1 0 003.293 10.707l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
          </svg>
        ) : (
          number
        )}
      </div>
      <div className="pt-0.5">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {isDone ? "Completed" : isActive ? "In progress" : "Pending"}
        </div>
      </div>
    </div>
  );
};

const Stepper = ({ steps = ["Account", "Profile", "Confirm"], current = 1 }) => {
  return (
    <div className="w-full">
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((t, i) => {
          const status = i < current ? "done" : i === current ? "active" : "idle";
          return (
            <div key={t} className="flex items-center gap-3">
              <Step number={i + 1} title={t} status={status} />
              {i < steps.length - 1 && (
                <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
