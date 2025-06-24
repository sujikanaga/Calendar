// File: src/App.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./components/CalendarHeader";
import EventTypeFilter from "./components/EventTypeFilter";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import SearchBar from "./components/SearchBar";
import EventFormModal from "./components/EventFormModal";
import MiniCalendar from "./components/MiniCalendar";
import initialEvents from "./data/events.json";
import "./index.css";

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [theme, setTheme] = useState("light");
  const [filterType, setFilterType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleDelete = (eventToDelete) => {
    setEvents(events.filter((e) => e !== eventToDelete));
    setSelectedEvent(null);
  };

  const handleSave = (eventData) => {
    if (editingEvent) {
      setEvents(events.map((e) => (e === editingEvent ? { ...eventData } : e)));
    } else {
      setEvents([...events, eventData]);
    }
    setShowFormModal(false);
    setEditingEvent(null);
  };

  const filteredEvents = events.filter(
    (event) =>
      (filterType === "all" || event.type === filterType) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.date.includes(searchQuery))
  );

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");
  const calendarDays = [];
  let day = startDay;
  while (day.isBefore(endDay, "day")) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const currentYear = dayjs().year();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700 space-y-4">
        <MiniCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-4">
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
          <EventTypeFilter selectedType={filterType} onSelectType={setFilterType} />
          <button
            onClick={() => {
              setShowFormModal(true);
              setEditingEvent(null);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            ➕ Add Event
          </button>
          <button
            className="w-full text-sm text-gray-700 dark:text-white"
            onClick={toggleTheme}
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300 p-4">
        <div className="max-w-6xl mx-auto">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={() => setCurrentDate(currentDate.subtract(1, "month"))}
            onNext={() => setCurrentDate(currentDate.add(1, "month"))}
            onYearChange={(e) =>
              setCurrentDate(currentDate.year(parseInt(e.target.value)))
            }
            years={years}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <CalendarGrid
            calendarDays={calendarDays}
            currentDate={currentDate}
            eventsData={filteredEvents}
            filterType={filterType}
            onEventClick={(event) => {
              setSelectedEvent(event);
            }}
          />

          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onDelete={handleDelete}
            onEdit={(e) => {
              setEditingEvent(e);
              setShowFormModal(true);
              setSelectedEvent(null);
            }}
          />

          <EventFormModal
            open={showFormModal}
            onClose={() => setShowFormModal(false)}
            onSave={handleSave}
            editingEvent={editingEvent}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
