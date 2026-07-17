// app/api/admin/publishers/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { sendSuspensionEmail, sendPublisherStatusEmail } from '@/lib/email';

const ELIGIBLE_ROLES = ['admin', 'publisher', 'social media manager', 'data entry'];

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const toCurrencyNumber = (value) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatPublisher = (doc) => {
  const base = doc.toObject ? doc.toObject() : doc;
  const id = base._id?.toString() ?? base.id;
  const role = base.role || 'user';
  const revShareValue = role === 'publisher' ? (base.revShare || '50%') : (base.revShare || null);
  const lastActivitySource = base.lastLogin || base.updatedAt || base.createdAt;
  const fadeUntil = base.fadeUntil ? new Date(base.fadeUntil).toISOString() : null;
  const fadedAt = base.fadedAt ? new Date(base.fadedAt).toISOString() : null;

  return {
    id,
    fullName: base.fullName,
    email: base.email,
    phone: base.phone || '',
    status: base.status || 'pending',
    role,
    revShare: revShareValue,
    pubId: base.pubId || '',
    createdAt: base.createdAt,
    lastLogin: base.lastLogin,
    isActive: typeof base.isActive === 'boolean' ? base.isActive : true,
    totalEarnings: toCurrencyNumber(base.totalEarnings),
    pendingEarnings: toCurrencyNumber(base.pendingEarnings),
    lastActivity: lastActivitySource ? new Date(lastActivitySource).toISOString() : null,
    userType: base.userType,
    handlerName: base.handlerName || '',
    links: base.links || [],
    isFaded: Boolean(base.isFaded),
    statusBeforeFade: base.statusBeforeFade || null,
    fadedAt,
    fadeUntil,
  };
};

export async function GET() {
  try {
    await dbConnect();

    try {
      const now = new Date();
      await User.deleteMany({
        isFaded: true,
        fadeUntil: { $lte: now },
      });
    } catch (cleanupError) {
      console.error('Failed to cleanup faded publishers:', cleanupError);
    }

    const publishers = await User.find({
      role: { $in: ELIGIBLE_ROLES },
    })
      .select('-password -verificationToken -resetPasswordToken -resetPasswordExpiry')
      .sort({ createdAt: -1 });

    const formattedPublishers = publishers.map(formatPublisher);

    return NextResponse.json({
      success: true,
      data: formattedPublishers,
      count: formattedPublishers.length,
    });
  } catch (error) {
    console.error('Failed to fetch publishers:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch publishers' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, action, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Publisher ID is required' }, { status: 400 });
    }

    const publisher = await User.findById(id);
    if (!publisher) {
      return NextResponse.json({ success: false, error: 'Publisher not found' }, { status: 404 });
    }

    if (action === 'revive') {
      if (!publisher.isFaded) {
        return NextResponse.json({ success: false, error: 'Publisher is not faded' }, { status: 400 });
      }

      const restoredStatus = publisher.statusBeforeFade || 'pending';
      publisher.status = restoredStatus;
      publisher.statusBeforeFade = null;
      publisher.isFaded = false;
      publisher.fadedAt = null;
      publisher.fadeUntil = null;
      publisher.isActive = true;
      publisher.updatedAt = new Date();
      await publisher.save();

      const formattedPublisher = formatPublisher(publisher);

      if (['approved', 'pending', 'declined'].includes(restoredStatus)) {
        try {
          const emailResult = await sendPublisherStatusEmail(
            publisher.email,
            publisher.fullName,
            restoredStatus
          );
          if (!emailResult.success) {
            console.error('Failed to send status email on revive:', emailResult.error);
          }
        } catch (emailError) {
          console.error('sendPublisherStatusEmail threw an error on revive:', emailError);
        }
      }

      return NextResponse.json({
        success: true,
        data: formattedPublisher,
        message: 'Publisher restored successfully',
      });
    }

    const previousStatus = publisher.status;

    Object.assign(publisher, updateData);
    publisher.updatedAt = new Date();
    await publisher.save();

    const formattedPublisher = formatPublisher(publisher);
    const statusChangedToSuspended =
      updateData.status === 'suspended' && previousStatus !== 'suspended';
    const statusChanged = updateData.status && updateData.status !== previousStatus;

    if (statusChangedToSuspended) {
      try {
        const emailResult = await sendSuspensionEmail(
          publisher.email,
          publisher.fullName,
          updateData.suspensionContext || {}
        );

        if (!emailResult.success) {
          console.error('Failed to send suspension email:', emailResult.error);
        }
      } catch (emailError) {
        console.error('sendSuspensionEmail threw an error:', emailError);
      }
    }

    if (
      statusChanged &&
      ['approved', 'pending', 'declined'].includes(updateData.status)
    ) {
      try {
        const emailResult = await sendPublisherStatusEmail(
          publisher.email,
          publisher.fullName,
          updateData.status
        );

        if (!emailResult.success) {
          console.error('Failed to send status change email:', emailResult.error);
        }
      } catch (emailError) {
        console.error('sendPublisherStatusEmail threw an error:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      data: formattedPublisher,
      message: 'Publisher updated successfully',
    });
  } catch (error) {
    console.error('Failed to update publisher:', error);
    return NextResponse.json({ success: false, error: 'Failed to update publisher' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Publisher ID is required' }, { status: 400 });
    }

    const publisher = await User.findById(id);
    if (!publisher) {
      return NextResponse.json({ success: false, error: 'Publisher not found' }, { status: 404 });
    }

    if (publisher.isFaded) {
      return NextResponse.json({
        success: true,
        data: formatPublisher(publisher),
        message: 'Publisher already scheduled for deletion',
      });
    }

    const now = new Date();
    publisher.statusBeforeFade = publisher.statusBeforeFade || publisher.status;
    publisher.status = 'faded';
    publisher.isFaded = true;
    publisher.fadedAt = now;
    publisher.fadeUntil = new Date(now.getTime() + THIRTY_DAYS_MS);
    publisher.isActive = false;
    publisher.updatedAt = now;

    await publisher.save();

    return NextResponse.json({
      success: true,
      data: formatPublisher(publisher),
      message: 'Publisher scheduled for deletion in 30 days',
    });
  } catch (error) {
    console.error('Failed to delete publisher:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete publisher' }, { status: 500 });
  }
}
