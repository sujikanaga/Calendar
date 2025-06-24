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

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "meeting",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96 text-black dark:text-white">
        <h2 className="text-lg font-semibold mb-4">
          {editingEvent ? "Edit Event" : "Add New Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <input
              className="w-1/2 border p-2 rounded"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
            <input
              className="w-1/2 border p-2 rounded"
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <select
            className="w-full border p-2 rounded"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="meeting">Meeting</option>
            <option value="task">Task</option>
            <option value="personal">Personal</option>
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {editingEvent ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
