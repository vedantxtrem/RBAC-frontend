import React, { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import HomeLayout from "../Layout/HomeLayout";
import { MdEmail, MdWork, MdLocationOn, MdPhone, MdEdit } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getUserById, useUpdatePermission  } from "../Redux/Slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

Chart.register(ArcElement, Tooltip, Legend);

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = location.state || {};

    const { userOne, loading, error } = useSelector((state) => state.User);

    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (userOne && userOne.user) {
            setUser(userOne.user);
            setPermissions(userOne.permission);
        }
    }, [userOne]);

    const handleTogglePermission = async (key) => {
        if (!permissions) return;
    
        try {
            // Prepare updated permissions
            const updatedPermissions = {
                ...permissions.permissions,
                [key]: !permissions.permissions[key],
            };
    
            const data = {
                permissions: updatedPermissions,
            };
    
            console.log("Dispatching with data:", data);
    
            // Dispatch the thunk and handle response
            const result = await dispatch(useUpdatePermission({ id, data })).unwrap();
    
            // If successful, update local state
            setPermissions((prev) => ({
                ...prev,
                permissions: updatedPermissions,
            }));
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
    };
    
    

    const chartData = {
        labels: ["Score", "Total"],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ["#facc15", "#e5e7eb"],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

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

    if (error || !user || !permissions) return <p>Error loading user profile. Please try again later.</p>;

    return (
        <HomeLayout>
            <div className="w-full h-full lg:h-screen p-6 lg:pl-36 py-5">
                <h1 className="text-3xl text-center lg:text-left lg:mt-10 font-medium mb-6 text-gray-800">User Profile</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* User Info Card */}
                    <div className="relative flex flex-col lg:flex-row gap-6 w-full bg-white rounded-lg shadow-md p-6">
                        <div className="absolute hidden md:block md:top-5 md:right-6 text-gray-700 cursor-pointer hover:text-gray-800">
                            <MdEdit size={24} />
                        </div>
                        <img
                            src={user.photo || "/placeholder.png"}
                            alt={user.name || "User"}
                            className="w-full mt-2 md:mt-0 md:w-[180px] lg:w-[210px] object-cover border-4 border-amber-300 rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="relative w-fit text-xl md:text-3xl font-bold">{user.name || "Unnamed User"}
                                <div className="absolute md:hidden -right-10 top-1 text-gray-700 cursor-pointer hover:text-gray-800">
                                    <MdEdit size={20} />
                                </div>
                            </h2>

                            <p className="text-gray-500 lg:w-[90%]">{user.bio || "No bio available."}</p>

                            <div className="mt-4 flex flex-col gap-2 text-[16px]">
                                <p className="flex items-center gap-2">
                                    <MdWork className="text-amber-400" />
                                    <span>Company: {"VRV Security"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdEmail className="text-amber-400" />
                                    <span>Email: {user.email}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaUser className="text-amber-400" />
                                    <span>Role: {user.role || "N/A"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdPhone className="text-amber-400" />
                                    <span>Phone: {"+91 76106114584"}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdLocationOn className="text-amber-400" />
                                    <span>Location: {"India"}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Overview */}
                    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Status Overview</h2>
                        <div className="relative w-full h-64">
                            <Doughnut data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Permission Management */}
                <h2 className="text-2xl font-medium text-gray-900 my-6">Permission Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {permissions &&
                        Object.keys(permissions.permissions).map((key) => (
                            <div
                                key={key}
                                className={`p-6 rounded-lg shadow-md bg-gradient-to-r from-amber-300 to-amber-400 text-gray-950`}
                            >
                                <h3 className="text-xl font-bold">{key.replace(/([A-Z])/g, " $1")}</h3>
                                <p>Manage {key.replace(/([A-Z])/g, " $1")} settings.</p>
                                <div className="w-full flex gap-5 items-center">
                                    <div
                                        onClick={() => handleTogglePermission(key)}
                                        className={`w-12 h-6 mt-4 flex items-center rounded-full cursor-pointer p-1 ${permissions.permissions[key] ? "bg-amber-600" : "bg-white"
                                            }`}
                                    >
                                        <div
                                            className={`h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out ${permissions.permissions[key]
                                                    ? "translate-x-6 bg-white"
                                                    : "translate-x-0 bg-gray-300"
                                                }`}
                                        ></div>
                                    </div>
                                    <div
                                        className={`mt-4 inline-block px-2 py-[1px] rounded-full text-sm ${permissions.permissions[key]
                                                ? "bg-amber-500 text-black"
                                                : "bg-white text-black"
                                            }`}
                                    >
                                        {permissions.permissions[key] ? "Enabled" : "Disabled"}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </HomeLayout>
    );
};

export default Profile;
