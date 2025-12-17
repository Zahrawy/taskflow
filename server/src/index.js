/**
 * TaskFlow API Server
 * Main entry point for the Express application
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const contactRoutes = require('./routes/contact');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration (MUST be first)
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Define allowed origins
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:3000',
            'https://taskflow-psi-two.vercel.app'
        ];

        // Check if origin is allowed
        // 1. Exact match with allowed list
        // 2. It is a Vercel preview deployment (ends with .vercel.app and contains taskflow)
        if (allowedOrigins.includes(origin) || (origin.endsWith('.vercel.app') && origin.includes('taskflow'))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security middleware
app.use(helmet());

// Trust proxy for Render/Heroku (required for rate limiting)
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'TaskFlow API is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 TaskFlow API Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
