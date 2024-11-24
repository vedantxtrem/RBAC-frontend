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
    <div className="min-h-screen lg:pl-28 bg-gradient-to-r from-gray-100 to-amber-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Welcome in, VRV Security</h1>
          <p className="text-gray-600 text-sm">MANAGE | USER | ROLES | PERMISSION</p>
        </div>
        <div className="flex space-x-4 justify-center">
          <button className="bg-gray-200 p-2 rounded-full text-gray-600">Settings</button>
          <button className="bg-gray-200 p-2 rounded-full text-gray-600">Profile</button>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-6 px-3 lg:px-0">
        {/* Profile Card */}
        <div className="h-[400px] w-full lg:w-[25%] bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800">Vaishnavi Sahu</h3>
          <p className="text-sm text-gray-500 mb-4">Admin/Manger VRV</p>
          <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">$1,200</span>
        </div>

        {/* Progress & Charts */}
        <div className="h-[400px] w-full lg:w-[45%] bg-white rounded-lg shadow px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
          {/* Chart Wrapper */}
          <div className="h-[85%]">
            <Bar
              data={barData}
              options={{
                ...barOptions,
                maintainAspectRatio: false, // Allow resizing
              }}
              height={null} // Let it stretch based on parent height
            />
          </div>
        </div>


        {/* Time Tracker */}
        <div className="h-[400px] w-full lg:w-[25%] bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Tracker</h3>
          {/* Doughnut Chart Wrapper */}
          <div className="flex-grow flex items-center justify-center" style={{ height: "280px", width: "280px" }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
          {/* Time Display */}
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-gray-800">2:35</p>
            <p className="text-sm text-gray-500">Work Time</p>
          </div>
        </div>


      </div>

      {/* Onboarding Tasks & Calendar */}
      <div className="flex flex-wrap gap-6 mt-6">
        {/* Onboarding Tasks */}
        <div className="flex-1 md:flex-[1_1_45%] bg-white rounded-lg shadow p-6">
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
        <div className="flex-1 md:flex-[1_1_45%] bg-white rounded-lg shadow p-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
