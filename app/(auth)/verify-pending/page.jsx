// app/(auth)/verify-pending/page.jsx
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Mail, Loader2, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button'; // Assuming shadcn button
import { Input } from '@/app/components/ui/input'; // Assuming shadcn input
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';

export default function VerifyPending() {
    const { data: session } = useSession();
    const [isResending, setIsResending] = useState(false);
    const [message, setMessage] = useState('');

    const email = session?.user?.email;

    const handleResend = async () => {
        if (!email) {
            showErrorToast('Error', 'Could not find user email.');
            return;
        }

        setIsResending(true);
        setMessage('');
        try {
            const res = await fetch('/api/auth/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setMessage('Email resent! Check your inbox.');
                showSuccessToast('Email Resent', 'A new verification link has been sent.');
            } else {
                setMessage(data.error || 'Failed to resend email.');
                showErrorToast('Resend Failed', data.error || 'Please try again later.');
            }
        } catch (error) {
            setMessage('An error occurred during resend.');
            showErrorToast('Error', 'An unexpected error occurred.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center text-white">
            <Mail className="w-16 h-16 text-[#4BA4B4] mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-gray-300 mb-6">
                We've sent a verification link to{' '}
                <strong className="text-gray-100">{email || 'your email'}</strong>.
                Please click the link in the email to activate your account.
            </p>

            <div className="mb-4">
                <Button
                    onClick={handleResend}
                    disabled={isResending}
                    className="w-full bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2"
                >
                    {isResending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Mail className="w-5 h-5" />
                    )}
                    {isResending ? 'Sending...' : 'Resend Verification Email'}
                </Button>
                {message && <p className="text-sm text-gray-300 mt-3">{message}</p>}
            </div>

            <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full bg-transparent border-white/20 hover:bg-white/10 text-white"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
            </Button>
        </div>
    );
}