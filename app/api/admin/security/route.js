// app/api/admin/security/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validatePassword as validatePasswordRules, passwordRequirements } from '@/lib/passwordValidation';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = body.currentPassword || '';
    const newPassword = body.newPassword || '';
    const confirmPassword = body.confirmPassword || '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All password fields are required' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'New password and confirmation do not match' },
        { status: 400 }
      );
    }

    const { valid, failed } = validatePasswordRules(newPassword);
    if (!valid) {
      const failedMessages = passwordRequirements
        .filter((req) => failed.includes(req.id))
        .map((req) => req.label.toLowerCase());
      return NextResponse.json(
        {
          success: false,
          error:
            failedMessages.length > 0
              ? `Password must include: ${failedMessages.join(', ')}`
              : 'New password does not meet security requirements',
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findById(session.user.id).select('+password');
    if (!user || !user.password) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { success: false, error: 'New password must be different from the current password' },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    user.password = hashed;
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Failed to update password:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update password' },
      { status: 500 }
    );
  }
}

