"use client";
import React, { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return setStatus('error');
        setStatus('sending');
        try {
            // placeholder for real subscription logic
            await new Promise((r) => setTimeout(r, 700));
            setStatus('sent');
            setEmail('');
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3">
            <input
                aria-label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 transition-all font-bold text-white whitespace-nowrap shadow-sm active:scale-95 transform duration-300"
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'Sending…' : 'Subscribe'}
            </button>

            {status === 'sent' && <div className="text-sm text-emerald-400 mt-2 sm:mt-0 font-medium">Thanks — check your inbox.</div>}
            {status === 'error' && <div className="text-sm text-rose-400 mt-2 sm:mt-0 font-medium">Please enter a valid email.</div>}
        </form>
    );
}
