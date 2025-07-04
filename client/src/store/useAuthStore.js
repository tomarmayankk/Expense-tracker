
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

const getStoredUser = () => {
    try {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

export const useAuthStore = create((set) => ({
    authUser: getStoredUser(),
    isSigningIn: false,
    isSigningUp: false,
    isCheckingAuth: true,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            const user = res.data; // ⬅️ backend directly sends the user
            set({ authUser: user });
            localStorage.setItem('authUser', JSON.stringify(user));
        } catch (error) {
            console.error('Auth check failed:', error.message);
            set({ authUser: null });
            localStorage.removeItem('authUser');
        } finally {
            set({ isCheckingAuth: false });
        }
    },


    signup: async ({ fullName, email, password }) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', {
                fullName,
                email,
                password,
            });
            const user = res.data;
            set({ authUser: user });
            localStorage.setItem('authUser', JSON.stringify(user));
            toast.success('Account created successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        } finally {
            set({ isSigningUp: false });
        }
    },


    signin: async ({ email, password }) => {
        set({ isSigningIn: true });
        try {
            const res = await axiosInstance.post('/auth/signin', {
                email,
                password,
            });
            const user = res.data;
            set({ authUser: user });
            localStorage.setItem('authUser', JSON.stringify(user));
            toast.success('Logged in successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            set({ isSigningIn: false });
        }
    },


    signout: async () => {
        try {
            await axiosInstance.post('/auth/signout');
        } catch (error) {
            console.error(error);
        } finally {
            set({ authUser: null });
            localStorage.removeItem('authUser');
            toast.success('Logged out');
        }
    },
}));
