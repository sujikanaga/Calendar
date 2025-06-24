import React from "react";

const types = ["all", "meeting", "task", "personal"];

const colors = {
  all: "bg-gray-700 hover:bg-gray-800 text-white",
  meeting: "bg-blue-500 hover:bg-blue-600 text-white",
  task: "bg-green-500 hover:bg-green-600 text-white",
  personal: "bg-pink-500 hover:bg-pink-600 text-white",
};

function EventTypeFilter({ selectedType, onSelectType }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
        Filter by Type
      </h3>
      <div className="flex flex-col gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onSelectType(type)}
            className={`
              px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm text-xs sm:text-sm font-medium
              transition-all duration-200 transform active:scale-95
              ${selectedType === type 
                ? "ring-2 ring-offset-2 ring-blue-300 dark:ring-blue-500 scale-105" 
                : ""
              } 
              ${colors[type]}
            `}
          >
            <span className="flex items-center justify-center">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {selectedType === type && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EventTypeFilter;
