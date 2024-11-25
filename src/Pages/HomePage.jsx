import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { format, subDays } from "date-fns";
import profilepic from "../../public/assets/test.png";
import HomeLayout from "../Layout/HomeLayout";
import Calendar from "../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slice/UserSlice";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HomePage = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const totalUser = userData.length;
  let active = 0;

  const dailyUserCount = {};

  // Process user data
  userData.forEach((i) => {
    if (i.user.status === "active") active++;
    const createdAtDate = format(new Date(i.user.createdAt), "dd/MM"); // Format date to dd/MM
    dailyUserCount[createdAtDate] = (dailyUserCount[createdAtDate] || 0) + 1;
  });

  // Generate the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), "dd/MM")).reverse();

  // Bar chart data for the last 7 days
  const barLabels = last7Days;
  const barValues = barLabels.map((date) => dailyUserCount[date] || 0);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Users Created",
        data: barValues,
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

  const doughnutData = {
    labels: ["Active user", "Inactive user"],
    datasets: [
      {
        data: [active, totalUser - active],
        backgroundColor: ["#facc15", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <HomeLayout>
      <div className="min-h-screen w-full lg:w-[95%] lg:ml-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0 pl-10 lg:pl-0">
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
              src={profilepic}
              alt="Profile"
              className="rounded-full w-[200px] h-[200px] mb-4"
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Status</h3>
            {/* Doughnut Chart Wrapper */}
            <div className="flex-grow flex items-center justify-center" style={{ height: "280px", width: "280px" }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
            {/* Time Display */}
            <div className="mt-6 text-center">
              <p className="text-2xl font-medium text-gray-800">Total User : {" " + totalUser}</p>
            </div>
          </div>
        </div>

        {/* Onboarding Tasks & Calendar */}
        <div className="w-[97%] flex flex-wrap gap-x-10 mt-6">
          {/* Onboarding Tasks */}
          <div className="w-full flex-1 md:w-[35%] bg-white rounded-lg shadow p-6">
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
          <div className="w-full flex-1 md:w-[55%] bg-white rounded-lg shadow p-6">
            <Calendar />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
