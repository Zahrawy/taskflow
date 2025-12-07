/**
 * Task Routes
 * Defines routes for task CRUD operations
 */
const express = require('express');
const { body } = require('express-validator');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const router = express.Router();

// All routes are protected
router.use(protect);

// Validation rules for creating a new task
const createTaskValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('status')
        .optional()
        .isIn(['todo', 'in-progress', 'done'])
        .withMessage('Status must be todo, in-progress, or done'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date')
];

// Validation rules for updating a task (all fields optional)
const updateTaskValidation = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('status')
        .optional()
        .isIn(['todo', 'in-progress', 'done'])
        .withMessage('Status must be todo, in-progress, or done'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date')
];

// Routes
router.route('/')
    .get(getTasks)
    .post(validate(createTaskValidation), createTask);

router.route('/:id')
    .get(getTask)
    .put(validate(updateTaskValidation), updateTask)
    .delete(deleteTask);

module.exports = router;
