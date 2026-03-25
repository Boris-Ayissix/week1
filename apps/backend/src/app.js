// apps/backend/src/app.js

import express from 'express';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

export default app;