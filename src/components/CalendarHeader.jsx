import React from "react";

function CalendarHeader({ currentDate, setCurrentDate }) {
  return (
    <div className="w-full mb-4 sm:mb-6 px-2 sm:px-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg py-3 px-4 sm:px-6">
        
        {/* Left: Prev Button */}
        <button
          className="bg-white text-blue-600 font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm shadow hover:bg-blue-100 transition-all duration-200 hover:scale-105"
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
        >
          ◀ Prev
        </button>

        {/* Center: Month Title */}
        <h2 className="text-lg sm:text-2xl font-bold text-center">
          <span className="hidden sm:inline">{currentDate.format("MMMM YYYY")}</span>
          <span className="sm:hidden">{currentDate.format("MMM YYYY")}</span>
        </h2>

        {/* Right: Next Button */}
        <button
          className="bg-white text-blue-600 font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm shadow hover:bg-blue-100 transition-all duration-200 hover:scale-105"
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
