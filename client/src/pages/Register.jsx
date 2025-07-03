import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Navbar from '../components/Navbar';

export default function Register() {
    const { signup, isSigningUp } = useAuthStore();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ fullName, email, password });
        navigate('/dashboard');
    };

    return (
        <>
            <Navbar />
            <div
                className="flex justify-center items-center bg-gray-100"
                style={{ minHeight: 'calc(100vh - 64px)', margin: 0, padding: 0 }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded shadow w-96"
                    style={{ padding: '24px', margin: 0 }}
                >
                    <h2
                        className="text-2xl font-bold text-center"
                        style={{ marginBottom: '16px' }}
                    >
                        Register
                    </h2>

                    <input
                        className="border w-full"
                        type="text"
                        placeholder="Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <input
                        className="border w-full"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <input
                        className="border w-full"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '8px', marginBottom: '12px' }}
                    />

                    <button
                        className="bg-green-500 text-white w-full rounded"
                        type="submit"
                        disabled={isSigningUp}
                        style={{ padding: '8px', margin: 0 }}
                    >
                        {isSigningUp ? 'Registering...' : 'Register'}
                    </button>

                    <p
                        className="text-center text-sm text-gray-600"
                        style={{ marginTop: '12px' }}
                    >
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/')}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </>
    );
}
