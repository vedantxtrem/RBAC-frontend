import React from "react";

const TaskList = () => {
  const tasks = [
    { name: "Interview", completed: true },
    { name: "Team Meeting", completed: false },
    { name: "Project Update", completed: false },
  ];

  return (
    <div>
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`flex justify-between items-center py-2 border-b ${
            task.completed ? "text-green-500" : "text-gray-700"
          }`}
        >
          <span>{task.name}</span>
          <span>
            {task.completed ? "✔" : "⏳"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
