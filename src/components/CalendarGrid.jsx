import React from "react";
import dayjs from "dayjs";

const typeColors = {
  meeting: "bg-blue-500",
  task: "bg-green-500",
  personal: "bg-pink-500",
};

const CalendarGrid = ({
  calendarDays,
  currentDate,
  eventsData,
  filterType,
  onEventClick,
}) => {
  const renderEvents = (dateStr) =>
    eventsData
      .filter(
        (e) =>
          e.date === dateStr && (filterType === "all" || e.type === filterType)
      )
      .map((event, i) => (
        <div
          key={i}
          onClick={() => onEventClick(event)}
          className={`text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 rounded p-0.5 sm:p-1 text-white cursor-pointer transition-all hover:scale-105 ${
            typeColors[event.type] || "bg-gray-500"
          }`}
        >
          <strong className="block truncate">{event.title}</strong>
          <div className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] opacity-90">
            {event.startTime} - {event.endTime}
          </div>
        </div>
      ));

  return (
    <div className="w-full">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-0.5 xs:gap-1 sm:gap-2 text-center font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, index) => (
          <div key={d} className="text-[10px] xs:text-xs sm:text-sm md:text-base py-1 sm:py-2">
            <span className="hidden xs:inline">{d}</span>
            <span className="xs:hidden">{d.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 xs:gap-1 sm:gap-2">
        {calendarDays.map((date, idx) => {
          const dateStr = date.format("YYYY-MM-DD");
          const isToday = date.isSame(dayjs(), "day");
          const isCurrentMonth = date.month() === currentDate.month();

          return (
            <div
              key={idx}
              className={`border rounded overflow-hidden transition-all duration-200 hover:shadow-md
                p-1 xs:p-2 sm:p-3 md:p-4 
                min-h-[60px] xs:min-h-[70px] sm:min-h-[90px] md:min-h-[110px] lg:min-h-[130px]
                text-[8px] xs:text-[10px] sm:text-xs md:text-sm
                bg-white dark:bg-gray-800 
                ${
                  isToday
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 ring-1 ring-yellow-400"
                    : "border-gray-200 dark:border-gray-700"
                } 
                ${
                  !isCurrentMonth
                    ? "text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900"
                    : ""
                }`}
            >
              <div className="text-right font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">
                {date.date()}
              </div>
              <div className="space-y-0.5 sm:space-y-1 max-h-[40px] xs:max-h-[50px] sm:max-h-[60px] md:max-h-[80px] lg:max-h-[100px] overflow-y-auto">
                {renderEvents(dateStr)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
