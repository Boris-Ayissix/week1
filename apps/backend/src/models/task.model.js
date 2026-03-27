// models/task.model.js

export const tasks = [];

export const createTask = (task) => {
  tasks.push(task);
  return task;
};


export const getTasks = () => {
  return tasks;
};