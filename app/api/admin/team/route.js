// app/api/admin/team/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { validatePassword as validatePasswordRules, passwordRequirements } from '@/lib/passwordValidation';
import { sendTeamInviteEmail } from '@/lib/email';

const TEAM_ROLES = ['admin', 'social media manager', 'data entry'];
const ADMIN_SECTION_WHITELIST = [
  '/admin/merchants',
  '/admin/publishers',
  '/admin/networks',
  '/admin/reporting',
  '/admin/settings',
];
const INVITE_EXPIRY_DAYS = 7;

const normalizeEmail = (email) => (typeof email === 'string' ? email.trim().toLowerCase() : '');
const getDefaultSectionsForRole = (roleValue) => {
  if (roleValue === 'admin') return ['*'];
  if (roleValue === 'social media manager') {
    return ['/admin/publishers', '/admin/reporting'];
  }
  if (roleValue === 'data entry') {
    return ['/admin/merchants', '/admin/networks', '/admin/reporting'];
  }
  return [];
};
const sanitizeAllowedSections = (roleValue, sections) => {
  if (roleValue === 'admin') return ['*'];
  const valid = new Set(ADMIN_SECTION_WHITELIST);
  const filtered = (sections || []).filter((value) => valid.has(value));
  if (filtered.length) return filtered;
  return getDefaultSectionsForRole(roleValue);
};

const requireAdminSession = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ? String(session.user.role).toLowerCase() : '';
  if (!session?.user?.id || role !== 'admin') {
    return { error: true, response: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }) };
  }
  return { error: false, session };
};

const formatMember = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName || '',
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  email: user.email,
  role: user.role,
  isActive: Boolean(user.isActive),
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
  inviteStatus: user.inviteAcceptedAt
    ? 'accepted'
    : user.inviteToken
      ? 'pending'
      : user.isActive
        ? 'active'
        : 'inactive',
  inviteSentAt: user.invitedAt,
  inviteExpiresAt: user.inviteTokenExpiry,
  allowedAdminSections: Array.isArray(user.allowedAdminSections) ? user.allowedAdminSections : [],
});

const fetchTeamMembers = async () => {
  await dbConnect();
  const team = await User.find({ role: { $in: TEAM_ROLES } })
    .select('fullName firstName lastName email role isActive lastLogin createdAt inviteToken inviteTokenExpiry invitedAt inviteAcceptedAt allowedAdminSections')
    .sort({ createdAt: -1 });
  return team.map(formatMember);
};

const ensureLastAdminWillRemain = async (targetUserId, newRole) => {
  await dbConnect();
  if (newRole && newRole !== 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
    if (adminCount <= 1) {
      const targetUser = await User.findById(targetUserId).select('role');
      if (targetUser?.role === 'admin') {
        throw new Error('You must keep at least one active admin account.');
      }
    }
  }
};

