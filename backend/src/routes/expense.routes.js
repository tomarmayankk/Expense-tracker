import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add', protectRoute, addExpense);           // ➤ addExpense()
router.get('/all', protectRoute, getExpenses);           // ➤ getAllExpenses()
router.put('/update/:id', protectRoute, updateExpense);  // ➤ updateExpense()
router.delete('/delete/:id', protectRoute, deleteExpense); // ➤ deleteExpense()

export default router;
