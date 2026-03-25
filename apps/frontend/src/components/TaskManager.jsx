// components/TaskManager.jsx

import { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../api/taskApi';

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchTasks();
      setTasks(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title });
    setTitle('');
    loadTasks();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};