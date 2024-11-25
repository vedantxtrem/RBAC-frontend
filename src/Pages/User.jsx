import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slice/UserSlice.js";
import HomeLayout from "../Layout/HomeLayout.jsx";
import { FaTrash, FaEye, FaUserPlus } from "react-icons/fa";
import AddUserModal from "../components/AddUser.jsx";

const User = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.User);

  const [searchQuery, setSearchQuery] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 10; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

  // Filtered data based on search query
  const filteredData = userData.filter((it) =>
    it?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      <div className="w-screen min-h-screen lg:ml-auto bg-gradient-to-l from-gray-100 via-amber-50 to-gray-100 lg:w-[94%] p-6 rounded-lg overflow-x-hidden">
        
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-4 lg:mt-8 lg:pr-10 gap-2">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
            {/* <p className="text-sm text-gray-500">This is the user data table</p> */}
          </div>

          {/* Search Input */}
          <div className="h-12 flex justify-between gap-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name..."
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={toggleModal}
              className="flex  items-center bg-amber-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-500"
            >
              <FaUserPlus className="mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* User Table */}
        {currentData.length ? (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Name
                </th>
                <th className="hidden md:table-cell px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Email
                </th>
                <th className="hidden lg:table-cell px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Role
                </th>
                <th className="hidden lg:table-cell px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-[18px] font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((it, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">
                    <img
                      src={it?.user?.photo || "https://via.placeholder.com/50"}
                      alt={it?.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {it?.user?.name || "N/A"}
                  </td>
                  <td className="hidden md:table-cell px-4 py-2 text-sm text-gray-600">
                    {it?.user?.email || "N/A"}
                  </td>
                  <td className="hidden lg:table-cell px-4 py-2 text-sm text-gray-600">
                    {it?.user?.role || "N/A"}
                  </td>
                  <td className="hidden lg:table-cell px-4 py-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getStatusClass(
                        it?.user?.status
                      )}`}
                    >
                      {it?.user?.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-8">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No users found.</div>
        )}

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-400`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Add User Modal */}
        {isModalOpen && <AddUserModal onClose={toggleModal} />}
      </div>
    </HomeLayout>
  );
};

export default User;
