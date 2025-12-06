'use client';

/**
 * Dashboard Page
 * Main dashboard with task overview and stats
 */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiClipboardList, HiClock, HiCheckCircle, HiTrendingUp } from 'react-icons/hi';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { taskAPI, Task } from '@/lib/api';

export default function DashboardPage() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskAPI.getTasks();
                setTasks(data.tasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Calculate stats
    const stats = {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === 'todo').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
    };

    const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    // Get recent tasks (last 5)
    const recentTasks = [...tasks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);

    return (
        <ProtectedRoute>
            <div className="min-h-screen py-8">
                <div className="container-custom">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                            Welcome back, {user?.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-neutral-600">Here's an overview of your tasks and productivity.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">Total Tasks</p>
                                    <p className="text-3xl font-bold text-neutral-900">{stats.total}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
                                    <HiClipboardList className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">To Do</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.todo}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <HiClipboardList className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">In Progress</p>
                                    <p className="text-3xl font-bold text-primary-600">{stats.inProgress}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                                    <HiClock className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">Completed</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.done}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                    <HiCheckCircle className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Progress & Recent Tasks */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center">
                                    <HiTrendingUp className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-neutral-900">Completion Rate</h2>
                            </div>

                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            className="text-neutral-200"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeLinecap="round"
                                            className="text-primary-600"
                                            strokeDasharray={`${(completionRate / 100) * 352} 352`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-neutral-900">{completionRate}%</span>
                                    </div>
                                </div>
                                <p className="text-neutral-500">
                                    {stats.done} of {stats.total} tasks completed
                                </p>
                            </div>
                        </motion.div>

                        {/* Recent Tasks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 card p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-neutral-900">Recent Tasks</h2>
                                <Link href="/dashboard/tasks" className="text-sm text-primary-600 hover:text-primary-700">
                                    View all →
                                </Link>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                                </div>
                            ) : recentTasks.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-neutral-500 mb-4">No tasks yet. Create your first task!</p>
                                    <Link href="/dashboard/tasks" className="btn-primary">
                                        Create Task
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentTasks.map((task) => (
                                        <div
                                            key={task._id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${task.status === 'done'
                                                            ? 'bg-green-500'
                                                            : task.status === 'in-progress'
                                                                ? 'bg-primary-500'
                                                                : 'bg-neutral-400'
                                                        }`}
                                                />
                                                <span className={`text-sm ${task.status === 'done' ? 'line-through text-neutral-500' : 'text-neutral-900'}`}>
                                                    {task.title}
                                                </span>
                                            </div>
                                            <span className={`badge ${task.priority === 'high'
                                                    ? 'badge-high'
                                                    : task.priority === 'medium'
                                                        ? 'badge-medium'
                                                        : 'badge-low'
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8"
                    >
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/dashboard/tasks" className="btn-primary">
                                Manage Tasks
                            </Link>
                            <Link href="/projects" className="btn-secondary">
                                View Projects
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
