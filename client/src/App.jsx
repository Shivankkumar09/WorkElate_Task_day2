import React, { useState } from "react";
import { useTask } from "./context/TaskContext";
import CardEdit from "./components/CardEdit";
import CardList from "./components/CardList";

const App = () => {
  const { tasks } = useTask();
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // NEW
  const [selectedTag, setSelectedTag] = useState(null);
  const allTags = [...new Set(tasks.flatMap(task => task.tags || []))];

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToEdit(null);
  };

  const filteredTasks = selectedTag
  ? tasks.filter(task => task.tags?.includes(selectedTag))
  : tasks;

 return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Add Task +
      </button>
    </div>

    {/* ✅ Step 4: Tag Filter Buttons (Place this here) */}
    {allTags.length > 0 && (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Tag</label>
    <select
      value={selectedTag || ""}
      onChange={(e) => setSelectedTag(e.target.value || null)}
      className="w-60 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400 bg-white"
    >
      <option value="">All</option>
      {allTags.map((tag, idx) => (
        <option key={idx} value={tag}>
          #{tag}
        </option>
      ))}
    </select>
  </div>
)}

    {/* ✅ Step 5: Pass filteredTasks to CardList */}
    {filteredTasks.length === 0 ? (
      <p className="text-gray-500">No tasks available for selected tag.</p>
    ) : (
      <CardList onEdit={handleEdit} tasks={filteredTasks} />
    )}

    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <CardEdit onClose={handleCloseModal} editableTask={taskToEdit} />
        </div>
      </div>
    )}
  </div>
);
};

export default App;
