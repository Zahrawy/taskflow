'use client';

/**
 * TaskForm Component with dark mode support
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { Task, CreateTaskData } from '@/lib/api';
import toast from 'react-hot-toast';

interface TaskFormProps {
    task?: Task | null;
    onSubmit: (data: CreateTaskData) => Promise<void>;
    onClose: () => void;
}

export default function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    const isEditing = !!task;

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setStatus(task.status);
            setPriority(task.priority);
            setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        setLoading(true);

        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim() || undefined,
                status,
                priority,
                dueDate: dueDate || undefined,
            });
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 w-auto md:w-full md:max-w-lg"
            >
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl dark:shadow-dark-soft-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-500 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-display font-semibold text-white">
                                {isEditing ? 'Edit Task' : 'Create New Task'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <HiX className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input"
                                placeholder="What needs to be done?"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input resize-none"
                                rows={3}
                                placeholder="Add more details..."
                            />
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Priority
                            </label>
                            <div className="flex gap-2">
                                {(['low', 'medium', 'high'] as const).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPriority(p)}
                                        className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${priority === p
                                                ? p === 'high'
                                                    ? 'bg-danger-500 text-white shadow-lg shadow-danger-500/25'
                                                    : p === 'medium'
                                                        ? 'bg-warning-500 text-white shadow-lg shadow-warning-500/25'
                                                        : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                                : 'bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
                                            }`}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status & Due Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as typeof status)}
                                    className="input"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 btn-secondary justify-center"
                            >
                                Cancel
                            </button>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 btn-primary justify-center"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    isEditing ? 'Update Task' : 'Create Task'
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
}
