import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NetworkVerificationFile from '@/models/NetworkVerificationFile';
import {
  MAX_VERIFICATION_FILE_SIZE_BYTES,
  buildVerificationPublicPath,
  getVerificationExtension,
  getVerificationMimeType,
  validateVerificationFilename,
} from '@/lib/verificationFiles';

const jsonError = (message, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

const toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  const normalized = String(value ?? '').trim().toLowerCase();
  return ['true', '1', 'yes', 'on'].includes(normalized);
};

const serializeFile = (doc, origin) => ({
  id: doc._id.toString(),
  filename: doc.filename,
  originalFilename: doc.originalFilename,
  publicPath: doc.publicPath,
  publicUrl: origin ? `${origin}${doc.publicPath}` : doc.publicPath,
  provider: doc.provider || '',
  description: doc.description || '',
  isActive: Boolean(doc.isActive),
  extension: doc.extension,
  mimeType: doc.mimeType,
  sizeBytes: doc.sizeBytes,
  uploadedAt: doc.uploadedAt,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const getOrigin = (request) => new URL(request.url).origin;

const requireAdminSession = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ? String(session.user.role).toLowerCase() : '';
  if (!session?.user?.id || role !== 'admin') {
    return { error: true, response: jsonError('Unauthorized', 401) };
  }
  return { error: false, session };
};

async function parseIncomingPayload(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    return {
      file: formData.get('file'),
      provider: formData.has('provider') ? String(formData.get('provider') || '') : undefined,
      description: formData.has('description') ? String(formData.get('description') || '') : undefined,
      serveAtRoot: formData.has('serveAtRoot') ? toBoolean(formData.get('serveAtRoot')) : undefined,
      isActive: formData.has('isActive') ? toBoolean(formData.get('isActive')) : undefined,
      id: String(formData.get('id') || ''),
    };
  }

  const body = await request.json().catch(() => ({}));
  return {
    file: null,
    provider: Object.prototype.hasOwnProperty.call(body || {}, 'provider')
      ? String(body?.provider || '')
      : undefined,
    description: Object.prototype.hasOwnProperty.call(body || {}, 'description')
      ? String(body?.description || '')
      : undefined,
    serveAtRoot: Object.prototype.hasOwnProperty.call(body || {}, 'serveAtRoot')
      ? toBoolean(body?.serveAtRoot)
      : undefined,
    isActive: Object.prototype.hasOwnProperty.call(body || {}, 'isActive')
      ? toBoolean(body?.isActive)
      : undefined,
    id: String(body?.id || ''),
  };
}

export async function GET(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    await dbConnect();

    const files = await NetworkVerificationFile.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: files.map((file) => serializeFile(file, getOrigin(request))),
    });
  } catch (err) {
    console.error('GET /api/admin/settings/verification-files error:', err);
    return jsonError('Unable to load verification files.', 500);
  }
}

