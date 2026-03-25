// models/task.model.js

export const tasks = []; // temporary (replace with DB later)

export const createTask = (task) => {
  tasks.push(task);
  return task;
};

export const getTasks = () => tasks;