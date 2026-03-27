// apps/backend/src/app.js

import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', analyticsRoutes);
export default app;