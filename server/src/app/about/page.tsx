'use client';

/**
 * About Page
 * Modern about page with dark mode support
 */
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { HiLightningBolt, HiShieldCheck, HiCode, HiHeart, HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';

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

const values = [
    {
        icon: HiLightningBolt,
        title: 'Speed',
        description: 'Built for performance with modern technologies.',
        color: 'from-yellow-400 to-orange-500',
    },
    {
        icon: HiShieldCheck,
        title: 'Security',
        description: 'Industry-standard encryption and authentication.',
        color: 'from-green-400 to-emerald-500',
    },
    {
        icon: HiCode,
        title: 'Quality',
        description: 'Clean, maintainable code following best practices.',
        color: 'from-primary-400 to-primary-600',
    },
    {
        icon: HiHeart,
        title: 'Passion',
        description: 'Built with love and attention to detail.',
        color: 'from-pink-400 to-rose-500',
    },
];

const techStack = {
    frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT Auth', 'bcrypt'],
};

const contactInfo = {
    email: 'jzjdgg13532@gmail.com',
    phone: '+962 7 8856 2705',
    location: 'Jordan',
    socials: [
        { icon: FaGithub, href: 'https://github.com/Zahrawy', label: 'GitHub' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/mohammad-zahrawy-80502a321', label: 'LinkedIn' },
        { icon: FaInstagram, href: 'https://www.instagram.com/mohammad_zahrawy/', label: 'Instagram' },
    ],
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-16 md:py-24">
            <div className="container-custom">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
                        <IoCheckmarkCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">About TaskFlow</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        Built for <span className="text-gradient">productivity</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        A modern task management system demonstrating full-stack development skills
                        with authentication, CRUD operations, and a beautiful UI.
                    </p>
                </motion.div>

                {/* Mission */}
                <AnimateOnScroll>
                    <div className="card-gradient p-8 md:p-12 mb-16 md:mb-24">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                TaskFlow was created to provide developers and teams with a clean, intuitive
                                task management experience. We focus on simplicity over complexity, delivering
                                essential features that help you stay productive.
                            </p>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Values */}
                <div className="mb-16 md:mb-24">
                    <AnimateOnScroll>
                        <div className="section-header">
                            <h2 className="section-title">Our Values</h2>
                            <p className="section-subtitle">The principles that guide our development</p>
                        </div>
                    </AnimateOnScroll>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <AnimateOnScroll key={value.title} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="card p-6 text-center group"
                                >
                                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${value.color} p-3 mb-5 shadow-lg
                                  group-hover:scale-110 transition-transform`}>
                                        <value.icon className="w-full h-full text-white" />
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                                </motion.div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <AnimateOnScroll>
                    <div className="card p-8 md:p-12 mb-16 md:mb-24">
                        <div className="section-header mb-8">
                            <h2 className="section-title">Tech Stack</h2>
                            <p className="section-subtitle">Built with modern technologies</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                                    Frontend
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.frontend.map((tech) => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium border border-primary-100 dark:border-primary-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-secondary-500" />
                                    Backend
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.backend.map((tech) => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 text-sm font-medium border border-secondary-100 dark:border-secondary-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Contact Info */}
                <AnimateOnScroll>
                    <div className="card p-8 md:p-12">
                        <div className="section-header mb-8">
                            <h2 className="section-title">Get in Touch</h2>
                            <p className="section-subtitle">Feel free to reach out</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                                <HiMail className="w-6 h-6 text-primary-600" />
                                <span className="text-gray-700 dark:text-gray-300">{contactInfo.email}</span>
                            </a>
                            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                                <HiPhone className="w-6 h-6 text-green-600" />
                                <span className="text-gray-700 dark:text-gray-300">{contactInfo.phone}</span>
                            </a>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-hover">
                                <HiLocationMarker className="w-6 h-6 text-orange-600" />
                                <span className="text-gray-700 dark:text-gray-300">{contactInfo.location}</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            {contactInfo.socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </div>
    );
}
