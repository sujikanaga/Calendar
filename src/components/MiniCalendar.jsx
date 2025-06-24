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
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
          className="text-gray-500 dark:text-gray-300"
        >
          ◀
        </button>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {currentDate.format("MMMM YYYY")}
        </h3>
        <button
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
          className="text-gray-500 dark:text-gray-300"
        >
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-600 dark:text-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-bold">
            {d}
          </div>
        ))}
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => setCurrentDate(date)}
            className={`cursor-pointer p-1 rounded-full transition-all duration-200
              ${isToday(date) ? "bg-purple-500 text-white" : ""}
              ${!isCurrentMonth(date) ? "text-gray-400" : ""}
              hover:bg-purple-300 hover:text-white`}
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
