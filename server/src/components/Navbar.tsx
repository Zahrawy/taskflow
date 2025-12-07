'use client';

/**
 * Navbar Component
 * Modern navigation bar with theme toggle and slide-in mobile menu
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

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
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg shadow-soft dark:shadow-dark-soft border-b border-gray-100 dark:border-dark-border'
                        : 'bg-transparent'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                                <IoCheckmarkCircle className="relative w-9 h-9 text-primary-600" />
                            </div>
                            <span className="text-xl font-display font-bold text-gray-900 dark:text-white">TaskFlow</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={isActive(link.href) ? 'nav-link-active' : 'nav-link'}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {user && authLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={isActive(link.href) ? 'nav-link-active' : 'nav-link'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side: Theme toggle & Auth */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Theme Toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <HiSun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <HiMoon className="w-5 h-5" />
                                )}
                            </motion.button>

                            {user ? (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-dark-card">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {user.name.split(' ')[0]}
                                        </span>
                                    </div>
                                    <button onClick={handleLogout} className="btn-ghost text-sm px-4 py-2">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login" className="btn-ghost text-sm px-4 py-2">
                                        Sign In
                                    </Link>
                                    <Link href="/auth/register" className="btn-primary text-sm px-5 py-2.5">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile: Theme toggle and Menu Button */}
                        <div className="flex lg:hidden items-center gap-2">
                            <motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <HiSun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <HiMoon className="w-5 h-5" />
                                )}
                            </motion.button>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                                aria-label="Toggle menu"
                            >
                                <motion.div
                                    animate={{ rotate: isOpen ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                                </motion.div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm lg:hidden"
                        />

                        {/* Slide-in Menu */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-dark-bg shadow-2xl lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
                                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                        <IoCheckmarkCircle className="w-8 h-8 text-primary-600" />
                                        <span className="text-lg font-display font-bold text-gray-900 dark:text-white">TaskFlow</span>
                                    </Link>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover"
                                    >
                                        <HiX className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Links */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.href)
                                                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {user && (
                                        <>
                                            <div className="h-px bg-gray-100 dark:bg-dark-border my-4" />
                                            {authLinks.map((link, index) => (
                                                <motion.div
                                                    key={link.href}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (navLinks.length + index) * 0.05 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.href)
                                                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </>
                                    )}
                                </div>

                                {/* Auth Section */}
                                <div className="p-4 border-t border-gray-100 dark:border-dark-border space-y-3">
                                    {user ? (
                                        <>
                                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-card">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full btn-secondary justify-center"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/auth/login"
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full btn-secondary justify-center"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/auth/register"
                                                onClick={() => setIsOpen(false)}
                                                className="block w-full btn-primary justify-center"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
