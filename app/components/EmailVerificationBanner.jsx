"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Mail, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function EmailVerificationBanner() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');

  // Don't show if email is verified or banner is dismissed
  if (!session?.user || session.user.emailVerified || !isVisible) {
    return null;
  }

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Verification email sent! Check your inbox.' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send email' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">
            Verify Your Email Address
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Please check your email and click the verification link to unlock all features.
          </p>
          
          {message && (
            <div className={`flex items-center gap-2 p-2 rounded-lg mb-3 ${
              message.type === 'success' 
                ? 'bg-green-500/20 text-green-200' 
                : 'bg-red-500/20 text-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          )}
          
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Mail className="w-4 h-4" />
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
