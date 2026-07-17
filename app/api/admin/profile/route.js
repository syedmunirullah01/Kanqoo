// app/api/admin/profile/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const sanitizeString = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id)
      .select('fullName firstName lastName email phone company jobTitle handlerName role userType links');

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const data = {
      id: user._id.toString(),
      fullName: user.fullName || '',
      firstName: user.firstName || (user.fullName ? user.fullName.split(' ')[0] : ''),
      lastName: user.lastName || (user.fullName ? user.fullName.split(' ').slice(1).join(' ') : ''),
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      jobTitle: user.jobTitle || '',
      handlerName: user.handlerName || '',
      role: user.role || 'publisher',
      userType: user.userType || '',
      links: user.links || [],
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to load profile' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    const firstName = sanitizeString(payload.firstName);
    const lastName = sanitizeString(payload.lastName);
    const email = sanitizeString(payload.email).toLowerCase();
    const phone = sanitizeString(payload.phone);
    const company = sanitizeString(payload.company);
    const jobTitle = sanitizeString(payload.jobTitle);

    if (!firstName || !lastName) {
      return NextResponse.json({ success: false, error: 'First name and last name are required' }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: session.user.id },
    }).select('_id');

    if (existingEmail) {
      return NextResponse.json({ success: false, error: 'Email is already in use' }, { status: 409 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = `${firstName} ${lastName}`.trim();
    user.email = email;
    user.phone = phone || null;
    user.company = company || null;
    user.jobTitle = jobTitle || null;
    user.handlerName = user.handlerName || user.fullName;

    await user.save();

    const responseData = {
      id: user._id.toString(),
      fullName: user.fullName,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      jobTitle: user.jobTitle || '',
      handlerName: user.handlerName || '',
      role: user.role || 'publisher',
      userType: user.userType || '',
    };

    return NextResponse.json({
      success: true,
      data: responseData,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}
