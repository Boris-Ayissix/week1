// services/task.service.js

import { createTask, getTasks } from '../models/task.model.js';

export const addTask = (data) => {
  if (!data.title) {
    throw new Error("Title is required");
  }

  const newTask = {
    id: Date.now(),
    title: data.title,
  };

  return createTask(newTask);
};

export const fetchTasks = () => {
  return getTasks();
};