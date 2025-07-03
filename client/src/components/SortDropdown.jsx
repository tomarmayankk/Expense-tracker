import React from 'react';

export default function SortDropdown({ sortOption, setSortOption }) {
    return (
        <div className="flex justify-end" style={{ marginBottom: '24px' }}>
            <select
                className="border rounded"
                style={{ padding: '8px', margin: 0 }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="dateDesc">Date: Newest First</option>
                <option value="dateAsc">Date: Oldest First</option>
                <option value="amountDesc">Amount: High to Low</option>
                <option value="amountAsc">Amount: Low to High</option>
                <option value="paymentAsc">Payment: A-Z</option>
                <option value="paymentDesc">Payment: Z-A</option>
            </select>
        </div>
    );
}
