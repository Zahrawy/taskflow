/**
 * Task Controller
 * Handles CRUD operations for tasks
 */
const Task = require('../models/Task');

/**
 * @desc    Get all tasks for current user
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
    try {
        // Optional filters from query params
        const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;

        // Build query
        const query = { user: req.user.id };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        // Sort order
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortOptions = { [sortBy]: sortOrder };

        const tasks = await Task.find(query).sort(sortOptions);

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('GetTasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching tasks'
        });
    }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this task'
            });
        }

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        console.error('GetTask error:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error fetching task'
        });
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            task
        });
    } catch (error) {
        console.error('CreateTask error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error creating task'
        });
    }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        // Update task
        const { title, description, status, priority, dueDate } = req.body;

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, dueDate },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        console.error('UpdateTask error:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error updating task'
        });
    }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Check ownership
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('DeleteTask error:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error deleting task'
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
