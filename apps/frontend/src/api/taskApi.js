// src/api/taskApi.js

const API_URL = "http://localhost:5000/api/tasks";

// 🔹 Fetch all tasks
export const fetchTasks = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error (fetchTasks):", error);
    throw error;
  }
};

// 🔹 Create a task
export const createTask = async (task) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error (createTask):", error);
    throw error;
  }
};