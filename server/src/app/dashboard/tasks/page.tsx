'use client';

/**
 * Tasks Page with dark mode support
 */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiSearch, HiFilter, HiViewGrid } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { taskAPI, Task, CreateTaskData } from '@/lib/api';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            const data = await taskAPI.getTasks({
                status: statusFilter || undefined,
                priority: priorityFilter || undefined,
            });
            setTasks(data.tasks);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, [statusFilter, priorityFilter]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreate = async (data: CreateTaskData) => {
        await taskAPI.createTask(data);
        toast.success('Task created successfully');
        fetchTasks();
    };

    const handleUpdate = async (data: CreateTaskData) => {
        if (!editingTask) return;
        await taskAPI.updateTask(editingTask._id, data);
        toast.success('Task updated successfully');
        setEditingTask(null);
        fetchTasks();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await taskAPI.deleteTask(id);
            toast.success('Task deleted successfully');
            fetchTasks();
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const handleStatusChange = async (id: string, status: 'todo' | 'in-progress' | 'done') => {
        try {
            await taskAPI.updateTask(id, { status });
            fetchTasks();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const tasksByStatus = {
        todo: filteredTasks.filter((t) => t.status === 'todo'),
        'in-progress': filteredTasks.filter((t) => t.status === 'in-progress'),
        done: filteredTasks.filter((t) => t.status === 'done'),
    };

    const columns = [
        { key: 'todo', label: 'To Do', color: 'bg-gray-400', tasks: tasksByStatus.todo },
        { key: 'in-progress', label: 'In Progress', color: 'bg-primary-500', tasks: tasksByStatus['in-progress'] },
        { key: 'done', label: 'Done', color: 'bg-success-500', tasks: tasksByStatus.done },
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen py-8 md:py-12">
                <div className="container-custom">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">Tasks</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your tasks</p>
                        </div>
                        <motion.button
                            onClick={() => setShowForm(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary gap-2 self-start lg:self-auto"
                        >
                            <HiPlus className="w-5 h-5" />
                            New Task
                        </motion.button>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-4 mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input pl-12"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <HiFilter className="w-5 h-5 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input w-auto min-w-[140px]"
                                >
                                    <option value="">All Status</option>
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="input w-auto min-w-[140px]"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Task Stats */}
                    {!loading && tasks.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex flex-wrap gap-3 mb-6"
                        >
                            {columns.map((col) => (
                                <div key={col.key} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm">
                                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{col.label}</span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{col.tasks.length}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Tasks Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
                                <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
                            </div>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="card p-12 text-center"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-dark-hover flex items-center justify-center">
                                <HiViewGrid className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">
                                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {tasks.length === 0
                                    ? 'Create your first task to get started!'
                                    : 'Try adjusting your search or filter criteria.'}
                            </p>
                            {tasks.length === 0 && (
                                <button onClick={() => setShowForm(true)} className="btn-primary gap-2">
                                    <HiPlus className="w-5 h-5" />
                                    Create Task
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {columns.map((column, colIndex) => (
                                <motion.div
                                    key={column.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + colIndex * 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {column.label}
                                        </h2>
                                        <span className="ml-auto text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-dark-hover px-2.5 py-0.5 rounded-lg">
                                            {column.tasks.length}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <AnimatePresence mode="popLayout">
                                            {column.tasks.map((task) => (
                                                <TaskCard
                                                    key={task._id}
                                                    task={task}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    onStatusChange={handleStatusChange}
                                                />
                                            ))}
                                        </AnimatePresence>
                                        {column.tasks.length === 0 && (
                                            <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-dark-border text-center">
                                                <p className="text-sm text-gray-400 dark:text-gray-500">No tasks</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <AnimatePresence>
                        {showForm && (
                            <TaskForm
                                task={editingTask}
                                onSubmit={editingTask ? handleUpdate : handleCreate}
                                onClose={handleCloseForm}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ProtectedRoute>
    );
}
