import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';

export default function EditExpense() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { updateExpense } = useExpenseStore();

    const [amount, setAmount] = useState(state.expense.amount);
    const [category, setCategory] = useState(state.expense.category);
    const [date, setDate] = useState(state.expense.date.split('T')[0]);
    const [paymentMethod, setPaymentMethod] = useState(state.expense.paymentMethod);
    const [notes, setNotes] = useState(state.expense.notes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateExpense(state.expense._id, {
            amount: Number(amount),
            category,
            date,
            paymentMethod,
            notes,
        });
        navigate('/dashboard');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Edit Expense</h2>

                <input
                    className="border p-2 w-full"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Others">Others</option>
                </select>

                <input
                    className="border p-2 w-full"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <select className="border p-2 w-full" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">Select Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Other">Other</option>
                </select>

                <textarea
                    className="border p-2 w-full"
                    placeholder="Notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button className="bg-blue-500 text-white w-full py-2 rounded" type="submit">
                    Update Expense
                </button>
            </form>
        </div>
    );
}
