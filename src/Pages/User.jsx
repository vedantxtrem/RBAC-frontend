import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, useDeleteUser } from "../Redux/Slice/UserSlice.js";
import HomeLayout from "../Layout/HomeLayout.jsx";
import { FaTrash, FaEye, FaUserPlus } from "react-icons/fa";
import AddUserModal from "../components/AddUser.jsx";
import { BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading, error } = useSelector((state) => state.User);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 9; 

  const onUserAdded = async () => {
    await dispatch(getUserData());
  }

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
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

 
  const filteredData = userData.filter((it) =>
    it?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
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

  const onDelete = async (id) => {
    const res = await dispatch(useDeleteUser(id));
    console.log(res);
    onUserAdded();
  }

  if (loading) {
    return (
      <HomeLayout>
        <div className="w-screen h-screen flex flex-col justify-center items-center text-center text-gray-700">
          <div class="flex items-center justify-center h-screen">
            <div class="relative">
              <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-300"></div>
              <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-amber-500 animate-spin">
              </div>
            </div>
          </div>
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
      <div className="w-screen min-h-screen lg:ml-auto bg-gradient-to-l from-gray-100 via-amber-50 to-gray-100 lg:w-[94%] p-3 lg:p-6 rounded-lg overflow-x-hidden">

        <div className="w-full flex flex-col lg:flex-row justify-between items-center  mb-4 lg:mt-8 lg:pr-10 gap-5">
          <div className="mt-5 ">
            <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-fit h-10 lg:h-12 flex justify-between gap-2 lg:gap-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name..."
              className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={toggleModal}
              className="flex  items-center bg-amber-400 text-gray-900 whitespace-nowrap px-4 py-2 rounded-lg hover:bg-amber-500"
            >
              <FaUserPlus className="mr-2 hidden" />
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
                      onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })}
                      src={it?.user?.photo || "https://via.placeholder.com/50"}
                      alt={it?.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td
                    onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })}
                    className="px-4 py-2 text-sm font-medium text-gray-800">
                    {it?.user?.name || "N/A"}
                  </td>
                  <td 
                    onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })}
                    className="hidden md:table-cell px-4 py-2 text-sm text-gray-600">
                    {it?.user?.email || "N/A"}
                  </td>
                  <td 
                    onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })}
                    className="hidden lg:table-cell px-4 py-2 text-sm text-gray-600 uppercase">
                    {it?.user?.role || "N/A"}
                  </td>
                  <td
                    onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })}
                    className="hidden lg:table-cell px-4 py-2">
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
                      <button onClick={() => navigate("/user/profile",{ state: { id : it?.user?._id } })} className="text-blue-500 hover:text-blue-700">
                        <FaEye />
                      </button>

                      <button onClick={() => onDelete(it?.user?._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center  mt-24">
          <p className="mt-2 text-2xl  text-center">Oops! User will Not exits Type correct name</p>
          <button
            // onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg"
          >
            Retry
          </button></div>
        )}

        {/* Pagination */}
        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center space-x-1">
          {/* First and Previous */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
          >
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
          >
            &lsaquo;
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, totalPages))
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${page === currentPage
                  ? "bg-amber-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {page}
              </button>
            ))}

          {/* Next and Last */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
          >
            &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
          >
            &raquo;
          </button>
        </div>


        {/* Add User Modal */}
        {isModalOpen && <AddUserModal  onClose={toggleModal} onUserAdded={onUserAdded} />}
      </div>
    </HomeLayout>
  );
};

export default User;
