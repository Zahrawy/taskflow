'use client';

/**
 * Contact Page
 * Updated with real email sending and new contact info
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://taskflow-1-g1ao.onrender.com/api';

const contactInfo = [
    {
        icon: HiMail,
        label: 'Email',
        value: 'jzjdgg13532@gmail.com',
        href: 'mailto:jzjdgg13532@gmail.com',
        color: 'from-primary-500 to-primary-600',
    },
    {
        icon: HiPhone,
        label: 'Phone',
        value: '+962 7 8856 2705',
        href: 'tel:+962788562705',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: HiLocationMarker,
        label: 'Location',
        value: 'Jordan',
        href: '#',
        color: 'from-orange-500 to-amber-500',
    },
];

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Zahrawy', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/mohammad-zahrawy-80502a321', label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { icon: FaInstagram, href: 'https://www.instagram.com/mohammad_zahrawy/', label: 'Instagram', color: 'hover:bg-pink-600' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-16 md:py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 gradient-mesh" />
            <div className="absolute top-40 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

            <div className="container-custom relative">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Have a question or want to work together? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact cards */}
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ x: 8 }}
                                className="flex items-center gap-4 p-5 card-hover"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 shadow-lg`}>
                                    <item.icon className="w-full h-full text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                                </div>
                            </motion.a>
                        ))}

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-6"
                        >
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Follow on social media</p>
                            <div className="flex gap-3">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 flex items-center justify-center
                              hover:text-white ${link.color} transition-all duration-300`}
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <div className="card-glass p-6 md:p-8">
                            <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-6">Send a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="How can I help?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="input resize-none"
                                        placeholder="Your message..."
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary w-full md:w-auto gap-2 py-3 px-8"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <>
                                            Send Message
                                            <HiPaperAirplane className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
