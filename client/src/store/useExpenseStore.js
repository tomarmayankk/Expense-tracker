import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useExpenseStore = create((set) => ({
    expenses: [],
    dashboardSummary: null,
    isLoading: false,

 
    addExpense: async (expenseData) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post('/expense/add', expenseData);
            set((state) => ({
                expenses: [res.data, ...state.expenses],
            }));
            toast.success('Expense added!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add expense');
        } finally {
            set({ isLoading: false });
        }
    },

    getExpenses: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get('/expense/all');
            set({ expenses: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch expenses');
        } finally {
            set({ isLoading: false });
        }
    },

    updateExpense: async (id, updatedData) => {
        try {
            const res = await axiosInstance.put(`/expense/update/${id}`, updatedData);
            set((state) => ({
                expenses: state.expenses.map((exp) =>
                    exp._id === id ? res.data : exp
                ),
            }));
            toast.success('Expense updated!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update expense');
        }
    },

    deleteExpense: async (id) => {
        try {
            await axiosInstance.delete(`/expense/delete/${id}`);
            set((state) => ({
                expenses: state.expenses.filter((exp) => exp._id !== id),
            }));
            toast.success('Expense deleted!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete expense');
        }
    },

    getDashboardSummary: async () => {
        try {
            const res = await axiosInstance.get('/dashboard/summary');
            set({ dashboardSummary: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch dashboard summary');
        }
    },
}));
