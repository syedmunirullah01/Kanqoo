// app/api/auth/verify-email/route.js - Fixed verification route
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/email';
import dbConnect from '@/lib/mongodb';

async function connectDB() {
  await dbConnect();
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid verification link' },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.fullName);

    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully! You can now log in to your account.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}