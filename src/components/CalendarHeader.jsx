import React from "react";

const CalendarHeader = ({ currentDate, onPrev, onNext, onYearChange, years, onToggleTheme, theme }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <button onClick={onPrev} className="px-4 py-2 bg-blue-600 text-white rounded">Prev</button>

      <div className="text-center">
        <h1 className="text-3xl font-bold">{currentDate.format("MMMM YYYY")}</h1>
        <select
          value={currentDate.year()}
          onChange={onYearChange}
          className="mt-2 border rounded px-3 py-1 bg-white dark:bg-gray-800 dark:text-white"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <button onClick={onNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>

      <button
        onClick={onToggleTheme}
        className="px-4 py-1 rounded border border-gray-400 dark:border-gray-300"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
};

export default CalendarHeader;
