import React from "react";
import { Chart, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const DashboardStats = () => {
  const doughnutData = {
    labels: ["Completed"],
    datasets: [
      {
        label: "Score",
        data: [70, 30],
        backgroundColor: ["#F59E0B", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Performance",
        data: [20, 40, 60, 80],
        borderColor: "#F59E0B",
        backgroundColor: "#F59E0B",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Success",
        data: [30, 50, 70, 90],
        borderColor: "#10B981",
        backgroundColor: "#10B981",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Innovation",
        data: [10, 30, 20, 40],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="h-full flex flex-row justify-center items-center bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Score Section */}
        <div className="text-center mb-6">
          <div className="relative w-40 h-40 mx-auto">
            <Doughnut data={doughnutData} options={{ cutout: "70%" }} />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-gray-800">70%</span>
              <span className="text-sm text-gray-500">Score</span>
            </div>
          </div>
          <div className="mt-4 text-gray-700 bg-amber-100 text-sm py-1 px-3 rounded-lg inline-block">
            🎉 Fantastic job
          </div>
        </div>

        {/* Statistics Section */}
        <div className="w-full ">
          <h3 className="w-full flex text-lg font-bold text-gray-800 mb-4">Statistics</h3>
          <div className="space-y-4 flex flex-row ">
            <div className="flex   items-center justify-between p-4 bg-amber-100 rounded-lg shadow-sm">
              <div>
                <p className="text-gray-700 text-sm">Performance</p>
                <p className="text-gray-800 font-bold text-xl">+21%</p>
              </div>
              <Line
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  datasets: [
                    {
                      data: [20, 40, 60 ],
                      borderColor: "#F59E0B",
                      fill: false,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
            {/* <div className="flex items-center justify-between p-4 bg-amber-100 rounded-lg shadow-sm">
              <div>
                <p className="text-gray-700 text-sm">Success</p>
                <p className="text-gray-800 font-bold text-xl">+42%</p>
              </div>
              <Line
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  datasets: [
                    {
                      data: [30, 50, 70, 90],
                      borderColor: "#10B981",
                      fill: false,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
                height={40}
                width={100}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-100 rounded-lg shadow-sm">
              <div>
                <p className="text-gray-700 text-sm">Innovation</p>
                <p className="text-gray-800 font-bold text-xl">+12%</p>
              </div>
              <Line
                data={{
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  datasets: [
                    {
                      data: [20, 10, 20],
                      borderColor: "#3B82F6",
                      fill: false,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
                height={40}
                width={100}
              />
            </div> */}
          </div>
        </div>
    </div>
  );
};

export default DashboardStats;
