import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/Toast';

export const metadata: Metadata = {
    title: 'TaskFlow - Task Management Made Simple',
    description: 'A simple, professional task management system for modern teams and developers.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ToastProvider />
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-1 pt-16">{children}</main>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
