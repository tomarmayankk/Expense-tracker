import React, { useEffect, useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import Navbar from '../components/Navbar';
import SortDropdown from '../components/SortDropdown';
import ExpenseCard from '../components/ExpenseCard';

export default function AllExpenses() {
    const { expenses, getExpenses, isLoading } = useExpenseStore();
    const [sortOption, setSortOption] = useState('dateDesc');

    useEffect(() => {
        getExpenses();
    }, [getExpenses]);

    const sortedExpenses = [...expenses].sort((a, b) => {
        if (sortOption === 'amountAsc') return a.amount - b.amount;
        if (sortOption === 'amountDesc') return b.amount - a.amount;
        if (sortOption === 'paymentAsc') return a.paymentMethod.localeCompare(b.paymentMethod);
        if (sortOption === 'paymentDesc') return b.paymentMethod.localeCompare(a.paymentMethod);
        if (sortOption === 'dateAsc') return new Date(a.date) - new Date(b.date);
        if (sortOption === 'dateDesc') return new Date(b.date) - new Date(a.date);
        return 0;
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100" style={{ padding: '24px', marginTop: '64px' }}>
                <h1 className="text-3xl font-bold text-center" style={{ marginBottom: '24px' }}>All Expenses</h1>

                <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

                {isLoading ? (
                    <p className="text-center text-lg">Loading expenses...</p>
                ) : sortedExpenses.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No expenses found.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedExpenses.map(expense => (
                            <ExpenseCard key={expense._id} expense={expense} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
