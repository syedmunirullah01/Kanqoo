import dbConnect from '@/lib/mongodb';
import NetworkVerificationFile from '@/models/NetworkVerificationFile';

const ALLOWED_EXTENSIONS = new Set(['.html', '.htm', '.txt', '.xml', '.json']);

const getExtension = (filename = '') => {
  const dotIndex = filename.lastIndexOf('.');
  return dotIndex >= 0 ? filename.slice(dotIndex).toLowerCase() : '';
};

export async function GET(_request, { params }) {
  try {
    const resolvedParams = await params;
    const filename = String(resolvedParams?.verificationFile || '').trim();

    if (!filename || filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
      return new Response('Not found', { status: 404 });
    }

    const extension = getExtension(filename);
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return new Response('Not found', { status: 404 });
    }

    await dbConnect();

    const file = await NetworkVerificationFile.findOne({
      publicPath: `/${filename}`,
      isActive: true,
    }).lean();

    if (!file) {
      return new Response('Not found', { status: 404 });
    }

    const body = Buffer.isBuffer(file.content)
      ? file.content
      : Buffer.from(file.content?.buffer || file.content || []);

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': file.mimeType || 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('GET /[verificationFile] error:', err);
    return new Response('Not found', { status: 404 });
  }
}
