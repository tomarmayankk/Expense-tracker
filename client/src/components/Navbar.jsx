import { useNavigate } from 'react-router-dom';
import ProfileCircle from './ProfileCircle';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const { signout, authUser } = useAuthStore();

    const handleLogout = async () => {
        await signout();
        navigate('/');
    };

    return (
        <nav
            className="bg-blue-600 text-white flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-2xl"
            style={{ padding: '12px 24px', margin: 0 }}
        >
            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate(authUser ? '/dashboard' : '/')}
                style={{ margin: 0 }}
            >
                EXPENSE TRACKER
            </h1>

            {authUser && (
                <div className="flex items-center gap-4" style={{ margin: 0 }}>
                    <button
                        onClick={() => navigate('/add-expense')}
                        className="bg-white text-blue-600 rounded-4xl hover:bg-gray-200"
                        style={{ padding: '8px 16px' }}
                    >
                        Add Expense
                    </button>

                    <button
                        onClick={() => navigate('/budget')}
                        className="bg-white text-blue-600 rounded-4xl hover:bg-gray-200"
                        style={{ padding: '8px 16px' }}
                    >
                        Your Budget
                    </button>

                    <button
                        onClick={() => navigate('/expenses')}
                        className="bg-white text-blue-600 rounded-4xl hover:bg-gray-200"
                        style={{ padding: '8px 16px' }}
                    >
                        All Expenses
                    </button>

                    {/* 👤 Profile Circle */}
                    <ProfileCircle name={authUser?.fullName || authUser?.email || 'User'} />

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white rounded-4xl hover:bg-red-600"
                        style={{ padding: '8px 16px', margin: 0 }}
                    >
                        <LogOut />
                    </button>
                </div>
            )}
        </nav>
    );
}
