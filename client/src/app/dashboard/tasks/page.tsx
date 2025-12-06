'use client';

/**
 * Tasks Page
 * Full task management with CRUD operations
 */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiSearch, HiFilter } from 'react-icons/hi';
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

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    // Fetch tasks
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

    // Filter tasks by search query
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Create task
    const handleCreate = async (data: CreateTaskData) => {
        await taskAPI.createTask(data);
        toast.success('Task created successfully');
        fetchTasks();
    };

    // Update task
    const handleUpdate = async (data: CreateTaskData) => {
        if (!editingTask) return;
        await taskAPI.updateTask(editingTask._id, data);
        toast.success('Task updated successfully');
        setEditingTask(null);
        fetchTasks();
    };

    // Delete task
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

    // Change task status
    const handleStatusChange = async (id: string, status: 'todo' | 'in-progress' | 'done') => {
        try {
            await taskAPI.updateTask(id, { status });
            fetchTasks();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // Open edit form
    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    // Close form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    // Group tasks by status
    const tasksByStatus = {
        todo: filteredTasks.filter((t) => t.status === 'todo'),
        'in-progress': filteredTasks.filter((t) => t.status === 'in-progress'),
        done: filteredTasks.filter((t) => t.status === 'done'),
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen py-8">
                <div className="container-custom">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">Tasks</h1>
                            <p className="text-neutral-600">Manage and track your tasks</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <HiPlus className="w-5 h-5" />
                            New Task
                        </button>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-4 mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input pl-10"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <HiFilter className="w-5 h-5 text-neutral-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input w-auto"
                                >
                                    <option value="">All Status</option>
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>

                            {/* Priority Filter */}
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="input w-auto"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Tasks Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="card p-12 text-center"
                        >
                            <p className="text-neutral-500 mb-4">
                                {tasks.length === 0
                                    ? 'No tasks yet. Create your first task!'
                                    : 'No tasks match your filters.'}
                            </p>
                            {tasks.length === 0 && (
                                <button onClick={() => setShowForm(true)} className="btn-primary">
                                    Create Task
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* To Do Column */}
                            <div>
                                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-neutral-400" />
                                    To Do ({tasksByStatus.todo.length})
                                </h2>
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {tasksByStatus.todo.map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                onStatusChange={handleStatusChange}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* In Progress Column */}
                            <div>
                                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-primary-500" />
                                    In Progress ({tasksByStatus['in-progress'].length})
                                </h2>
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {tasksByStatus['in-progress'].map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                onStatusChange={handleStatusChange}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Done Column */}
                            <div>
                                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    Done ({tasksByStatus.done.length})
                                </h2>
                                <div className="space-y-4">
                                    <AnimatePresence>
                                        {tasksByStatus.done.map((task) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                onStatusChange={handleStatusChange}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Task Form Modal */}
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
