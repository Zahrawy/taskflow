/**
 * Footer Component
 * Modern footer with dark mode support and updated contact info
 */
import React from 'react';
import Link from 'next/link';
import { IoCheckmarkCircle, IoHeart } from 'react-icons/io5';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const footerLinks = {
    product: [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/tasks', label: 'Tasks' },
        { href: '/projects', label: 'Projects' },
    ],
    company: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/skills', label: 'Skills' },
    ],
};

const socialLinks = [
    { href: 'https://github.com/Zahrawy', icon: FaGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/mohammad-zahrawy-80502a321', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/mohammad_zahrawy/', icon: FaInstagram, label: 'Instagram' },
];

export default function Footer() {
    return (
        <footer className="relative bg-gray-900 dark:bg-gray-950 text-gray-300 overflow-hidden">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />

            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                                <IoCheckmarkCircle className="relative w-10 h-10 text-primary-400" />
                            </div>
                            <span className="text-2xl font-display font-bold text-white">TaskFlow</span>
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
                            A modern task management system built for developers and teams.
                            Stay organized, boost productivity, and achieve your goals.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-6 space-y-2 text-sm">
                            <a href="mailto:jzjdgg13532@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <HiMail className="w-4 h-4" />
                                jzjdgg13532@gmail.com
                            </a>
                            <p className="text-gray-400">📍 Jordan</p>
                            <p className="text-gray-400">📞 +962 7 8856 2705</p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 flex items-center justify-center
                           hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} TaskFlow. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                            Crafted with <IoHeart className="w-4 h-4 text-danger-500 animate-pulse" /> using
                            <span className="text-gray-400 font-medium">Next.js</span> &
                            <span className="text-gray-400 font-medium">Express</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
