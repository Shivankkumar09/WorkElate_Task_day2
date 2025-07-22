const express = require('express');
const Router = express.Router();
const { addTask, getTasks } = require('../controller/taskController');

Router.post('/task', addTask);
Router.get('/tasks', getTasks);

module.exports = Router;
