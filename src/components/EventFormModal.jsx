// src/components/EventFormModal.jsx
import React, { useState, useEffect } from "react";

const EventFormModal = ({ open, onClose, onSave, editingEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "meeting",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    } else {
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "meeting",
      });
    }
    setErrors({});
  }, [editingEvent, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "End time must be after start time";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "meeting",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Event Title *
              </label>
              <input
                id="title"
                className={`
                  w-full px-3 py-2 sm:py-3 text-sm sm:text-base
                  border rounded-lg
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                  ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                `}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.title}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Date *
              </label>
              <input
                id="date"
                className={`
                  w-full px-3 py-2 sm:py-3 text-sm sm:text-base
                  border rounded-lg
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                  ${errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                `}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.date}</p>
              )}
            </div>

            {/* Time inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Start Time *
                </label>
                <input
                  id="startTime"
                  className={`
                    w-full px-3 py-2 sm:py-3 text-sm sm:text-base
                    border rounded-lg
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200
                    ${errors.startTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                  `}
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
                {errors.startTime && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.startTime}</p>
                )}
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  End Time *
                </label>
                <input
                  id="endTime"
                  className={`
                    w-full px-3 py-2 sm:py-3 text-sm sm:text-base
                    border rounded-lg
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200
                    ${errors.endTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                  `}
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
                {errors.endTime && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Event Type
              </label>
              <select
                id="type"
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg transition-colors duration-200 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 order-1 sm:order-2"
              >
                {editingEvent ? "Update Event" : "Save Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
