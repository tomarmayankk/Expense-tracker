import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import Navbar from '../components/Navbar';

export default function AddExpense() {
    const { addExpense, isLoading } = useExpenseStore();
    const navigate = useNavigate();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addExpense({
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

            <div
                className="flex justify-center items-center bg-gray-100"
                style={{ margin: 0, padding: 0, minHeight: '80vh', marginTop: '64px' }} // Adjust marginTop for navbar height
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded shadow w-96"
                    style={{ padding: '24px', margin: 0 }}
                >
                    <h2
                        className="text-2xl font-bold text-center"
                        style={{ marginBottom: '16px' }}
                    >
                        Add Expense
                    </h2>

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
                        <option value="UPI">UPI</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Other">Other</option>
                    </select>

                    <textarea
                        className="border w-full"
                        placeholder="Note"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <button
                        className="bg-green-500 text-white w-full rounded"
                        type="submit"
                        disabled={isLoading}
                        style={{ padding: '8px', margin: 0 }}
                    >
                        {isLoading ? 'Adding...' : 'Add Expense'}
                    </button>
                </form>
            </div>
        </>
    );
}
