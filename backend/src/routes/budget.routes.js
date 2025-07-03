import express from 'express';
import { setBudget, getBudgets, checkBudgetAlerts } from '../controllers/budget.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/set', protectRoute, setBudget);         // ➤ setBudget()
router.get('/all', protectRoute, getBudgets);         // ➤ getBudgets()
router.get('/alerts', protectRoute, checkBudgetAlerts); // ➤ checkBudgetAlerts()

export default router;
