// lib/encryption.js
import crypto from 'crypto';

// Use environment variable or fallback key for development
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'dev-key-32-chars-long-minimum!!';
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

// Ensure key is 32 bytes for AES-256
function getKey() {
  const key = Buffer.from(ENCRYPTION_KEY);
  if (key.length < 32) {
    // Pad key if too short
    return Buffer.concat([key, Buffer.alloc(32 - key.length)], 32);
  }
  return key.slice(0, 32);
}

/**
 * Encrypt a string value
 * @param {string} text - The text to encrypt
 * @returns {string} - Encrypted text in format: iv:encrypted
 */
export function encrypt(text) {
  if (!text) return text;
  
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Return iv:encrypted format
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt an encrypted string
 * @param {string} text - The encrypted text in format: iv:encrypted
 * @returns {string} - Decrypted text
 */
export function decrypt(text) {
  if (!text) return text;
  
  try {
    // Check if text is in encrypted format
    if (!text.includes(':')) {
      console.warn('Text is not in encrypted format');
      return text;
    }
    
    const [ivHex, encrypted] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    // Return original if decryption fails
    return text;
  }
}

/**
 * Check if a string is encrypted
 * @param {string} text - The text to check
 * @returns {boolean} - True if encrypted
 */
export function isEncrypted(text) {
  if (!text || typeof text !== 'string') return false;
  
  // Check for iv:encrypted format
  if (!text.includes(':')) return false;
  
  const [ivHex, encrypted] = text.split(':');
  
  // IV should be 32 hex characters (16 bytes)
  // Encrypted part should be hex
  return (
    ivHex.length === 32 && 
    /^[0-9a-f]+$/i.test(ivHex) &&
    /^[0-9a-f]+$/i.test(encrypted)
  );
}

/**
 * Hash a value (one-way, for passwords)
 * @param {string} text - The text to hash
 * @returns {string} - Hashed text
 */
export function hash(text) {
  if (!text) return text;
  
  try {
    return crypto
      .createHash('sha256')
      .update(text)
      .digest('hex');
  } catch (error) {
    console.error('Hash error:', error);
    throw new Error('Failed to hash data');
  }
}

/**
 * Compare a plain text value with a hashed value
 * @param {string} plainText - The plain text
 * @param {string} hashedText - The hashed text
 * @returns {boolean} - True if they match
 */
export function compareHash(plainText, hashedText) {
  try {
    return hash(plainText) === hashedText;
  } catch (error) {
    console.error('Hash comparison error:', error);
    return false;
  }
}

const encryption = {
  encrypt,
  decrypt,
  isEncrypted,
  hash,
  compareHash
};

export default encryption;
