// app/api/auth/resend-verification/route.js - New route for resend
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import crypto from 'crypto';
import User from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';
import dbConnect from '@/lib/mongodb';

async function connectDB() {
    await dbConnect();
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email already verified' },
                { status: 400 }
            );
        }

        // Generate new token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        const emailResult = await sendVerificationEmail(
            user.email,
            user.fullName,
            verificationToken
        );

        if (!emailResult.success) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Verification email sent' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Resend verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}