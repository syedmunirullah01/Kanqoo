// app/(public)/verify-email/page.jsx - Updated with resend and professional styling
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [email, setEmail] = useState('');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }
        verifyEmail(token);
    }, [token]);

    const verifyEmail = async (token) => {
        try {
            const res = await fetch(`/api/auth/verify-email?token=${token}`);
            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setMessage(data.message);
                showSuccessToast('Verified', 'Email confirmed successfully.');
                setTimeout(() => router.push('/login'), 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Verification failed');
                showErrorToast('Verification Failed', data.error || 'Invalid link.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again.');
            showErrorToast('Error', 'Verification failed.');
        }
    };
    const handleResend = async () => {
        if (!email) {
            setMessage('Enter email');
            return;
        }

        setIsResending(true);
        try {
            const res = await fetch('/api/auth/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setMessage('Email resent! Check inbox.');
                showSuccessToast('Resent', 'Verification email sent.');
            } else {
                setMessage(data.error || 'Resend failed');
                showErrorToast('Resend Failed', data.error);
            }
        } catch (error) {
            setMessage('Resend failed');
            showErrorToast('Resend Failed', 'Try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-80 h-80 bg-[#4BA4B4]/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B45B4B]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
                    {status === 'verifying' && (
                        <>
                            <Loader2 className="w-16 h-16 text-[#4BA4B4] mx-auto animate-spin mb-6" />
                            <h1 className="text-3xl font-bold text-white mb-4">Verifying Email...</h1>
                            <p className="text-gray-300">Please wait while we confirm your email.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">Email Verified! 🎉</h1>
                            <p className="text-gray-300 mb-6">{message}</p>
                            <p className="text-sm text-gray-400 mb-6">Redirecting to login...</p>
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-[#4BA4B4] text-white font-bold py-3 px-6 rounded-2xl inline-flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                            >
                                Go to Login
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-red-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">Verification Failed</h1>
                            <p className="text-gray-300 mb-6">{message}</p>

                            <div className="bg-white/10 rounded-xl p-4 mb-6">
                                <label className="block text-sm text-gray-300 mb-2">Resend Verification</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-400"
                                    />
                                    <Button
                                        onClick={handleResend}
                                        disabled={isResending || !email}
                                        className="bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2"
                                    >
                                        {isResending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                        Resend
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-2xl transition-all duration-300 border border-white/10"
                                >
                                    Go to Login
                                </button>
                                <button
                                    onClick={() => router.push('/register')}
                                    className="bg-[#4BA4B4] hover:bg-[#3a8a99] text-white font-semibold py-3 rounded-2xl transition-all duration-300"
                                >
                                    Register Again
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
