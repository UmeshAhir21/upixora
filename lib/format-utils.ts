import type { InputFormat, OutputFormat } from './types';

export type { InputFormat, OutputFormat };

export const INPUT_FORMATS: InputFormat[] = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'svg'];
export const OUTPUT_FORMATS: OutputFormat[] = ['jpg', 'png', 'webp', 'avif', 'tiff'];

export const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  svg: 'image/svg+xml',
  avif: 'image/avif',
};

export function getMimeType(format: string): string {
  return MIME_TYPES[format.toLowerCase()] || 'image/jpeg';
}

export function isValidInputFormat(format: string): format is InputFormat {
  return INPUT_FORMATS.includes(format.toLowerCase() as InputFormat);
}

export function isValidOutputFormat(format: string): format is OutputFormat {
  return OUTPUT_FORMATS.includes(format.toLowerCase() as OutputFormat);
}

export function getFileExtension(format: string): string {
  const ext = format.toLowerCase();
  if (ext === 'jpeg') return 'jpg';
  return ext;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
