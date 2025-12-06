'use client';

/**
 * Navbar Component
 * Main navigation bar with responsive mobile menu
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiCheckCircle } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
];

const authLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/tasks', label: 'Tasks' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <HiCheckCircle className="w-8 h-8 text-primary-600" />
                        <span className="text-xl font-bold text-neutral-900">TaskFlow</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {user && authLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <span className="text-sm text-neutral-600">
                                    Hi, {user.name.split(' ')[0]}
                                </span>
                                <button onClick={handleLogout} className="btn-secondary text-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="btn-ghost text-sm">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="btn-primary text-sm">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                        {isOpen ? (
                            <HiX className="w-6 h-6 text-neutral-600" />
                        ) : (
                            <HiMenu className="w-6 h-6 text-neutral-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-neutral-200"
                    >
                        <div className="container-custom py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'text-neutral-600 hover:bg-neutral-100'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {user && authLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'text-neutral-600 hover:bg-neutral-100'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-neutral-200 space-y-2">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full btn-secondary text-sm"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center btn-secondary text-sm"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/auth/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center btn-primary text-sm"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
