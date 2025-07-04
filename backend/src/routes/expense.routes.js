import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add', protectRoute, addExpense);           
router.get('/all', protectRoute, getExpenses);           
router.put('/update/:id', protectRoute, updateExpense);  
router.delete('/delete/:id', protectRoute, deleteExpense);

export default router;
