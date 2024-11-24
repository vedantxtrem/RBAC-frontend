import React from "react";

const TimeTracker = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full text-gray-300" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="75, 100"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">2:35</span>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
