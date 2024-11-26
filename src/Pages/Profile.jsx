import React, { useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import HomeLayout from "../Layout/HomeLayout";
import { MdEmail, MdWork, MdLocationOn, MdPhone } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";

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

    const handleTogglePermission = (key) => {
        setPermissions((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key],
            },
        }));
    };

    const chartData = {
        labels: ["Active", "Inactive", "Pending"],
        datasets: [
            {
                data: [70, 20, 10],
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                hoverBackgroundColor: ["#66BB6A", "#FFD54F", "#E57373"],
                borderWidth: 1,
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
                <h1 className="text-3xl font-medium mb-6 text-gray-800">User Profile</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* User Info Card */}
                    <div className="flex flex-col lg:flex-row gap-6 w-full bg-white rounded-lg shadow-md p-6">

                        <img
                            src={user.photo}
                            alt={user.name}
                            className="w-full md:w-[180px] lg:w-[210px] object-cover border-4 border-amber-300 rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl md:text-3xl font-bold">{user.name}</h2>
                            <p className="text-gray-700">
                                {user.bio.split(" ").slice(0, 20).join(" ")}
                                {user.bio.split(" ").length > 20 && "..."}
                            </p>
                            <div className="mt-4 flex flex-col gap-2 text-sm">
                                <p className="flex items-center gap-2">
                                    <MdWork className="text-amber-400" />
                                    <span>Company: VRV Security</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <MdEmail className="text-amber-400" />
                                    <span>Email: {user.email}</span>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {[
                        {
                            title: "Store Management",
                            description: "Manage store-related operations and inventory.",
                            key: "storeManagement",
                            color: "blue",
                        },
                        {
                            title: "Blog Management",
                            description: "Control blog posts and user-generated content.",
                            key: "blogManagement",
                            color: "green",
                        },
                        {
                            title: "Wallet Management",
                            description: "Manage user wallets and financial transactions.",
                            key: "walletManagement",
                            color: "red",
                        },
                    ].map(({ title, description, key, color }) => (
                        <div
                            key={key}
                            className={`p-6 rounded-lg shadow-md bg-${color}-100`}
                        >
                            <h3 className={`text-lg font-bold text-${color}-800`}>{title}</h3>
                            <p className="text-gray-700">{description}</p>
                            <div
                                onClick={() => handleTogglePermission(key)}
                                className={`w-12 h-6 mt-4 flex items-center rounded-full cursor-pointer p-1 ${permissions.permissions[key]
                                    ? `bg-${color}-400`
                                    : "bg-gray-400"
                                    }`}
                            >
                                <div
                                    className={`h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out ${permissions.permissions[key]
                                        ? "translate-x-6 bg-white"
                                        : "translate-x-0 bg-gray-300"
                                        }`}
                                ></div>
                            </div>
                            <span
                                className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${permissions.permissions[key]
                                    ? `bg-${color}-300 text-${color}-800`
                                    : "bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {permissions.permissions[key] ? "Enabled" : "Disabled"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
};

export default Profile;
