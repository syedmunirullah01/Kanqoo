// app/go/[shortId]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Link from '@/models/Link';

export async function GET(request, context) {
  const { shortId } = (await context.params) || {};

  if (!shortId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    await dbConnect();

    const linkDoc = await Link.findOne({
      shortId,
      isActive: { $ne: false },
    });

    if (!linkDoc?.originalUrl) {
      console.log('Cloaked link not found or inactive:', shortId);
      return NextResponse.redirect(new URL('/404', request.url));
    }

    // Fire-and-forget click tracking
    updateClickCount(linkDoc).catch((err) => {
      console.error('Failed to record link click:', err);
    });

    console.log('Redirecting cloaked link:', { shortId, destination: linkDoc.originalUrl });
    return NextResponse.redirect(linkDoc.originalUrl, 302);
  } catch (error) {
    console.error('Cloaked redirect error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

async function updateClickCount(linkDoc) {
  try {
    if (typeof linkDoc.recordClick === 'function') {
      await linkDoc.recordClick();
    } else {
      await Link.updateOne(
        { _id: linkDoc._id },
        {
          $inc: { clickCount: 1 },
          $set: { lastClickedAt: new Date() },
        },
      );
    }
  } catch (error) {
    console.error('Error updating link click count:', error);
  }
}

