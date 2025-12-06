'use client';

/**
 * Login Page
 * User authentication form
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiCheckCircle } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Welcome back!');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Fill demo credentials
    const fillDemoCredentials = () => {
        setEmail('demo@taskflow.test');
        setPassword('Demo1234!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <HiCheckCircle className="w-10 h-10 text-primary-600" />
                        <span className="text-2xl font-bold text-neutral-900">TaskFlow</span>
                    </Link>
                    <h1 className="mt-6 text-3xl font-bold text-neutral-900">Welcome back</h1>
                    <p className="mt-2 text-neutral-600">Sign in to access your tasks</p>
                </div>

                {/* Form Card */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiMail className="w-5 h-5 text-neutral-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input pl-10"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <HiLockClosed className="w-5 h-5 text-neutral-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input pl-10"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading} className="w-full btn-primary py-3">
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Demo Account */}
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                        <button
                            type="button"
                            onClick={fillDemoCredentials}
                            className="w-full btn-secondary text-sm"
                        >
                            Use Demo Account
                        </button>
                    </div>
                </div>

                {/* Register Link */}
                <p className="mt-6 text-center text-neutral-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-700">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
