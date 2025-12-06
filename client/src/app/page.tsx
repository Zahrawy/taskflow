'use client';

/**
 * Home Page
 * Landing page with hero section and features
 */
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiCheckCircle,
    HiLightningBolt,
    HiShieldCheck,
    HiChartBar,
    HiClock,
    HiUserGroup,
} from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';

const features = [
    {
        icon: HiLightningBolt,
        title: 'Fast & Intuitive',
        description: 'Create, organize, and track tasks with a beautiful interface designed for speed.',
    },
    {
        icon: HiShieldCheck,
        title: 'Secure by Default',
        description: 'Your data is protected with industry-standard encryption and secure authentication.',
    },
    {
        icon: HiChartBar,
        title: 'Track Progress',
        description: 'Visualize your productivity with status tracking and priority management.',
    },
    {
        icon: HiClock,
        title: 'Never Miss Deadlines',
        description: 'Set due dates and stay on top of your tasks with timely reminders.',
    },
    {
        icon: HiUserGroup,
        title: 'Personal Workspace',
        description: 'Your own private space to manage all your tasks and projects.',
    },
    {
        icon: HiCheckCircle,
        title: 'Simple & Focused',
        description: 'No distractions, just the essential features you need to get things done.',
    },
];

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 gradient-hero opacity-10" />

                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                            ✨ Simple Task Management
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 text-balance">
                            Organize your work,{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                                achieve more
                            </span>
                        </h1>
                        <p className="text-xl text-neutral-600 mb-8 text-balance">
                            TaskFlow is a simple, professional task management system that helps you stay organized
                            and productive. Built with modern technologies for a seamless experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {user ? (
                                <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                                        Get Started Free
                                    </Link>
                                    <Link href="/auth/login" className="btn-secondary text-lg px-8 py-3">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Demo credentials hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 max-w-md mx-auto"
                    >
                        <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200">
                            <p className="text-sm text-neutral-600 text-center">
                                <strong>Demo Account:</strong> demo@taskflow.test / Demo1234!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Everything you need to stay productive
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Focus on what matters most with a clean, distraction-free task management experience.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-6 group hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                                <p className="text-neutral-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-neutral-900">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to get organized?
                        </h2>
                        <p className="text-lg text-neutral-400 mb-8">
                            Start managing your tasks today with TaskFlow.
                        </p>
                        {user ? (
                            <Link href="/dashboard/tasks" className="btn-primary text-lg px-8 py-3">
                                View Your Tasks
                            </Link>
                        ) : (
                            <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                                Create Free Account
                            </Link>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
