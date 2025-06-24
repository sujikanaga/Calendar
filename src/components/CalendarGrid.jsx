import React from "react";
import dayjs from "dayjs";

const typeColors = {
  meeting: "bg-blue-500",
  task: "bg-green-500",
  personal: "bg-pink-500"
};

const CalendarGrid = ({ calendarDays, currentDate, eventsData, filterType, onEventClick }) => {
  const renderEvents = (dateStr) =>
    eventsData
      .filter(
        (e) => e.date === dateStr && (filterType === "all" || e.type === filterType)
      )
      .map((event, i) => (
        <div
          key={i}
          onClick={() => onEventClick(event)}
          className={`text-xs mt-1 rounded p-1 text-white cursor-pointer ${
            typeColors[event.type] || "bg-gray-500"
          }`}
        >
          <strong>{event.title}</strong>
          <div className="text-[10px]">{event.startTime} - {event.endTime}</div>
        </div>
      ));

  return (
    <>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-800 dark:text-gray-200 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, idx) => {
          const dateStr = date.format("YYYY-MM-DD");
          const isToday = date.isSame(dayjs(), "day");
          const isCurrentMonth = date.month() === currentDate.month();

          return (
            <div
              key={idx}
              className={`border p-2 rounded min-h-[100px] overflow-auto transition text-xs bg-white dark:bg-gray-800 ${
                isToday ? "border-yellow-500 bg-yellow-100 dark:bg-yellow-800" : ""
              } ${!isCurrentMonth ? "text-gray-400 dark:text-gray-500" : ""}`}
            >
              <div className="text-right font-semibold text-sm">{date.date()}</div>
              {renderEvents(dateStr)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;