export async function GET() {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    const teamMembers = await fetchTeamMembers();
    return NextResponse.json({ success: true, data: teamMembers });
  } catch (err) {
    console.error('GET /api/admin/team error:', err);
    return NextResponse.json({ success: false, error: 'Failed to load team members' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { error, response, session } = await requireAdminSession();
    if (error) return response;

    const payload = await request.json();
    const firstName = typeof payload.firstName === 'string' ? payload.firstName.trim() : '';
    const lastName = typeof payload.lastName === 'string' ? payload.lastName.trim() : '';
    const fullName = `${firstName} ${lastName}`.trim();
    const email = normalizeEmail(payload.email);
    const role = typeof payload.role === 'string' ? payload.role.trim().toLowerCase() : '';
    const requestedSections = Array.isArray(payload.allowedAdminSections) ? payload.allowedAdminSections : [];

    if (!firstName || !lastName) {
      return NextResponse.json({ success: false, error: 'First and last name are required' }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }
    if (!TEAM_ROLES.includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role selection' }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, error: 'A user with this email already exists' }, { status: 409 });
    }

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const inviteTokenExpiry = new Date(Date.now() + INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const tempPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12);
    const allowedAdminSections = sanitizeAllowedSections(role, requestedSections);

    const user = await User.create({
      firstName,
      lastName,
      fullName,
      email,
      password: tempPassword,
      role,
      userType: 'publisher',
      emailVerified: false,
      isActive: false,
      inviteToken,
      inviteTokenExpiry,
      invitedAt: new Date(),
      invitedBy: session.user.id,
      allowedAdminSections,
      mustSetPassword: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const inviteUrl = `${process.env.NEXTAUTH_URL}/accept-invite?token=${inviteToken}`;
    try {
      await sendTeamInviteEmail(email, fullName, role, inviteUrl);
    } catch (emailError) {
      console.error('Team invite email failed:', emailError);
    }

    const members = await fetchTeamMembers();
    return NextResponse.json({
      success: true,
      data: members,
      message: `${fullName} invited as ${role}.`,
    });
  } catch (err) {
    console.error('POST /api/admin/team error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to add team member' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { error, response, session } = await requireAdminSession();
    if (error) return response;

    const payload = await request.json();
    const { id } = payload;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Team member id is required' }, { status: 400 });
    }

    const updates = {};
    if (payload.firstName !== undefined) updates.firstName = String(payload.firstName || '').trim();
    if (payload.lastName !== undefined) updates.lastName = String(payload.lastName || '').trim();
    if (updates.firstName || updates.lastName) {
      updates.fullName = `${updates.firstName || ''} ${updates.lastName || ''}`.trim();
    }
    if (payload.email !== undefined) {
      updates.email = normalizeEmail(payload.email);
      if (!updates.email) {
        return NextResponse.json({ success: false, error: 'Email cannot be empty' }, { status: 400 });
      }
    }
    if (payload.role !== undefined) {
      const newRole = String(payload.role || '').toLowerCase();
      if (!TEAM_ROLES.includes(newRole)) {
        return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
      }
      updates.role = newRole;
      await ensureLastAdminWillRemain(id, newRole);
    }
    if (payload.isActive !== undefined) {
      updates.isActive = Boolean(payload.isActive);
      if (!updates.isActive) {
        await ensureLastAdminWillRemain(id, 'deactivate');
      }
    }
    if (payload.allowedAdminSections !== undefined) {
      const requested = Array.isArray(payload.allowedAdminSections) ? payload.allowedAdminSections : [];
      const roleForSanitization = updates.role || undefined;
      updates.allowedAdminSections = sanitizeAllowedSections(roleForSanitization ?? undefined, requested);
    }

    await dbConnect();

    if (updates.email) {
      const emailConflict = await User.findOne({ email: updates.email, _id: { $ne: id } }).select('_id');
      if (emailConflict) {
        return NextResponse.json({ success: false, error: 'Email is already in use' }, { status: 409 });
      }
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    if (updates.allowedAdminSections) {
      updates.allowedAdminSections = sanitizeAllowedSections(updates.role || user.role, updates.allowedAdminSections);
    }
    Object.assign(user, updates);
    user.updatedAt = new Date();
    await user.save();

    const members = await fetchTeamMembers();
    return NextResponse.json({
      success: true,
      data: members,
      message: 'Team member updated successfully',
    });
  } catch (err) {
    console.error('PUT /api/admin/team error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const hardDelete = searchParams.get('hard') === 'true';
    if (!id) {
      return NextResponse.json({ success: false, error: 'Team member id is required' }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    if (hardDelete) {
      await ensureLastAdminWillRemain(id, 'deactivate');
      if (user.role === 'admin') {
        return NextResponse.json({ success: false, error: 'Cannot delete the last active admin.' }, { status: 400 });
      }
      await User.deleteOne({ _id: id });
    } else {
      await ensureLastAdminWillRemain(id, 'deactivate');
      user.isActive = false;
      user.inviteToken = null;
      user.inviteTokenExpiry = null;
      user.updatedAt = new Date();
      await user.save();
    }

    const members = await fetchTeamMembers();
    return NextResponse.json({
      success: true,
      data: members,
      message: hardDelete ? 'Team member deleted' : 'Team member deactivated',
    });
  } catch (err) {
    console.error('DELETE /api/admin/team error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to update team' }, { status: 500 });
  }
}

