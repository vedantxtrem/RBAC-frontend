import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import Calendar from "./Calendar";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  // Chart Data for Doughnut
  const doughnutData = {
    labels: ["Work Time", "Remaining Time"],
    datasets: [
      {
        data: [2.35, 24 - 2.35],
        backgroundColor: ["#facc15", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  // Chart Data for Bar Chart
  const barData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Work Time",
        data: [1.5, 2, 2.3, 2.8, 3, 5.25, 6.1],
        backgroundColor: "#facc15",
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="min-h-screen lg:pl-28 bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome in, Nixtio</h1>
          <p className="text-gray-600 text-sm">Interviews | Hired | Project Time | Output</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-200 p-2 rounded-full text-gray-600">Settings</button>
          <button className="bg-gray-200 p-2 rounded-full text-gray-600">Profile</button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Lora Piterson</h3>
          <p className="text-sm text-gray-500 mb-4">UX/UI Designer</p>
          <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">$1,200</span>
        </div>

        {/* Progress & Charts */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Time Tracker */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Tracker</h3>
          <Doughnut data={doughnutData} />
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-gray-800">2:35</p>
            <p className="text-sm text-gray-500">Work Time</p>
          </div>
        </div>
      </div>

      {/* Onboarding Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Onboarding</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Interview</span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Done</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Team Meeting</span>
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">HR Policy Review</span>
              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Pending</span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        {/* <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            <div className="p-2 bg-gray-100 rounded">Mon</div>
            <div className="p-2 bg-gray-100 rounded">Tue</div>
            <div className="p-2 bg-gray-100 rounded">Wed</div>
            <div className="p-2 bg-gray-100 rounded">Thu</div>
            <div className="p-2 bg-gray-100 rounded">Fri</div>
            <div className="p-2 bg-yellow-200 rounded">Sat</div>
            <div className="p-2 bg-gray-100 rounded">Sun</div>
          </div>
        </div> */}
        <Calendar/>
      </div>
    </div>
  );
};

export default Dashboard;
