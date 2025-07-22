import { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks, createTask } from '../service/api'; // backend calls

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // ✅ On mount, fetch tasks from backend
  useEffect(() => {
    const getTasksFromServer = async () => {
      try {
        const res = await fetchTasks();
        setTasks(res.data); // from MongoDB
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    getTasksFromServer();
  }, []);

  // ✅ Add Task: backend + local
  const addTask = async (task) => {
    const taskWithFallbackId = { ...task, id: Date.now() }; // local fallback id

    try {
      const res = await createTask(task); // no id needed, backend generates Mongo _id
      const savedTask = res.data;

      // fallback to local id if backend failed
      setTasks((prev) => [...prev, savedTask || taskWithFallbackId]);
    } catch (err) {
      console.error("Failed to add task to server. Using local only.", err);
      setTasks((prev) => [...prev, taskWithFallbackId]);
    }
  };

  // ✅ Local-only Delete
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id && t._id !== id)); // handles both local id and Mongo _id
    }
  };

  // ✅ Local-only Edit
  const editTask = (updatedTask) => {
    setTasks(tasks.map((t) =>
      t.id === updatedTask.id || t._id === updatedTask._id ? updatedTask : t
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
