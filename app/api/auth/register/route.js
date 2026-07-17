// app/api/auth/register/route.js - Updated with proper error handling
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import crypto from 'crypto';
import User from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';
import dbConnect from '@/lib/mongodb';

// Connect to MongoDB
async function connectDB() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Named export for POST method (required by Next.js)
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      handlerName,
      links,
      userType,
      agreeToTerms
    } = body;

    // ============================================
    // VALIDATION
    // ============================================

    // Required fields validation
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, and password are required' },
        { status: 400 }
      );
    }

    // Password match validation
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Terms agreement validation
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    // ============================================
    // CHECK EXISTING USER
    // ============================================

    const existingUser = await User.findOne({ email: sanitizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // ============================================
    // HASH PASSWORD
    // ============================================

    const hashedPassword = await bcrypt.hash(password, 12);

    // ============================================
    // GENERATE VERIFICATION TOKEN
    // ============================================

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // ============================================
    // CLEAN & PREPARE DATA
    // ============================================

    // Filter out empty links
    const cleanedLinks = links?.filter(link => link && link.trim() !== '') || [];

    // Prepare user data
    const userData = {
      fullName: fullName.trim(),
      email: sanitizedEmail,
      phone: phone?.trim() || null,
      password: hashedPassword,
      handlerName: handlerName?.trim() || null,
      links: cleanedLinks,
      userType: userType || 'publisher',
      role: 'publisher',
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry,
      isActive: true,
    };

    // ============================================
    // CREATE USER IN DATABASE
    // ============================================

    const user = await User.create(userData);

    console.log('✅ User created:', user.email);

    // ============================================
    // SEND VERIFICATION EMAIL
    // ============================================

    const emailResult = await sendVerificationEmail(
      user.email,
      user.fullName,
      verificationToken
    );

    if (!emailResult.success) {
      console.error('⚠️ Failed to send verification email:', emailResult.error);
      // Don't fail registration if email fails - user can resend later
    } else {
      console.log('✅ Verification email sent to:', user.email);
    }

    // ============================================
    // PREPARE RESPONSE (REMOVE SENSITIVE DATA)
    // ============================================

    const userResponse = {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      handlerName: user.handlerName,
      userType: user.userType,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };

    // ============================================
    // SUCCESS RESPONSE
    // ============================================

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        user: userResponse,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Registration error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS (if needed)
export async function OPTIONS(req) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
