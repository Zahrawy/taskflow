import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/Toast';

export const metadata: Metadata = {
    title: 'TaskFlow - Task Manager',
    description: 'A modern task management system',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen flex flex-col">
                <ThemeProvider>
                    <AuthProvider>
                        <ToastProvider />
                        <Navbar />
                        <main className="flex-1 pt-16 md:pt-20">{children}</main>
                        <Footer />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
