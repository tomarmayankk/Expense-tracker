import React, { useEffect, useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { useBudgetStore } from '../store/useBudgetStore';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { CategoryPieChart, CategoryBarChart, SpendingLineChart } from '../components/CategoryPieChart';
import { useAuthStore } from '../store/useAuthStore';

export default function Dashboard() {
    const { authUser } = useAuthStore();
    const { getExpenses, dashboardSummary, getDashboardSummary } = useExpenseStore();
    const { alerts, checkBudgetAlerts } = useBudgetStore();

    const [showTotal, setShowTotal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getExpenses();
        getDashboardSummary();
        checkBudgetAlerts();
    }, [getExpenses, getDashboardSummary, checkBudgetAlerts]);
    

    // Format data for Bar Chart
    const paymentData = (dashboardSummary?.topPaymentMethods || []).reduce((acc, { method, total }) => {
        acc[method] = total;
        return acc;
    }, {});

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100" style={{ padding: '24px', marginTop: '64px' }}>
                <h2 className="text-2xl font-semibold mb-4">
                    👋 Hello, <span className="text-blue-600">{authUser?.fullName || authUser?.email || 'User'}</span>
                </h2>

                <h1 className="text-3xl font-bold text-center" style={{ marginBottom: '24px' }}>Dashboard</h1>

                {/* Summary */}
                {dashboardSummary ? (
                    <div className="bg-white rounded-xl shadow" style={{ padding: '16px', marginBottom: '24px' }}>
                        <h2 className="text-xl font-bold" style={{ marginBottom: '12px' }}>This Month Summary</h2>
                        <p>Total Spent: <span className="font-semibold">₹ {dashboardSummary.totalSpent}</span></p>
                        <p>Top Category: <span className="font-semibold">{dashboardSummary.topCategory}</span></p>

                        <h3 className="font-semibold" style={{ marginTop: '16px', marginBottom: '8px' }}>Top Payment Methods:</h3>
                        <ul className="list-disc list-inside" style={{ marginBottom: '16px' }}>
                            {dashboardSummary.topPaymentMethods.map(({ method, total }) => (
                                <li key={method}>{method}: ₹ {total}</li>
                            ))}
                        </ul>

                        <div className="flex gap-4">
                            <button
                                className="bg-blue-500 text-white rounded"
                                onClick={() => navigate('/expenses')}
                                style={{ padding: '8px', margin: 0 }}
                            >
                                See All Expenses
                            </button>

                            <button
                                className="bg-green-500 text-white rounded"
                                onClick={() => setShowTotal(!showTotal)}
                                style={{ padding: '8px', margin: 0 }}
                            >
                                {showTotal ? 'Hide Total' : 'Show Total'}
                            </button>
                        </div>

                        {showTotal && (
                            <div style={{ marginTop: '16px' }}>
                                <p className="font-semibold text-green-600">Total Expenses this month: ₹ {dashboardSummary.totalSpent}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-600" style={{ marginBottom: '24px' }}>Loading summary...</p>
                )}

                {/* Charts */}
                {dashboardSummary ? (
                    <>
                        <CategoryPieChart data={dashboardSummary.categoryWise} />
                        <CategoryBarChart data={paymentData} />
                        <SpendingLineChart data={dashboardSummary.spendingOverTime} />
                    </>
                ) : (
                    <p className="text-center text-gray-600" style={{ marginBottom: '24px' }}>Loading charts...</p>
                )}

                {/* Budget Alerts */}
                {alerts.length > 0 && (
                    <div className="bg-yellow-100 rounded-xl shadow" style={{ padding: '16px', marginBottom: '24px' }}>
                        <h2 className="text-xl font-bold" style={{ marginBottom: '12px' }}>Budget Alerts</h2>
                        {alerts.map(alert => (
                            alert.alert && (
                                <p
                                    key={alert.category}
                                    className={`font-medium ${alert.percentage >= 100 ? 'text-red-600' : 'text-yellow-700'}`}
                                    style={{ marginBottom: '8px' }}
                                >
                                    {alert.alert}
                                </p>
                            )
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
