import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import Navbar from '../components/Navbar';

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
        <>
            <Navbar />
            <div className="flex justify-center items-center bg-gray-100" style={{ minHeight: 'calc(100vh - 64px)', padding: '24px', marginTop: '64px' }}>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow w-96" style={{ padding: '24px', margin: 0 }}>
                    <h2 className="text-2xl font-bold text-center" style={{ marginBottom: '16px' }}>Edit Expense</h2>

                    <input
                        className="border w-full"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <select
                        className="border w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    >
                        <option value="">Select Category</option>
                        {['Food', 'Rent', 'Shopping', 'Travel', 'Entertainment', 'Utilities', 'Healthcare', 'Others'].map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input
                        className="border w-full"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <select
                        className="border w-full"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    >
                        <option value="">Select Payment Method</option>
                        {['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Net Banking', 'Other'].map((method) => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>

                    <textarea
                        className="border w-full"
                        placeholder="Notes (optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <button
                        className="bg-blue-500 text-white w-full rounded"
                        type="submit"
                        style={{ padding: '8px', margin: 0 }}
                    >
                        Update Expense
                    </button>
                </form>
            </div>
        </>
    );
}
