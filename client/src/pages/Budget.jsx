import React, { useState, useEffect } from 'react';
import { useBudgetStore } from '../store/useBudgetStore';
import BudgetCard from '../components/BudgetCard';
import Navbar from '../components/Navbar';

export default function Budget() {
    const { budgets, getBudgets, setBudget, isLoading } = useBudgetStore();

    const [category, setCategory] = useState('');
    const [monthlyLimit, setMonthlyLimit] = useState('');

    useEffect(() => {
        getBudgets();
    }, [getBudgets]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !monthlyLimit) return;
        await setBudget({ category, monthlyLimit: Number(monthlyLimit) });
        setCategory('');
        setMonthlyLimit('');
    };

    return (
        <>
            <Navbar />

            <div
                className="min-h-screen bg-gray-100"
                style={{ padding: '24px', margin: 0 }}
            >
                <h1
                    className="text-3xl font-bold text-center"
                    style={{ marginBottom: '24px' }}
                >
                    Manage Budgets
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow max-w-md mx-auto"
                    style={{ padding: '16px', marginBottom: '32px' }}
                >
                    <h2
                        className="text-xl font-bold"
                        style={{ marginBottom: '16px' }}
                    >
                        Set a Category Budget
                    </h2>

                    <select
                        className="border w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ padding: '8px', marginBottom: '12px' }}
                    >
                        <option value="">Select Category</option>
                        {['Food', 'Rent', 'Shopping', 'Travel', 'Entertainment', 'Utilities', 'Healthcare', 'Others'].map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input
                        className="border w-full"
                        type="number"
                        placeholder="Monthly Limit (₹)"
                        value={monthlyLimit}
                        onChange={(e) => setMonthlyLimit(e.target.value)}
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <button
                        className="bg-green-500 text-white w-full rounded"
                        style={{ padding: '8px', margin: 0 }}
                    >
                        Save Budget
                    </button>
                </form>

                <h2
                    className="text-xl font-bold"
                    style={{ marginBottom: '16px' }}
                >
                    Your Budgets
                </h2>

                {isLoading ? (
                    <p>Loading budgets...</p>
                ) : budgets.length === 0 ? (
                    <p className="text-gray-500">No budgets set yet.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {budgets.map((b) => (
                            <BudgetCard
                                key={b._id}
                                category={b.category}
                                monthlyLimit={b.monthlyLimit}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
