import React from 'react';
import Sidebar from '../components/Sidebar';

function HomeLayout({ children }) {
  return (
    <div className="w-screen min-h-screen overflow-hidden bg-gradient-to-r from-gray-100 via-gray-100 to-amber-100">

      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

export default HomeLayout;
