import React from "react";

const EventModal = ({ event, onClose, onDelete, onEdit }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white pr-4">
              {event.title}
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

          {/* Event Details */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-1 sm:mb-0 sm:w-20">
                Type:
              </span>
              <span className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium capitalize
                ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                ${event.type === 'task' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${event.type === 'personal' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : ''}
              `}>
                {event.type}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-1 sm:mb-0 sm:w-20">
                Date:
              </span>
              <span className="text-gray-900 dark:text-white text-sm sm:text-base">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-1 sm:mb-0 sm:w-20">
                Time:
              </span>
              <span className="text-gray-900 dark:text-white text-sm sm:text-base">
                {event.startTime} - {event.endTime}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => onEdit(event)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            
            <button
              onClick={() => onDelete(event)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
