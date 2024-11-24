import React, { useState, useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { FaUserMd, FaUserCircle, FaUserNurse, FaBloggerB, FaWallet, FaTicketAlt, FaVideo } from "react-icons/fa";
import { CgPill } from "react-icons/cg";
import { GiTicket } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { TbHomeFilled } from "react-icons/tb";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false); // New state for delayed text display
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <TbHomeFilled />, path: "/" },
    { name: "User", icon: <FaUserCircle />, path: "/user" },
    { name: "Employee", icon: <FaUserNurse />, path: "/employee/manage" },
    { name: "Blogs", icon: <FaBloggerB />, path: "/blogs" },
    { name: "Store", icon: <CgPill />, path: "/store" },
    { name: "Wallet", icon: <FaWallet />, path: "/wallet/manage" },
    { name: "Coupons", icon: <GiTicket />, path: "/coupon/manage" },
    { name: "Tickets", icon: <FaTicketAlt />, path: "/ticket/manage" },
    { name: "Meeting", icon: <FaVideo />, path: "/meeting/manage" },
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

  // Close sidebar on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed bg-gray-800 text-white  transition-all duration-150 ease-in-out z-50 ${
          isOpen ? "w-56  lg:rounded-md h-screen lg:h-[95vh] top-0 left-0 lg:top-5 lg:left-3" : "w-16 h-fit lg:h-[95vh] lg:rounded-full top-2 left-2 rounded-xl lg:top-5 lg:left-3"
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
          </div>


          <nav className={`flex-1 mt-4 ${isOpen ? "lg:pl-2" : "hidden lg:block"}`}>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => (navigate(item.path))}
                className={`flex items-center gap-4 w-full p-3 hover:bg-gray-700 transition-all text-gray-400 hover:text-gray-100 ${
                  isOpen ? "justify-start" : "justify-center"
                }`}
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
