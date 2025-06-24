import React from "react";

const SearchBar = ({ query, onChange }) => {
  return (
    <div className="mb-4 text-center">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events by title or date (YYYY-MM-DD)"
        className="w-full max-w-md px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;
