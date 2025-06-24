import React from "react";

const types = ["all", "meeting", "task", "personal"];

const colors = {
  all: "bg-gray-700 text-white",
  meeting: "bg-blue-500 text-white",
  task: "bg-green-500 text-white",
  personal: "bg-pink-500 text-white",
};

function EventTypeFilter({ selectedType, onSelectType }) {
  return (
    <div className="flex flex-col gap-2">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className={`px-4 py-2 rounded-lg shadow ${
            selectedType === type ? "ring-2 ring-offset-2 ring-blue-300" : ""
          } ${colors[type]}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default EventTypeFilter;
