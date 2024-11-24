import React from "react";

const DashboardCard = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default DashboardCard;
