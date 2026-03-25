// controllers/task.controller.js

import { addTask, fetchTasks } from '../services/task.service.js';

export const createTaskController = (req, res) => {
  try {
    const task = addTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasksController = (req, res) => {
  res.json(fetchTasks());
};