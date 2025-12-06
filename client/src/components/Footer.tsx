/**
 * Footer Component
 * Site footer with links and social icons
 */
import React from 'react';
import Link from 'next/link';
import { HiCheckCircle, HiHeart } from 'react-icons/hi';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

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
    { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-neutral-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <HiCheckCircle className="w-8 h-8 text-primary-500" />
                            <span className="text-xl font-bold text-white">TaskFlow</span>
                        </Link>
                        <p className="text-sm text-neutral-400">
                            A simple, professional task management system for modern teams and developers.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-white transition-colors"
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
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Connect
                        </h3>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} TaskFlow. All rights reserved.
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                        Made with <HiHeart className="w-4 h-4 text-red-500" /> using Next.js & Express
                    </p>
                </div>
            </div>
        </footer>
    );
}
