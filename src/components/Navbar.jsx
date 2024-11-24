import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">Crextio</h1>
        <div className="flex space-x-6 text-gray-600">
          <a href="#" className="hover:text-gray-900">Dashboard</a>
          <a href="#" className="hover:text-gray-900">People</a>
          <a href="#" className="hover:text-gray-900">Hiring</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
