'use client';

/**
 * About Page
 * Information about TaskFlow application
 */
import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiCode, HiLightningBolt, HiShieldCheck } from 'react-icons/hi';

const values = [
    {
        icon: HiLightningBolt,
        title: 'Speed',
        description: 'Built for performance with modern technologies for a fast, responsive experience.',
    },
    {
        icon: HiShieldCheck,
        title: 'Security',
        description: 'Your data is protected with industry-standard encryption and authentication.',
    },
    {
        icon: HiCode,
        title: 'Quality',
        description: 'Clean, maintainable code following best practices and modern standards.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="container-custom">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <HiCheckCircle className="w-16 h-16 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">About TaskFlow</h1>
                    <p className="text-xl text-neutral-600">
                        A simple, professional task management system built to demonstrate full-stack development
                        skills using modern technologies.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-8 md:p-12 mb-16"
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            TaskFlow was created to provide developers and teams with a clean, intuitive task
                            management experience. We believe in simplicity over complexity, focusing on the
                            essential features that help you stay productive without overwhelming you with
                            unnecessary options.
                        </p>
                        <p className="text-neutral-600 leading-relaxed">
                            This project showcases a complete full-stack application architecture, including
                            user authentication, protected API routes, CRUD operations, and a responsive
                            dashboard interface.
                        </p>
                    </div>
                </motion.div>

                {/* Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="card p-6 text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{value.title}</h3>
                                <p className="text-neutral-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card p-8 md:p-12"
                >
                    <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8">Tech Stack</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frontend</h3>
                            <ul className="space-y-2 text-neutral-600">
                                <li>• Next.js 14 (App Router)</li>
                                <li>• React 18</li>
                                <li>• TypeScript</li>
                                <li>• Tailwind CSS</li>
                                <li>• Framer Motion</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Backend</h3>
                            <ul className="space-y-2 text-neutral-600">
                                <li>• Node.js + Express</li>
                                <li>• MongoDB + Mongoose</li>
                                <li>• JWT Authentication</li>
                                <li>• bcrypt Password Hashing</li>
                                <li>• Express Validator</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
