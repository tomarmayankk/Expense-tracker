import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Budget from './pages/Budget';
import AllExpenses from './pages/AllExpense';
import { Loader } from 'lucide-react';

export default function App() {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
        checkAuth(); // <-- will restore user session if JWT cookie exists
    }, []);

    if (isCheckingAuth) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader className='animate-spin size-8' />
            </div>
        );
    }
    return (
      <BrowserRouter>

            <Toaster />
            <Routes>
                <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/dashboard" />} />

                <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/add-expense" element={authUser ? <AddExpense /> : <Navigate to="/" />} />
                <Route path="/edit-expense/:id" element={authUser ? <EditExpense /> : <Navigate to="/" />} />
                <Route path="/budget" element={authUser ? <Budget /> : <Navigate to="/" />} />
                <Route path="/expenses" element={authUser ? <AllExpenses /> : <Navigate to="/" />} />
            </Routes>

        </BrowserRouter>
    );
}
