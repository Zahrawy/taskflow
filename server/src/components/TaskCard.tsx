'use client';

/**
 * TaskCard Component with dark mode support
 */
import React from 'react';
import { motion } from 'framer-motion';
import { HiPencil, HiTrash, HiClock, HiArrowRight, HiCheck, HiDotsHorizontal } from 'react-icons/hi';
import { Task } from '@/lib/api';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: 'todo' | 'in-progress' | 'done') => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

    const getPriorityColor = () => {
        switch (task.priority) {
            case 'high': return 'bg-danger-500';
            case 'medium': return 'bg-warning-500';
            default: return 'bg-blue-400';
        }
    };

    const getStatusBadge = () => {
        switch (task.status) {
            case 'done': return 'badge-done';
            case 'in-progress': return 'badge-in-progress';
            default: return 'badge-todo';
        }
    };

    const getPriorityBadge = () => {
        switch (task.priority) {
            case 'high': return 'badge-high';
            case 'medium': return 'badge-medium';
            default: return 'badge-low';
        }
    };

    const getNextStatus = (): 'todo' | 'in-progress' | 'done' => {
        switch (task.status) {
            case 'todo': return 'in-progress';
            case 'in-progress': return 'done';
            default: return 'todo';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -2 }}
            className="group relative card overflow-hidden"
        >
            {/* Priority indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${getPriorityColor()}`} />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className={`font-semibold text-gray-900 dark:text-white leading-tight pr-2 ${task.status === 'done' ? 'line-through text-gray-500 dark:text-gray-500' : ''
                        }`}>
                        {task.title}
                    </h3>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                            onClick={() => onEdit(task)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon p-1.5"
                            title="Edit"
                        >
                            <HiPencil className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            onClick={() => onDelete(task._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon p-1.5 text-danger-500 hover:text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20"
                            title="Delete"
                        >
                            <HiTrash className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* Description */}
                {task.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                        {task.description}
                    </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={getStatusBadge()}>{task.status.replace('-', ' ')}</span>
                    <span className={getPriorityBadge()}>{task.priority}</span>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                    <div className={`flex items-center gap-1.5 text-xs ${isOverdue
                            ? 'text-danger-600 dark:text-danger-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                        <HiClock className="w-3.5 h-3.5" />
                        <span>
                            {isOverdue ? 'Overdue: ' : 'Due: '}
                            {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    </div>
                )}

                {/* Quick Status Change */}
                {task.status !== 'done' && (
                    <motion.button
                        onClick={() => onStatusChange(task._id, getNextStatus())}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-3 w-full py-2 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg 
                       hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center gap-1.5"
                    >
                        {task.status === 'todo' ? (
                            <>
                                <HiArrowRight className="w-3.5 h-3.5" />
                                Start Task
                            </>
                        ) : (
                            <>
                                <HiCheck className="w-3.5 h-3.5" />
                                Mark Done
                            </>
                        )}
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
