const Task = require('../db/taskSchema');

 const addTask = async (req, res) => {
     try {
    const { title, desc, tags } = req.body;
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    const newTask = new Task({ title, desc, tags: tagArray });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

 const getTasks = async (req, res) => {
    try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

module.exports = {
  addTask,
  getTasks,
};
