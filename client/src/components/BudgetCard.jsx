import React from 'react';

export default function BudgetCard({ category, monthlyLimit }) {
    return (
        <div
            className="bg-white rounded-xl shadow"
            style={{ padding: '16px', margin: 0 }}
        >
            <h3
                className="text-lg font-bold"
                style={{ marginBottom: '8px' }}
            >
                {category}
            </h3>
            <p style={{ margin: 0 }}>Limit: ₹ {monthlyLimit}</p>
        </div>
    );
}
