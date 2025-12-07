'use client';

/**
 * Dashboard Page with dark mode support
 */
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
    HiClipboardList,
    HiClock,
    HiCheckCircle,
    HiTrendingUp,
    HiArrowRight,
    HiPlus,
    HiLightningBolt
} from 'react-icons/hi';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { taskAPI, Task } from '@/lib/api';

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}</span>;
}

function ProgressRing({ progress, size = 120, strokeWidth = 12 }: { progress: number; size?: number; strokeWidth?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div ref={ref} className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-gray-100 dark:text-dark-hover"
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: offset } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ strokeDasharray: circumference }}
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter value={progress} />%
                </span>
            </div>
        </div>
    );
}

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

    const stats = {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === 'todo').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        done: tasks.filter((t) => t.status === 'done').length,
    };

    const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    const recentTasks = [...tasks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done': return 'bg-success-500';
            case 'in-progress': return 'bg-primary-500';
            default: return 'bg-gray-400';
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'high': return 'badge-high';
            case 'medium': return 'badge-medium';
            default: return 'badge-low';
        }
    };

    const statCards = [
        { label: 'Total Tasks', value: stats.total, icon: HiClipboardList, color: 'from-gray-500 to-gray-600' },
        { label: 'To Do', value: stats.todo, icon: HiClipboardList, color: 'from-blue-500 to-blue-600' },
        { label: 'In Progress', value: stats.inProgress, icon: HiClock, color: 'from-primary-500 to-primary-600' },
        { label: 'Completed', value: stats.done, icon: HiCheckCircle, color: 'from-success-500 to-success-600' },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen py-8 md:py-12">
                <div className="container-custom">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                                    Welcome back, {user?.name.split(' ')[0]}! 👋
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">Here's an overview of your tasks and productivity.</p>
                            </div>
                            <Link href="/dashboard/tasks" className="btn-primary gap-2 self-start">
                                <HiPlus className="w-5 h-5" />
                                New Task
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                className="card p-5 md:p-6 group hover:shadow-soft-lg dark:hover:shadow-dark-soft-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-2.5 shadow-lg
                                  group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-full h-full text-white" />
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-1">
                                    <AnimatedCounter value={stat.value} />
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-2 shadow-lg">
                                    <HiTrendingUp className="w-full h-full text-white" />
                                </div>
                                <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">Completion Rate</h2>
                            </div>

                            <div className="flex flex-col items-center py-4">
                                <ProgressRing progress={completionRate} size={140} strokeWidth={14} />
                                <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.done}</span> of{' '}
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.total}</span> tasks completed
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                {[
                                    { label: 'To Do', count: stats.todo, total: stats.total, color: 'bg-gray-400' },
                                    { label: 'In Progress', count: stats.inProgress, total: stats.total, color: 'bg-primary-500' },
                                    { label: 'Done', count: stats.done, total: stats.total, color: 'bg-success-500' },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-dark-hover rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.total ? (item.count / item.total) * 100 : 0}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={`h-full ${item.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Tasks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="lg:col-span-2 card p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-2 shadow-lg">
                                        <HiLightningBolt className="w-full h-full text-white" />
                                    </div>
                                    <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
                                </div>
                                <Link href="/dashboard/tasks" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 transition-colors">
                                    View all <HiArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-10 h-10 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
                                </div>
                            ) : recentTasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-dark-hover flex items-center justify-center">
                                        <HiClipboardList className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks yet. Create your first task!</p>
                                    <Link href="/dashboard/tasks" className="btn-primary">
                                        <HiPlus className="w-5 h-5" />
                                        Create Task
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentTasks.map((task, index) => (
                                        <motion.div
                                            key={task._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                            className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                                                <div>
                                                    <span className={`font-medium ${task.status === 'done' ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                                        {task.title}
                                                    </span>
                                                    {task.dueDate && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={getPriorityBadge(task.priority)}>
                                                {task.priority}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8"
                    >
                        <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/dashboard/tasks" className="btn-primary gap-2">
                                <HiClipboardList className="w-5 h-5" />
                                Manage Tasks
                            </Link>
                            <Link href="/projects" className="btn-secondary gap-2">
                                View Projects
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
