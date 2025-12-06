'use client';

/**
 * Projects Page
 * Showcase of projects and work
 */
import React from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const projects = [
    {
        title: 'TaskFlow',
        description:
            'A full-stack task management application with authentication, CRUD operations, and a modern UI.',
        tech: ['Next.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        github: 'https://github.com',
        demo: '/',
        featured: true,
    },
    {
        title: 'E-Commerce Platform',
        description:
            'A complete e-commerce solution with product management, cart, checkout, and payment integration.',
        tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'Real-time Chat App',
        description:
            'A real-time messaging application with WebSocket support, user presence, and message history.',
        tech: ['React', 'Socket.io', 'Express', 'Redis'],
        github: 'https://github.com',
        demo: '#',
    },
    {
        title: 'AI Content Generator',
        description:
            'An AI-powered content generation tool using OpenAI API for blog posts and marketing copy.',
        tech: ['Next.js', 'OpenAI API', 'TypeScript', 'Prisma'],
        github: 'https://github.com',
        demo: '#',
    },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Projects</h1>
                    <p className="text-xl text-neutral-600">
                        A collection of projects showcasing full-stack development skills and modern web
                        technologies.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`card-hover p-6 ${project.featured ? 'ring-2 ring-primary-500' : ''}`}
                        >
                            {project.featured && (
                                <span className="inline-block px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded mb-4">
                                    Featured
                                </span>
                            )}
                            <h2 className="text-xl font-bold text-neutral-900 mb-2">{project.title}</h2>
                            <p className="text-neutral-600 mb-4">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    Code
                                </a>
                                <a
                                    href={project.demo}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    <HiExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-neutral-600 mb-4">Want to see more projects?</p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <FaGithub className="w-5 h-5" />
                        View GitHub Profile
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
