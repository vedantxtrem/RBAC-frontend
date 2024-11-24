import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameDay, isToday, addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get dates for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);

  // Handle navigation between months
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Generate the days for the calendar
  const generateDays = () => {
    const days = [];
    let day = startDate;
    while (day <= monthEnd) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      days.push(week);
    }
    return days;
  };

  return (
    <div className="col-span-2 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600">
          &lt;
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button onClick={nextMonth} className="text-gray-600">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-500">
            {day}
          </div>
        ))}

        {generateDays().map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <div
                key={j}
                className={`p-2 rounded ${
                  isToday(day)
                    ? "bg-yellow-200 text-gray-900 font-bold"
                    : isSameDay(day, new Date())
                    ? "bg-gray-300 text-gray-900"
                    : day.getMonth() === currentMonth.getMonth()
                    ? "bg-gray-100 text-gray-800"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                {format(day, "d")}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
