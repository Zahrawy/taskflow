'use client';

/**
 * Skills Page with dark mode support
 */
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { HiCode, HiServer, HiDatabase, HiCloud, HiCog, HiColorSwatch } from 'react-icons/hi';

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

function ProgressBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{skill.level}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 dark:bg-dark-hover rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                />
            </div>
        </div>
    );
}

const skillCategories = [
    {
        icon: HiCode,
        title: 'Frontend',
        color: 'from-blue-500 to-cyan-500',
        skills: [
            { name: 'React/Next.js', level: 92 },
            { name: 'TypeScript', level: 88 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'HTML/CSS', level: 98 },
        ],
    },
    {
        icon: HiServer,
        title: 'Backend',
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'Node.js', level: 90 },
            { name: 'Express', level: 88 },
            { name: 'REST APIs', level: 92 },
            { name: 'GraphQL', level: 75 },
        ],
    },
    {
        icon: HiDatabase,
        title: 'Databases',
        color: 'from-orange-500 to-amber-500',
        skills: [
            { name: 'MongoDB', level: 88 },
            { name: 'PostgreSQL', level: 82 },
            { name: 'Redis', level: 72 },
            { name: 'Prisma ORM', level: 78 },
        ],
    },
    {
        icon: HiCloud,
        title: 'Cloud & DevOps',
        color: 'from-primary-500 to-primary-600',
        skills: [
            { name: 'Vercel', level: 92 },
            { name: 'AWS', level: 68 },
            { name: 'Docker', level: 72 },
            { name: 'CI/CD', level: 78 },
        ],
    },
    {
        icon: HiCog,
        title: 'Tools',
        color: 'from-gray-600 to-gray-700',
        skills: [
            { name: 'Git/GitHub', level: 95 },
            { name: 'VS Code', level: 98 },
            { name: 'Postman', level: 88 },
            { name: 'Figma', level: 72 },
        ],
    },
    {
        icon: HiColorSwatch,
        title: 'UI/UX',
        color: 'from-pink-500 to-rose-500',
        skills: [
            { name: 'Responsive Design', level: 95 },
            { name: 'Component Design', level: 88 },
            { name: 'Accessibility', level: 82 },
            { name: 'Animation', level: 80 },
        ],
    },
];

export default function SkillsPage() {
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
                        Skills & <span className="text-gradient">Expertise</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        A comprehensive overview of my technical skills and proficiency levels.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {skillCategories.map((category, catIndex) => (
                        <AnimateOnScroll key={category.title} delay={catIndex * 0.1}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="card p-6 h-full"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-2.5 shadow-lg`}>
                                        <category.icon className="w-full h-full text-white" />
                                    </div>
                                    <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">{category.title}</h2>
                                </div>
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <ProgressBar
                                            key={skill.name}
                                            skill={skill}
                                            delay={catIndex * 0.1 + skillIndex * 0.1}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="card-gradient p-8 inline-block">
                        <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">Always Learning</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                            Technology evolves rapidly, and I'm committed to continuous improvement.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
