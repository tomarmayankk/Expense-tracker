import Expense from "../models/expense.model.js";


export const addExpense = async (req, res) => {
    const { amount, category, date, paymentMethod, notes } = req.body;

    try {
        const newExpense = new Expense({
            userId: req.user._id,
            amount,
            category,
            date,
            paymentMethod,
            notes
        });

        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        console.error("Error adding expense:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getExpenses = async (req, res) => {
    const { category, paymentMethod, startDate, endDate, search } = req.query;

    let filter = { userId: req.user._id };

    if (category) filter.category = category;
    if (paymentMethod) filter.paymentMethod = paymentMethod;
    if (startDate && endDate) {
        filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const expenses = await Expense.find(filter).sort({ date: -1 });

        
        const filteredExpenses = search
            ? expenses.filter(exp => exp.notes && exp.notes.toLowerCase().includes(search.toLowerCase()))
            : expenses;

        res.status(200).json(filteredExpenses);
    } catch (error) {
        console.error("Error getting expenses:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, category, date, paymentMethod, notes } = req.body;

    try {
        const expense = await Expense.findOne({ _id: id, userId: req.user._id });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        expense.amount = amount ?? expense.amount;
        expense.category = category ?? expense.category;
        expense.date = date ?? expense.date;
        expense.paymentMethod = paymentMethod ?? expense.paymentMethod;
        expense.notes = notes ?? expense.notes;

        await expense.save();

        res.status(200).json(expense);
    } catch (error) {
        console.error("Error updating expense:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
