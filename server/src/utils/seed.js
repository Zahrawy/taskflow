/**
 * Seed Script
 * Populates the database with demo user and sample tasks
 * Run with: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');

// Demo user credentials
const DEMO_USER = {
    name: 'Demo User',
    email: 'demo@taskflow.test',
    password: 'Demo1234!'
};

// Sample tasks for demo user
const SAMPLE_TASKS = [
    {
        title: 'Complete project documentation',
        description: 'Write comprehensive README with setup instructions, API documentation, and deployment guide.',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    {
        title: 'Review pull requests',
        description: 'Go through pending pull requests and provide feedback to team members.',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
    },
    {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
    },
    {
        title: 'Design system updates',
        description: 'Update color palette and typography to match new brand guidelines.',
        status: 'done',
        priority: 'low',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        title: 'Performance optimization',
        description: 'Analyze and optimize database queries, implement caching where necessary.',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Task.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create demo user
        console.log('👤 Creating demo user...');
        const demoUser = await User.create({
            name: DEMO_USER.name,
            email: DEMO_USER.email,
            password: DEMO_USER.password
        });
        console.log(`✅ Demo user created: ${demoUser.email}`);

        // Create sample tasks
        console.log('📝 Creating sample tasks...');
        const tasksWithUser = SAMPLE_TASKS.map(task => ({
            ...task,
            user: demoUser._id
        }));

        await Task.insertMany(tasksWithUser);
        console.log(`✅ Created ${SAMPLE_TASKS.length} sample tasks`);

        // Summary
        console.log('\n✨ Seed completed successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📧 Demo Email:    ${DEMO_USER.email}`);
        console.log(`🔑 Demo Password: ${DEMO_USER.password}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
