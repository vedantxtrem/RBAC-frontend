import React, { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { format, subDays } from "date-fns";
import profilepic from "../../public/assets/test.png";
import HomeLayout from "../Layout/HomeLayout";
import Calendar from "../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slice/UserSlice";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HomePage = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const totalUser = userData.length;
  let active = 0;

  const dailyUserCount = {};

  userData.forEach((i) => {
    if (i.user.status === "active") active++;
    const createdAtDate = format(new Date(i.user.createdAt), "dd/MM"); 
    dailyUserCount[createdAtDate] = (dailyUserCount[createdAtDate] || 0) + 1;
  });

  const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), "dd/MM")).reverse();

  const barLabels = last7Days;
  const barValues = barLabels.map((date) => dailyUserCount[date] || 0);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Users Created",
        data: barValues,
        backgroundColor: "#facc15",
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const doughnutData = {
    labels: ["Active user", "Inactive user"],
    datasets: [
      {
        data: [active, totalUser - active],
        backgroundColor: ["#facc15", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const [todoList, setTodoList] = useState([
    { id: 1, task: "Prepare Reports", status: "Pending" },
    { id: 2, task: "Update Team Targets", status: "Done" },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTodo = {
        id: todoList.length + 1,
        task: newTask.trim(),
        status: "Pending",
      };
      setTodoList((prev) => [...prev, newTodo]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Pending" ? "Done" : "Pending" }
          : task
      )
    );
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

  return (
    <HomeLayout>
      <div className="min-h-screen w-full lg:w-[95%] lg:ml-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0 pl-10 lg:pl-0">
            <h1 className="text-2xl font-bold text-gray-800">Welcome in, VRV Security</h1>
            <p className="text-gray-600 text-sm">MANAGE | USER | ROLES | PERMISSION</p>
          </div>
          <div className="flex space-x-4 justify-center">
            {/* <button className="bg-gray-200 p-2 rounded-full text-gray-600">Settings</button> */}
            <button onClick={()=> navigate("/user")} className="bg-gray-200 p-2 px-4 rounded-full text-gray-600">Profiles</button>
          </div>
        </div>

        <div className="w-full flex flex-wrap gap-6 px-3 lg:px-0">

          <div className="h-[400px] w-full lg:w-[25%] bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h3 className="text-xl font-bold  mb-4 text-yellow-400">Admin Profile</h3>
            <img
              src={profilepic}
              alt="Profile"
              className="rounded-full w-[200px] h-[200px] mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">Vaishnavi Sahu</h3>
            <p className="text-sm text-gray-500 mb-4">Admin/Manger VRV</p>
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">Super Admin</span>
          </div>

          <div className="h-[400px] w-full lg:w-[45%] bg-white rounded-lg shadow px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weakly User Onboarded</h3>
            <div className="h-[85%]">
              <Bar
                data={barData}
                options={{
                  ...barOptions,
                  maintainAspectRatio: false, 
                }}
                height={null} 
              />
            </div>
          </div>

          <div className="h-[400px] w-full lg:w-[25%] bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Status</h3>
            <div className="flex-grow flex items-center justify-center" style={{ height: "280px", width: "280px" }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="mt-6 text-center">
              <p className="text-2xl font-medium text-gray-800">Total User : {" " + totalUser}</p>
            </div>
          </div>
        </div>

        <div className="w-[97%] flex flex-wrap gap-x-10 gap-y-5 px-3 lg:px-0 mt-6">

          <div className="w-full flex-1 md:w-[35%] bg-white rounded-lg shadow p-6">

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin To-Do List</h3>
            <div className="space-y-4">
              {todoList.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.status === "Done"}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mr-3"
                    />
                    <span
                      className={`text-sm ${task.status === "Done" ? "line-through text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {task.task}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2"
              />
              <button
                onClick={handleAddTask}
                className="w-full bg-yellow-500 text-white rounded-lg py-2 text-sm font-semibold"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="w-full flex-1 md:w-[55%] bg-white rounded-lg  p-6">
            <Calendar />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
