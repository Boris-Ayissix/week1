import { createTask, getTasks } from '../models/task.model.js';

export const addTask = (data) => {
  if (!data.title) throw new Error("Title is required");
  return createTask({ id: Date.now(), ...data });
};

export const fetchTasks = () => getTasks();