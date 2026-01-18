export type InputFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'svg';
export type OutputFormat = 'jpg' | 'png' | 'webp' | 'avif' | 'gif' | 'bmp' | 'tiff';

export interface ConversionOptions {
  format: OutputFormat;
  quality?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export interface ConversionResult {
  success: boolean;
  data?: Buffer;
  error?: string;
  format: string;
  size: number;
}
