// routes/task.routes.js

import express from 'express';
import { createTaskController, getTasksController } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/', createTaskController);
router.get('/', getTasksController);

export default router;