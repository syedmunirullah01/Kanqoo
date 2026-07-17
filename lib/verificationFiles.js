export const MAX_VERIFICATION_FILE_SIZE_BYTES = 512 * 1024;

export const ALLOWED_VERIFICATION_EXTENSIONS = [
  '.html',
  '.htm',
  '.txt',
  '.xml',
  '.json',
];

const ALLOWED_EXTENSION_SET = new Set(ALLOWED_VERIFICATION_EXTENSIONS);

const RESERVED_FILENAMES = new Set([
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
]);

const RESERVED_ROUTE_BASENAMES = new Set([
  '',
  '_next',
  'about-us',
  'accept-invite',
  'admin',
  'api',
  'blogs',
  'contact-us',
  'for-brands',
  'for-creators',
  'go',
  'instagram',
  'login',
  'privacy-policy',
  'publisher',
  'register',
  'telegram',
  'terms-and-conditions',
  'tiktok',
  'unauthorized',
  'verify-email',
  'verify-pending',
  'youtube',
]);

const MIME_TYPES_BY_EXTENSION = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const SAFE_FILENAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

const normalizeString = (value) => String(value || '').trim();

export function getVerificationExtension(filename) {
  const normalized = normalizeString(filename).toLowerCase();
  const dotIndex = normalized.lastIndexOf('.');
  if (dotIndex <= 0 || dotIndex === normalized.length - 1) {
    return '';
  }
  return normalized.slice(dotIndex);
}

export function getVerificationBaseName(filename) {
  const normalized = normalizeString(filename);
  const dotIndex = normalized.lastIndexOf('.');
  if (dotIndex <= 0) {
    return normalized;
  }
  return normalized.slice(0, dotIndex);
}

export function getVerificationMimeType(filename, providedMimeType = '') {
  const extension = getVerificationExtension(filename);
  return MIME_TYPES_BY_EXTENSION[extension] || normalizeString(providedMimeType) || 'text/plain; charset=utf-8';
}

export function buildVerificationPublicPath(filename, serveAtRoot = false) {
  const safeFilename = normalizeString(filename);
  return serveAtRoot ? `/${safeFilename}` : `/network-verification/${safeFilename}`;
}

export function validateVerificationFilename(filename) {
  const normalized = normalizeString(filename);
  const lower = normalized.toLowerCase();

  if (!normalized) {
    return { ok: false, message: 'Filename is required.' };
  }
  if (normalized.length > 128) {
    return { ok: false, message: 'Filename is too long.' };
  }
  if (normalized.startsWith('.')) {
    return { ok: false, message: 'Filename cannot start with a dot.' };
  }
  if (normalized.includes('/') || normalized.includes('\\')) {
    return { ok: false, message: 'Filename cannot contain slashes.' };
  }
  if (normalized.includes('..')) {
    return { ok: false, message: 'Filename cannot contain path traversal sequences.' };
  }
  if (!SAFE_FILENAME_REGEX.test(normalized)) {
    return {
      ok: false,
      message: 'Filename may only use letters, numbers, dots, hyphens, and underscores.',
    };
  }

  const extension = getVerificationExtension(normalized);
  if (!extension) {
    return { ok: false, message: 'Filename must include an allowed extension.' };
  }
  if (extension !== extension.toLowerCase()) {
    return { ok: false, message: 'File extension must be lowercase.' };
  }
  if (!ALLOWED_EXTENSION_SET.has(extension)) {
    return { ok: false, message: 'Unsupported verification file type.' };
  }

  const baseName = getVerificationBaseName(normalized).toLowerCase();
  if (RESERVED_FILENAMES.has(lower)) {
    return { ok: false, message: 'This filename is reserved.' };
  }
  if (lower.startsWith('_next')) {
    return { ok: false, message: 'This filename prefix is reserved.' };
  }
  if (lower.startsWith('api')) {
    return { ok: false, message: 'This filename prefix is reserved.' };
  }
  if (RESERVED_ROUTE_BASENAMES.has(baseName)) {
    return { ok: false, message: 'This filename conflicts with a reserved application route.' };
  }

  return {
    ok: true,
    filename: normalized,
    extension,
    baseName,
  };
}

export function isServeAtRootPath(publicPath) {
  return String(publicPath || '').startsWith('/') && !String(publicPath || '').startsWith('/network-verification/');
}
