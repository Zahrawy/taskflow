'use client';

/**
 * Skills Page
 * Showcase of technical skills
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
    HiCode,
    HiServer,
    HiDatabase,
    HiCloud,
    HiCog,
    HiColorSwatch,
} from 'react-icons/hi';

const skillCategories = [
    {
        icon: HiCode,
        title: 'Frontend Development',
        skills: [
            { name: 'React/Next.js', level: 90 },
            { name: 'TypeScript', level: 85 },
            { name: 'Tailwind CSS', level: 90 },
            { name: 'HTML/CSS', level: 95 },
        ],
    },
    {
        icon: HiServer,
        title: 'Backend Development',
        skills: [
            { name: 'Node.js', level: 88 },
            { name: 'Express', level: 85 },
            { name: 'REST APIs', level: 90 },
            { name: 'GraphQL', level: 70 },
        ],
    },
    {
        icon: HiDatabase,
        title: 'Databases',
        skills: [
            { name: 'MongoDB', level: 85 },
            { name: 'PostgreSQL', level: 80 },
            { name: 'Redis', level: 70 },
            { name: 'Prisma ORM', level: 75 },
        ],
    },
    {
        icon: HiCloud,
        title: 'Cloud & DevOps',
        skills: [
            { name: 'Vercel', level: 90 },
            { name: 'AWS', level: 65 },
            { name: 'Docker', level: 70 },
            { name: 'CI/CD', level: 75 },
        ],
    },
    {
        icon: HiCog,
        title: 'Tools & Workflow',
        skills: [
            { name: 'Git/GitHub', level: 90 },
            { name: 'VS Code', level: 95 },
            { name: 'Postman', level: 85 },
            { name: 'Figma', level: 70 },
        ],
    },
    {
        icon: HiColorSwatch,
        title: 'UI/UX Design',
        skills: [
            { name: 'Responsive Design', level: 90 },
            { name: 'Component Design', level: 85 },
            { name: 'Accessibility', level: 80 },
            { name: 'Animation', level: 75 },
        ],
    },
];

export default function SkillsPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Skills</h1>
                    <p className="text-xl text-neutral-600">
                        A comprehensive overview of my technical skills and proficiency levels across various
                        technologies and tools.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                                    <category.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-semibold text-neutral-900">{category.title}</h2>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-neutral-700">{skill.name}</span>
                                            <span className="text-sm text-neutral-500">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                                                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 card p-8 text-center"
                >
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Always Learning</h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Technology evolves rapidly, and I'm committed to continuous learning. I regularly
                        explore new frameworks, attend tech conferences, and contribute to open-source projects
                        to stay current with industry trends.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
