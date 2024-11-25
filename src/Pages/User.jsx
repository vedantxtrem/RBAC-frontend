import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slice/UserSlice.js";
import HomeLayout from "../Layout/HomeLayout.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const User = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="w-screen h-screen flex flex-col justify-center items-center text-center text-gray-700">
          Loading...
        </div>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <div className="text-center text-red-500">{error}</div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="w-screen min-h-screen mt-14 lg:ml-auto bg-gray-100 lg:w-[94%] p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Manage User</h2>
          <p className="text-sm text-gray-500">This is the user data table</p>
        </div>

        <div className="overflow-x-auto">
          {userData.length ? (
            <div className="space-y-4">
              {userData.map((it, index) => (
                <div
                  key={index}
                  className="flex  items-start lg:items-center justify-between bg-white shadow-md p-4 rounded-lg space-y-2 lg:space-y-0"
                >
                  {/* Left: Image and User Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={it?.user?.photo || "https://via.placeholder.com/50"}
                      alt={it?.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {it?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{it?.user?.email}</p>
                    </div>
                  </div>

                  {/* Right: Role, Status, and Actions */}
                  <div className="flex items-center lg:space-x-4 flex-col lg:flex-row space-y-2 lg:space-y-0">
                    {/* Role */}
                    <div className="hidden md:block">
                    <span className="text-xs lg:text-sm font-medium text-gray-600">
                      {it?.user?.role || "N/A"}
                    </span>

                    {/* Status */}
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getStatusClass(
                        it?.user?.status
                      )}`}
                    >
                      {it?.user?.status || "N/A"}
                    </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No users found.</div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default User;
