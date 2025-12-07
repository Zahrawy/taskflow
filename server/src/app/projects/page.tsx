'use client';

/**
 * Projects Page
 * Updated with only TaskFlow and Personal Portfolio projects
 */
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';

function AnimateOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) controls.start('visible');
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
            }}
        >
            {children}
        </motion.div>
    );
}

const projects = [
    {
        title: 'TaskFlow',
        description: 'A full-stack task management application with authentication, CRUD operations, and a modern UI built with Next.js and Express. Features include dark mode, dashboard analytics, and a responsive design.',
        tech: ['Next.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
        github: 'https://github.com/Zahrawy',
        demo: '/',
        featured: true,
        gradient: 'from-primary-500 to-secondary-500',
    },
    {
        title: 'Personal Portfolio Website',
        description: 'A modern, responsive portfolio built with React and styled using a clean, minimalistic UI. Includes sections for About, Skills, Projects, and Contact, with smooth animations and a polished user experience.',
        tech: ['React', 'CSS Modules / Tailwind', 'Framer Motion'],
        github: 'https://github.com/Zahrawy',
        demo: '#',
        featured: false,
        gradient: 'from-cyan-500 to-blue-500',
    },
];

export default function ProjectsPage() {
    return (
        <div className="min-h-screen py-16 md:py-24">
            <div className="container-custom">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        My <span className="text-gradient">Projects</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        A showcase of my full-stack development work and personal projects.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <AnimateOnScroll key={project.title} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="relative card overflow-hidden group"
                            >
                                {/* Gradient top bar */}
                                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                                <div className="p-6 md:p-8">
                                    {/* Featured badge */}
                                    {project.featured && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
                                            <IoSparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                            <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">Featured Project</span>
                                        </div>
                                    )}

                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-lg">{project.description}</p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-dark-hover rounded-lg"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        >
                                            <FaGithub className="w-5 h-5" />
                                            View Code
                                        </a>
                                        <a
                                            href={project.demo}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                        >
                                            <HiExternalLink className="w-5 h-5" />
                                            Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Want to see more projects?</p>
                    <a
                        href="https://github.com/Zahrawy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary gap-2"
                    >
                        <FaGithub className="w-5 h-5" />
                        View GitHub Profile
                        <HiArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
