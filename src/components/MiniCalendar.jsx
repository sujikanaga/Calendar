// File: src/components/MiniCalendar.jsx
import React from "react";
import dayjs from "dayjs";

function MiniCalendar({ currentDate, setCurrentDate }) {
  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");
  const calendarDays = [];
  let day = startDay;
  while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const isToday = (date) => date.isSame(dayjs(), "day");
  const isCurrentMonth = (date) => date.month() === currentDate.month();

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border dark:border-gray-600 p-3 sm:p-4 mb-4">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 p-1 rounded transition-colors duration-200"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 dark:text-white text-center flex-1">
          <span className="hidden sm:inline">{currentDate.format("MMMM YYYY")}</span>
          <span className="sm:hidden">{currentDate.format("MMM YY")}</span>
        </h3>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 p-1 rounded transition-colors duration-200"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-[10px] sm:text-xs font-bold text-gray-600 dark:text-gray-300 py-1">
            <span className="hidden xs:inline">{d.slice(0, 3)}</span>
            <span className="xs:hidden">{d.charAt(0)}</span>
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => setCurrentDate(date)}
            className={`
              cursor-pointer p-1 sm:p-1.5 rounded-full transition-all duration-200 text-[10px] sm:text-xs
              aspect-square flex items-center justify-center min-h-[24px] sm:min-h-[28px]
              ${isToday(date) 
                ? "bg-purple-500 text-white shadow-md" 
                : "hover:bg-purple-100 dark:hover:bg-purple-800"
              }
              ${!isCurrentMonth(date) 
                ? "text-gray-400 dark:text-gray-500" 
                : "text-gray-700 dark:text-gray-200"
              }
              hover:scale-110 active:scale-95
            `}
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
