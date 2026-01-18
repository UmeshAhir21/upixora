import { z } from 'zod';
import { isValidInputFormat, isValidOutputFormat } from './format-utils';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 50MB'),
  type: z.string().refine(
    (type) => type.startsWith('image/'),
    'File must be an image'
  ),
});

export const conversionOptionsSchema = z.object({
  format: z.string().refine(
    (format) => isValidOutputFormat(format),
    'Invalid output format'
  ),
  quality: z.number().min(1).max(100).optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 50MB' };
  }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !isValidInputFormat(extension)) {
    return { valid: false, error: 'Unsupported image format' };
  }

  return { valid: true };
}
