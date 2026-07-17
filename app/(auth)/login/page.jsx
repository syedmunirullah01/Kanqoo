"use client";

import { Suspense, useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  RefreshCw, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';
import { showErrorToast, showSuccessToast } from '@/lib/toast-utils';
import Navbar from "@/app/components/website/layout/Navbar";

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  useEffect(() => {
    if (registered === 'true') {
      showSuccessToast('Registration Successful', 'Please verify your email to log in.');
    }
  }, [registered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    });

    setIsLoading(false);

    if (res?.ok) {
      const session = await getSession();
      const role = session?.user?.role;
      let destination = '/dashboard';

      if (role === 'admin') {
        destination = '/admin';
      } else if (role === 'publisher') {
        destination = '/publisher';
      }

      showSuccessToast('Welcome Back', 'Logged in successfully.');
      router.push(destination);
    } else {
      const errorMsg = res?.error || 'Sign in failed';
      let friendlyError = errorMsg;

      if (errorMsg.toLowerCase().includes('verify')) {
        friendlyError = 'Please verify your email before logging in. Check your inbox or resend the verification email.';
      } else if (errorMsg.toLowerCase().includes('pending approval')) {
        friendlyError = 'Your account is still pending admin approval. An admin will enable your access once reviewed.';
      }

      setError(friendlyError);
      showErrorToast('Login Failed', friendlyError);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (error) setError('');
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showSuccessToast('Email Resent', 'Verification email sent! Check your inbox.');
        setError('');
      } else {
        setError(data.error || 'Failed to resend email');
        showErrorToast('Resend Failed', data.error || 'Failed to resend email');
      }
    } catch (err) {
      setError('Failed to resend email. Please try again.');
      showErrorToast('Resend Failed', 'Failed to resend email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] relative z-10">
      
      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100/50 p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-left mb-5">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-1.5 font-sans">
              Welcome back!
            </h2>
            <p className="text-slate-400 text-sm font-medium font-sans">
              Sign in to your Kanqoo account.
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-900 font-bold text-sm font-sans">Login Failed</p>
                <p className="text-red-700 text-xs mt-1 font-medium leading-relaxed font-sans">{error}</p>
                {error.includes('verify') && (
                  <button
                    onClick={handleResendVerification}
                    disabled={isLoading}
                    className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 mt-2.5 font-sans"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                    Resend verification email
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Enter your email address"
                className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all disabled:opacity-50 text-sm font-medium font-sans"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-12 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-slate-850 placeholder-slate-400 focus:outline-none transition-all disabled:opacity-50 text-sm font-medium font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Forgot Password Link */}
              <div className="text-left mt-1.5">
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors font-sans"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans text-sm tracking-wide mt-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative z-10 px-3 bg-white text-xs font-semibold text-slate-450 font-sans uppercase">or</span>
          </div>

          {/* Secondary Sign Up Action */}
          <Link
            href="/register"
            className="w-full h-12 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-sans"
          >
            <span>Create your account</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>

          {/* Back to Home Link */}
          <div className="text-center mt-4 select-none">
            <Link 
              href="/" 
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors font-sans"
            >
              Back to homepage
            </Link>
          </div>

        </div>

      </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
