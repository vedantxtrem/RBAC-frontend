import React, { useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import HomeLayout from "../Layout/HomeLayout";
import { MdEmail, MdWork, MdLocationOn, MdPhone, MdEdit } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { FaUser } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend);

const Profile = () => {
    const [user, setUser] = useState({
        _id: "6745401e9a8dce0457d980bf",
        name: "Dr Venketesh",
        email: "venki@mmihostiptal.com",
        role: "user",
        status: "active",
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis id, accusantium esse velit aliquam maxime quos laudantium?",
        photo:
            "https://res.cloudinary.com/dt5akmcnd/image/upload/v1732603923/damcwgr1nczdmpq3iwxj.jpg",
        skills: ["Mern"],
        createdAt: "2024-11-26T03:27:26.492Z",
    });

    const [permissions, setPermissions] = useState({
        roles: {
            user: true,
            admin: false,
            subadmin: false,
        },
        permissions: {
            storeManagement: false,
            blogManagement: true,
            walletManagement: false,
        },
    });

    const handleTogglePermission = async (key) => {
        try {
            const updatedPermissions = {
                ...permissions.permissions,
                [key]: !permissions.permissions[key],
            };

            // Update backend
            const response = await axios.post("/api/update-permissions", {
                userId: user._id,
                permissions: updatedPermissions,
            });

            if (response.status === 200) {
                setPermissions((prev) => ({
                    ...prev,
                    permissions: updatedPermissions,
                }));
            } else {
                console.error("Failed to update permissions");
            }
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

    return (
        <HomeLayout>
            <div className="w-full h-full lg:h-screen p-6 lg:pl-36 py-5">
                <h1 className="text-3xl text-center lg:text-left lg:mt-10 font-medium mb-6 text-gray-800">User Profile</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* User Info Card */}
                    <div className=" relative flex flex-col lg:flex-row gap-6 w-full bg-white rounded-lg shadow-md p-6">
                        <div className="absolute hidden md:block  md:top-5  md:right-6 text-gray-700 cursor-pointer hover:text-gray-800">
                            <MdEdit size={24} />
                        </div>
                        <img
                            src={user.photo}
                            alt={user.name}
                            className="w-full mt-2 md:mt-0 md:w-[180px] lg:w-[210px] object-cover border-4 border-amber-300 rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="relative w-fit text-xl md:text-3xl font-bold">
                                {user.name}
                                <div className="absolute top-1 -right-10  md:hidden text-gray-700 cursor-pointer hover:text-gray-800">
                            <MdEdit size={20} />
                        </div>
                            </h2>
                            <p className="text-gray-500 lg:w-[90%]">
                                {user.bio.split(" ").slice(0, 20).join(" ")}
                                {user.bio.split(" ").length > 20 && "..."}
                            </p>
                            <div className="mt-4 flex flex-col gap-2 text-[16px]">
                                <p className="flex items-center gap-2">
                                    <MdWork className="text-amber-400" />
                                    <span>Company: VRV Security</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdEmail className="text-amber-400" />
                                    <span>Email: {user.email}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaUser className="text-amber-400" />
                                    <span >Role: <span className="uppercase">{user.role}</span> </span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdPhone className="text-amber-400" />
                                    <span>Phone: +380 955 5662 66</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdLocationOn className="text-amber-400" />
                                    <span>Location: India</span>
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
                    {[
                        {
                            title: "Store Management",
                            description: "Manage store-related operations and inventory.",
                            key: "storeManagement",
                        },
                        {
                            title: "Blog Management",
                            description: "Control blog posts and user-generated content.",
                            key: "blogManagement",
                        },
                        {
                            title: "Wallet Management",
                            description: "Manage user wallets and financial transactions.",
                            key: "walletManagement",
                        },
                    ].map(({ title, description, key }) => (
                        <div
                            key={key}
                            className={`p-6 rounded-lg shadow-md bg-gradient-to-r from-amber-300 to-amber-400 text-gray-950`}
                        >
                            <h3 className="text-xl font-bold">{title}</h3>
                            <p>{description}</p>
                            <div className="w-full  flex  gap-5 items-center">
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
