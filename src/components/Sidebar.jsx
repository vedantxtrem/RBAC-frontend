import React, { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { FaUserMd, FaUserCircle, FaUserNurse, FaBloggerB, FaWallet, FaTicketAlt, FaVideo } from "react-icons/fa";
import { CgPill } from "react-icons/cg";
import { GiTicket } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false); // New state for delayed text display

  const menuItems = [
    { name: "Manage Doctor", icon: <FaUserMd />, path: "/doctor/manage" },
    { name: "Manage User", icon: <FaUserCircle />, path: "/user/manage" },
    { name: "Manage Employee", icon: <FaUserNurse />, path: "/employee/manage" },
    { name: "Manage Blogs", icon: <FaBloggerB />, path: "/blogs" },
    { name: "Manage Store", icon: <CgPill />, path: "/store" },
    { name: "Manage Wallet", icon: <FaWallet />, path: "/wallet/manage" },
    { name: "Manage Coupons", icon: <GiTicket />, path: "/coupon/manage" },
    { name: "Manage Tickets", icon: <FaTicketAlt />, path: "/ticket/manage" },
    { name: "Manage Meeting", icon: <FaVideo />, path: "/meeting/manage" },
  ];

  // Effect to delay the appearance of text
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 200); // 200ms delay
      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      setShowText(false); // Hide text immediately when closing
    }
  }, [isOpen]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 lg:top-5 lg:left-3 bg-gray-800 text-white  transition-all duration-150 ease-in-out z-50 ${
          isOpen ? "w-64 lg:rounded-md h-screen lg:h-[95vh] " : "w-16 h-fit lg:h-[95vh] lg:rounded-full"
        }`}
      >
        <div className="flex flex-col lg:mt-3 h-full">
          {/* Toggle Button */}
          <div className="w-full flex items-center gap-4  p-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl text-gray-400 hover:text-gray-100"
            >
              <BiMenu />
            </button>
            {/* {showText && isOpen && <span className="text-md">Menu</span>} */}

          </div>

          {/* Menu Items */}
          <nav className={` flex-1 mt-4 ${ isOpen? "lg:pl-2" : "hidden lg:block"} `}>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => (window.location.href = item.path)}
                className={`flex items-center gap-4 w-full p-3 hover:bg-gray-700  transition-all text-gray-400 hover:text-gray-100 ${
                  isOpen ? "justify-start" : "justify-center"
                }`}creen
              >
                <span className="text-xl">{item.icon}</span>
                {showText && isOpen && <span className="text-md">{item.name}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
