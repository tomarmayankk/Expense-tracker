import axios from 'axios';
import Expense from '../models/expense.model.js';

export const getSmartSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const expenses = await Expense.find({
            userId: userId,   // ✅ FIXED field name
            date: { $gte: last30Days }
        });

        const formattedExpenses = expenses.map(exp => ({
            amount: exp.amount,
            category: exp.category,
            date: exp.date,
        }));

        const flaskResponse = await axios.post(
            'https://expense-tracker-1-hdc3.onrender.com/suggestions',
            { expenses: formattedExpenses },
            { timeout: 5000 }
        );

        res.json(flaskResponse.data);
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
