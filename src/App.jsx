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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Calendar</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        w-full xs:w-80 sm:w-72 lg:w-80 xl:w-96
        bg-white dark:bg-gray-800 
        border-r dark:border-gray-700 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6">
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <MiniCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
            
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl space-y-3 sm:space-y-4">
              <SearchBar query={searchQuery} onChange={setSearchQuery} />
              <EventTypeFilter selectedType={filterType} onSelectType={setFilterType} />
              
              <button
                onClick={() => {
                  setShowFormModal(true);
                  setEditingEvent(null);
                  setSidebarOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg w-full text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="inline-flex items-center">
                  <span className="mr-2">➕</span>
                  Add Event
                </span>
              </button>
              
              <button
                className="w-full text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 transition-colors duration-200 hidden lg:block"
                onClick={toggleTheme}
              >
                Toggle {theme === "light" ? "Dark" : "Light"} Theme
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-2 sm:p-4 lg:p-6 overflow-hidden">
        <div className="max-w-full mx-auto h-full">
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onPrev={() => setCurrentDate(currentDate.subtract(1, "month"))}
            onNext={() => setCurrentDate(currentDate.add(1, "month"))}
            onYearChange={(e) =>
              setCurrentDate(currentDate.year(parseInt(e.target.value)))
            }
            years={years}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <div className="overflow-auto">
            <CalendarGrid
              calendarDays={calendarDays}
              currentDate={currentDate}
              eventsData={filteredEvents}
              filterType={filterType}
              onEventClick={(event) => {
                setSelectedEvent(event);
              }}
            />
          </div>

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
