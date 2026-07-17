// app/api/team/invite/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { validatePassword as validatePasswordRules, passwordRequirements } from '@/lib/passwordValidation';

const ADMIN_SECTION_WHITELIST = [
  '/admin/merchants',
  '/admin/publishers',
  '/admin/networks',
  '/admin/reporting',
  '/admin/settings',
];

const normalizeToken = (value) => (typeof value === 'string' ? value.trim() : '');

const sanitizeAllowedSections = (role, sections) => {
  if (role === 'admin' || sections?.includes('*')) {
    return ['*'];
  }
  const whitelist = new Set(ADMIN_SECTION_WHITELIST);
  const filtered = (sections || []).filter((value) => whitelist.has(value));
  if (filtered.length) return filtered;
  if (role === 'social media manager') return ['/admin/publishers', '/admin/reporting'];
  if (role === 'data entry') return ['/admin/merchants', '/admin/networks', '/admin/reporting'];
  return [];
};

const formatInvitee = (user) => ({
  email: user.email,
  fullName: user.fullName || '',
  role: user.role,
  allowedAdminSections: sanitizeAllowedSections(user.role, user.allowedAdminSections),
});

const findInvitee = async (token) => {
  const normalized = normalizeToken(token);
  if (!normalized) {
    return null;
  }
  await dbConnect();
  const user = await User.findOne({ inviteToken: normalized }).select(
    'email fullName role inviteTokenExpiry inviteAcceptedAt isActive allowedAdminSections'
  );
  if (!user) return null;
  if (user.inviteAcceptedAt) return null;
  if (user.inviteTokenExpiry && user.inviteTokenExpiry < new Date()) return null;
  return user;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const invitee = await findInvitee(token);
    if (!invitee) {
      return NextResponse.json({ success: false, error: 'Invitation is invalid or has expired.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: formatInvitee(invitee),
    });
  } catch (error) {
    console.error('GET /api/team/invite error:', error);
    return NextResponse.json({ success: false, error: 'Failed to validate invitation.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = normalizeToken(body.token);
    const password = body.password || '';

    if (!token) {
      return NextResponse.json({ success: false, error: 'Invitation token is required.' }, { status: 400 });
    }

    const user = await findInvitee(token);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invitation is invalid or has expired.' }, { status: 404 });
    }

    const passwordCheck = validatePasswordRules(password);
    if (!passwordCheck.valid) {
      const failedMessages = passwordRequirements
        .filter((req) => passwordCheck.failed.includes(req.id))
        .map((req) => req.label.toLowerCase());
      return NextResponse.json(
        {
          success: false,
          error:
            failedMessages.length > 0
              ? `Password must include: ${failedMessages.join(', ')}`
              : 'Password does not meet security requirements.',
        },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(password, 12);
    user.emailVerified = true;
    user.isActive = true;
    user.inviteToken = null;
    user.inviteTokenExpiry = null;
    user.inviteAcceptedAt = new Date();
    user.mustSetPassword = false;
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json({ success: true, message: 'Invitation accepted. You can now sign in.' });
  } catch (error) {
    console.error('POST /api/team/invite error:', error);
    return NextResponse.json({ success: false, error: 'Failed to accept invitation.' }, { status: 500 });
  }
}

