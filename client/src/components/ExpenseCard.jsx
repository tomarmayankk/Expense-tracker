import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import { Edit, Trash } from 'lucide-react';

export default function ExpenseCard({ expense }) {
    const navigate = useNavigate();
    const { deleteExpense } = useExpenseStore();

    const handleEdit = () => {
        navigate(`/edit-expense/${expense._id}`, { state: { expense } });
    };

    return (
        <div
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
            style={{ padding: '16px', margin: 0 }}
        >
            <div className="flex justify-between" style={{ marginBottom: '8px' }}>
                <h3 className="text-xl font-semibold">{expense.category}</h3>
                <span className="text-green-600 font-bold">₹ {expense.amount}</span>
            </div>

            <div className="text-sm text-gray-600" style={{ marginBottom: '8px' }}>
                <p>Payment: {expense.paymentMethod}</p>
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                {expense.notes && (
                    <p className="text-gray-500 italic mt-1">
                        "{expense.notes}"
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white rounded"
                    style={{ padding: '4px 12px', margin: 0 }}
                    onClick={handleEdit}
                >
                    <Edit/>
                </button>
                <button
                    className="bg-red-500 text-white rounded"
                    style={{ padding: '4px 12px', margin: 0 }}
                    onClick={() => deleteExpense(expense._id)}
                >
                    <Trash/>
                </button>
            </div>
        </div>
    );
}
