import React, { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

const AUTO_SAVE_KEY = "taskDraft";

const CardEdit = ({ onClose, editableTask = null }) => {
  const { addTask, editTask } = useTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Load draft if not editing
  useEffect(() => {
    if (editableTask) {
      setTitle(editableTask.title);
      setDescription(editableTask.desc);
      setTags(editableTask.tags || []);
    } else {
      const draft = JSON.parse(localStorage.getItem(AUTO_SAVE_KEY));
      if (draft) {
        setTitle(draft.title || "");
        setDescription(draft.description || "");
        setTags(draft.tags || []);
      }
    }
  }, [editableTask]);

  // Auto-save every 5 seconds
  useEffect(() => {
    if (editableTask) return; // skip auto-save if editing

    const interval = setInterval(() => {
      const draft = { title, description, tags };
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(draft));
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, [title, description, tags, editableTask]);

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = { title, desc: description, tags };

    if (editableTask) {
      editTask({ ...taskData, id: editableTask.id });
    } else {
      addTask(taskData);
      localStorage.removeItem(AUTO_SAVE_KEY); // Clear draft
    }

    onClose();
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        {editableTask ? "Edit Task" : "Add Task"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full px-4 py-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full px-4 py-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Tag input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add tag"
          className="flex-1 px-4 py-2 border rounded"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {/* Tag list with delete button */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-200 text-sm px-2 py-1 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              className="text-xs text-red-500"
              onClick={() => handleDeleteTag(tag)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editableTask ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CardEdit;
