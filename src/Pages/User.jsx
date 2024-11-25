import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slice/UserSlice.js";
import HomeLayout from "../Layout/HomeLayout.jsx";

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
    return <HomeLayout><div className="w-screen h-screen flex flex-col justify-center items-center text-center text-gray-700">Loading...</div></HomeLayout> ;
  }

  if (error) {
    return <HomeLayout><div className=" text-center text-red-500">{error}</div></HomeLayout>;
  }

  return (
    <HomeLayout>
      <div className="w-screen min-h-screen mt-14 lg:ml-auto bg-gray-100 lg:w-[94%]  p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Manage User</h2>
          <p className="text-sm text-gray-500">This is the user data table</p>
        </div>

        <div className="overflow-x-auto">
          {userData.length ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Name</th>
                  <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Email</th>
                  <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Role</th>
                  <th className="text-left text-sm font-semibold text-gray-500 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((it, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">{it?.user?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{it?.user?.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{it?.user?.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusClass(
                          it?.user?.status
                        )}`}
                      >
                        {it?.user?.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No users found.</div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default User;
