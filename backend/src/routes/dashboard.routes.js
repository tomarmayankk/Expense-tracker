import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/summary', protectRoute, getDashboardSummary);

export default router;