export async function POST(request) {
  try {
    const { error, response, session } = await requireAdminSession();
    if (error) return response;

    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file');
    const provider = String(formData.get('provider') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const serveAtRoot = toBoolean(formData.get('serveAtRoot'));

    if (!file || typeof file.arrayBuffer !== 'function') {
      return jsonError('A verification file is required.', 400);
    }

    const validation = validateVerificationFilename(file.name);
    if (!validation.ok) {
      return jsonError(validation.message, 400);
    }

    if (file.size > MAX_VERIFICATION_FILE_SIZE_BYTES) {
      return jsonError('File size exceeds the 512 KB limit.', 400);
    }

    const existing = await NetworkVerificationFile.findOne({ filename: validation.filename }).lean();
    if (existing) {
      return jsonError('A file with this filename already exists. Use PATCH to replace it.', 409);
    }

    const publicPath = buildVerificationPublicPath(validation.filename, serveAtRoot);
    const publicPathConflict = await NetworkVerificationFile.findOne({ publicPath }).lean();
    if (publicPathConflict) {
      return jsonError('A verification file already uses that public URL.', 409);
    }

    const contentBuffer = Buffer.from(await file.arrayBuffer());
    const mimeType = getVerificationMimeType(validation.filename, file.type);

    const doc = await NetworkVerificationFile.create({
      filename: validation.filename,
      originalFilename: file.name,
      publicPath,
      content: contentBuffer,
      mimeType,
      extension: getVerificationExtension(validation.filename),
      sizeBytes: file.size,
      provider,
      description,
      isActive: true,
      uploadedBy: session?.user?.id,
      uploadedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: serializeFile(doc.toObject(), getOrigin(request)),
    });
  } catch (err) {
    console.error('POST /api/admin/settings/verification-files error:', err);
    return jsonError('Unable to upload verification file.', 500);
  }
}

export async function PATCH(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    await dbConnect();

    const payload = await parseIncomingPayload(request);
    const id = request.nextUrl.searchParams.get('id') || payload.id;
    if (!id) {
      return jsonError('A file id is required.', 400);
    }

    const existing = await NetworkVerificationFile.findById(id);
    if (!existing) {
      return jsonError('Verification file not found.', 404);
    }

    const updates = {};
    if (typeof payload.provider === 'string') {
      updates.provider = payload.provider.trim();
    }
    if (typeof payload.description === 'string') {
      updates.description = payload.description.trim();
    }
    if (typeof payload.isActive !== 'undefined') {
      updates.isActive = Boolean(payload.isActive);
    }

    const currentServeAtRoot = !String(existing.publicPath || '').startsWith('/network-verification/');
    const nextServeAtRoot = typeof payload.serveAtRoot === 'boolean'
      ? payload.serveAtRoot
      : currentServeAtRoot;

    if (payload.file && typeof payload.file.arrayBuffer === 'function') {
      const validation = validateVerificationFilename(payload.file.name);
      if (!validation.ok) {
        return jsonError(validation.message, 400);
      }

      if (payload.file.size > MAX_VERIFICATION_FILE_SIZE_BYTES) {
        return jsonError('File size exceeds the 512 KB limit.', 400);
      }

      const duplicate = await NetworkVerificationFile.findOne({
        filename: validation.filename,
        _id: { $ne: existing._id },
      }).lean();
      if (duplicate) {
        return jsonError('A file with this filename already exists.', 409);
      }

      const contentBuffer = Buffer.from(await payload.file.arrayBuffer());
      updates.filename = validation.filename;
      updates.originalFilename = payload.file.name;
      updates.content = contentBuffer;
      updates.mimeType = getVerificationMimeType(validation.filename, payload.file.type);
      updates.extension = getVerificationExtension(validation.filename);
      updates.sizeBytes = payload.file.size;
      updates.publicPath = buildVerificationPublicPath(validation.filename, nextServeAtRoot);
    } else if (typeof payload.serveAtRoot === 'boolean') {
      updates.publicPath = buildVerificationPublicPath(existing.filename, nextServeAtRoot);
    }

    if (updates.filename) {
      const conflict = await NetworkVerificationFile.findOne({
        $or: [
          { filename: updates.filename, _id: { $ne: existing._id } },
          { publicPath: updates.publicPath, _id: { $ne: existing._id } },
        ],
      }).lean();
      if (conflict) {
        return jsonError('A verification file already uses that filename or public URL.', 409);
      }
    } else if (updates.publicPath) {
      const conflict = await NetworkVerificationFile.findOne({
        publicPath: updates.publicPath,
        _id: { $ne: existing._id },
      }).lean();
      if (conflict) {
        return jsonError('A verification file already uses that public URL.', 409);
      }
    }

    Object.assign(existing, updates);
    await existing.save();

    return NextResponse.json({
      success: true,
      data: serializeFile(existing.toObject(), getOrigin(request)),
    });
  } catch (err) {
    console.error('PATCH /api/admin/settings/verification-files error:', err);
    return jsonError('Unable to update verification file.', 500);
  }
}

export async function DELETE(request) {
  try {
    const { error, response } = await requireAdminSession();
    if (error) return response;

    await dbConnect();

    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return jsonError('A file id is required.', 400);
    }

    const deleted = await NetworkVerificationFile.findByIdAndDelete(id);
    if (!deleted) {
      return jsonError('Verification file not found.', 404);
    }

    return NextResponse.json({ success: true, message: 'Verification file deleted.' });
  } catch (err) {
    console.error('DELETE /api/admin/settings/verification-files error:', err);
    return jsonError('Unable to delete verification file.', 500);
  }
}
