import React from 'react';
import Sidebar from '../components/Sidebar';

function HomeLayout({ children }) {
  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-100 to-amber-100">
      <Sidebar />   
      {children}
    </div>
  );
}

export default HomeLayout;
