// src/store/useBudgetStore.jsx
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useBudgetStore = create((set) => ({
    budgets: [],
    alerts: [],
    isLoading: false,

    // Get all budgets
    getBudgets: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get('/budget/all');
            set({ budgets: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load budgets');
        } finally {
            set({ isLoading: false });
        }
    },

    // Set or update a budget
    setBudget: async (data) => {
        try {
            const res = await axiosInstance.post('/budget/set', data);
            toast.success('Budget saved');
            set((state) => ({
                budgets: [...state.budgets.filter(b => b.category !== res.data.category), res.data]
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to set budget');
        }
    },

    // Check budget alerts
    checkBudgetAlerts: async () => {
        try {
            const res = await axiosInstance.get('/budget/alerts');
            set({ alerts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch budget alerts');
        }
    }
}));
