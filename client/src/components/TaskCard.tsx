'use client';

/**
 * TaskCard Component
 * Displays a single task with status, priority, and actions
 */
import React from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiPencil, HiTrash, HiClock } from 'react-icons/hi';
import { Task } from '@/lib/api';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: 'todo' | 'in-progress' | 'done') => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
    // Format date for display
    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Check if task is overdue
    const isOverdue = () => {
        if (!task.dueDate || task.status === 'done') return false;
        return new Date(task.dueDate) < new Date();
    };

    // Status badge classes
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'todo':
                return 'badge-todo';
            case 'in-progress':
                return 'badge-in-progress';
            case 'done':
                return 'badge-done';
            default:
                return 'badge-todo';
        }
    };

    // Priority badge classes
    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'badge-low';
            case 'medium':
                return 'badge-medium';
            case 'high':
                return 'badge-high';
            default:
                return 'badge-medium';
        }
    };

    // Format status label
    const formatStatus = (status: string) => {
        return status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`card-hover p-4 ${isOverdue() ? 'border-red-300 bg-red-50' : ''}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-neutral-900 line-clamp-2">{task.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        aria-label="Edit task"
                    >
                        <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Delete task"
                    >
                        <HiTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{task.description}</p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={getStatusBadge(task.status)}>{formatStatus(task.status)}</span>
                <span className={getPriorityBadge(task.priority)}>{task.priority}</span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
                <div
                    className={`flex items-center gap-1.5 text-sm ${isOverdue() ? 'text-red-600' : 'text-neutral-500'
                        }`}
                >
                    {isOverdue() ? (
                        <HiClock className="w-4 h-4" />
                    ) : (
                        <HiCalendar className="w-4 h-4" />
                    )}
                    <span>{isOverdue() ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}</span>
                </div>
            )}

            {/* Quick Status Change */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
                <div className="flex gap-1">
                    {(['todo', 'in-progress', 'done'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusChange(task._id, status)}
                            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${task.status === status
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                        >
                            {formatStatus(status)}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
