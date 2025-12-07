'use client';

/**
 * Home Page
 * Modern landing page with dark mode support
 */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
    HiLightningBolt,
    HiShieldCheck,
    HiChartBar,
    HiClock,
    HiUserGroup,
    HiCheck,
    HiArrowRight,
} from 'react-icons/hi';
import { IoCheckmarkCircle, IoSparkles } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';

const features = [
    {
        icon: HiLightningBolt,
        title: 'Lightning Fast',
        description: 'Built for performance with modern technologies for a fast, responsive experience.',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        icon: HiShieldCheck,
        title: 'Secure by Design',
        description: 'Your data is protected with industry-standard encryption and authentication.',
        color: 'from-green-400 to-emerald-500',
    },
    {
        icon: HiChartBar,
        title: 'Track Progress',
        description: 'Visualize your productivity with beautiful dashboards.',
        color: 'from-primary-400 to-primary-600',
    },
    {
        icon: HiClock,
        title: 'Never Miss Deadlines',
        description: 'Set due dates and get organized with timely reminders.',
        color: 'from-pink-400 to-rose-500',
    },
    {
        icon: HiUserGroup,
        title: 'Personal Workspace',
        description: 'Your private space to manage all your projects.',
        color: 'from-cyan-400 to-blue-500',
    },
    {
        icon: IoSparkles,
        title: 'Modern Experience',
        description: 'Clean, intuitive interface designed for productivity.',
        color: 'from-violet-400 to-purple-500',
    },
];

const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Tasks Managed' },
    { value: '5⭐', label: 'User Rating' },
];

function AnimateOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
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

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 gradient-mesh" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 dark:bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow delay-500" />

                <div className="container-custom relative">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800"
                        >
                            <IoSparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">Simple Task Management</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Organize your work,{' '}
                            <span className="text-gradient">achieve more</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            TaskFlow is a modern task management system that helps you stay organized
                            and productive. Built with the latest technologies for a seamless experience.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            {user ? (
                                <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 gap-2">
                                    Go to Dashboard
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 gap-2">
                                        Get Started Free
                                        <HiArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link href="/auth/login" className="btn-secondary text-lg px-8 py-4">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        {/* Demo hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mt-8"
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-dark-card/80 backdrop-blur border border-gray-200 dark:border-dark-border shadow-soft dark:shadow-dark-soft">
                                <IoCheckmarkCircle className="w-5 h-5 text-success-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong className="text-gray-900 dark:text-white">Demo:</strong> demo@taskflow.test / Demo1234!
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: 'spring' }}
                                    className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-dark-card relative">
                <div className="container-custom">
                    <AnimateOnScroll>
                        <div className="section-header">
                            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                                Features
                            </span>
                            <h2 className="section-title">Everything you need to stay productive</h2>
                            <p className="section-subtitle">
                                Focus on what matters most with a clean, distraction-free experience.
                            </p>
                        </div>
                    </AnimateOnScroll>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <AnimateOnScroll key={feature.title} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative card-hover p-6"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-5 shadow-lg
                                  group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-full h-full text-white" />
                                    </div>

                                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-gray-50 dark:bg-dark-bg relative overflow-hidden">
                <div className="absolute inset-0 gradient-mesh opacity-50" />

                <div className="container-custom relative">
                    <AnimateOnScroll>
                        <div className="section-header">
                            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                                How It Works
                            </span>
                            <h2 className="section-title">Get started in 3 simple steps</h2>
                        </div>
                    </AnimateOnScroll>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '01', title: 'Create Account', desc: 'Sign up for free in seconds' },
                            { step: '02', title: 'Add Tasks', desc: 'Create and organize your tasks' },
                            { step: '03', title: 'Stay Productive', desc: 'Track progress and achieve goals' },
                        ].map((item, index) => (
                            <AnimateOnScroll key={item.step} delay={index * 0.15}>
                                <div className="relative text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-dark-card shadow-soft dark:shadow-dark-soft mb-5">
                                        <span className="text-2xl font-display font-bold text-gradient">{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl" />
                </div>

                <div className="container-custom relative">
                    <AnimateOnScroll>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                                Ready to get organized?
                            </h2>
                            <p className="text-xl text-gray-400 mb-10">
                                Start managing your tasks today and boost your productivity.
                            </p>
                            {user ? (
                                <Link href="/dashboard/tasks" className="btn-primary text-lg px-10 py-4 gap-2">
                                    View Your Tasks
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <Link href="/auth/register" className="btn-primary text-lg px-10 py-4 gap-2">
                                    Create Free Account
                                    <HiArrowRight className="w-5 h-5" />
                                </Link>
                            )}

                            {/* Trust indicators */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                                {['No credit card required', 'Free forever plan', 'Cancel anytime'].map((text) => (
                                    <div key={text} className="flex items-center gap-2 text-gray-400">
                                        <HiCheck className="w-5 h-5 text-success-400" />
                                        <span className="text-sm">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
}
