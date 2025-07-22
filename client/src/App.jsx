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
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {allTags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            #{tag}
          </button>
        ))}
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
