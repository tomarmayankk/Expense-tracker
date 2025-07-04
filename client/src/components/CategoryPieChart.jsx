import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28', '#d0ed57', '#a4de6c'];

export function CategoryPieChart({ data }) {
    const chartData = Object.entries(data || {}).map(([category, value]) => ({
        name: category,
        value
    }));

    return (
        <div className="bg-white rounded-xl shadow" style={{ padding: '16px', marginBottom: '24px' }}>
            <h3 className="text-xl font-bold" style={{ marginBottom: '16px' }}>Spending by Category</h3>
            {chartData.length === 0 ? (
                <p className="text-gray-500">No category-wise data available</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export function CategoryBarChart({ data }) {
    const chartData = Object.entries(data || {}).map(([method, total]) => ({
        method,
        total
    }));

    return (
        <div className="bg-white rounded-xl shadow" style={{ padding: '16px', marginBottom: '24px' }}>
            <h3 className="text-xl font-bold" style={{ marginBottom: '16px' }}>Payment Method Spending (Bar)</h3>
            {chartData.length === 0 ? (
                <p className="text-gray-500">No data available</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="method" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export function SpendingLineChart({ data }) {
    const chartData = Object.entries(data || {}).map(([date, value]) => ({
        date,
        value
    }));

    return (
        <div className="bg-white rounded-xl shadow" style={{ padding: '16px', marginBottom: '24px' }}>
            <h3 className="text-xl font-bold" style={{ marginBottom: '16px' }}>Spending Over Time</h3>
            {chartData.length === 0 ? (
                <p className="text-gray-500">No spending data available</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
