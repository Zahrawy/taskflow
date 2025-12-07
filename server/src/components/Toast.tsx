'use client';

/**
 * Toast Provider Component
 * Enhanced toast notifications with custom styling
 */
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'white',
                    color: '#111827',
                    borderRadius: '1rem',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    fontWeight: 500,
                },
                success: {
                    style: {
                        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                        border: '1px solid #a7f3d0',
                    },
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                    },
                },
                error: {
                    style: {
                        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                        border: '1px solid #fecaca',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
                loading: {
                    style: {
                        background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                        border: '1px solid #c7d2fe',
                    },
                },
            }}
        />
    );
}
