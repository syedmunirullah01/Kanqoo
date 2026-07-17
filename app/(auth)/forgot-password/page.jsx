"use client";
import { useState } from 'react';
import { Mail, ArrowRight, Shield, CheckCircle, Sparkles } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FIX: Remove TypeScript type annotation from function parameter
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] flex items-center justify-center p-4 w-full">
        <div className="absolute inset-0 overflow-hidden max-w-full">
          <div className="absolute top-10 left-10 w-80 h-80 bg-[#4BA4B4]/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B45B4B]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Success Message */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-black text-white mb-4 unbounded-600">
              Check Your Email
            </h1>

            <p className="text-gray-300 mb-6 leading-relaxed">
              We've sent a password reset link to <span className="text-white font-semibold">{email}</span>. The link will expire in 1 hour.
            </p>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <h4 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B45B4B]" />
                What's Next?
              </h4>
              <ul className="text-gray-300 text-sm space-y-1 text-left">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Check your spam folder if you don't see the email</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Follow the instructions in the email to reset your password</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Use your new password to sign in</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/30"
              >
                Resend Email
              </button>
              <a
                href="/login"
                className="block w-full btn-gradient group relative text-white font-bold py-3 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3 overflow-hidden"
              >
                <span>Back to Login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Still having trouble?{' '}
              <a href="/contact" className="text-[#4BA4B4] hover:text-[#B45B4B] transition-colors duration-300">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#4BA4B4]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B45B4B]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-6 h-6 bg-[#4BA4B4] rounded-full animate-float opacity-60"></div>
        <div className="absolute bottom-40 left-32 w-4 h-4 bg-[#B45B4B] rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-6">
            <Shield className="w-5 h-5 text-[#B45B4B]" />
            <span className="text-white font-semibold text-sm">Password Recovery</span>
          </div>

          <h1 className="text-4xl font-black text-white mb-4 unbounded-600">
            Reset Password
          </h1>
          <p className="text-gray-300">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Reset Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white font-semibold mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#4BA4B4] transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gradient group relative text-white font-bold py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Instructions */}
          <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
              What to Expect
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Password reset link valid for 1 hour</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Check your spam folder if you don't see the email</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#4BA4B4] rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Create a strong, unique password</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-[#4BA4B4] hover:text-[#B45B4B] font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Login</span>
          </a>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <Shield className="w-4 h-4 text-[#4BA4B4]" />
            <span className="text-gray-400 text-sm">Your security is our priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}