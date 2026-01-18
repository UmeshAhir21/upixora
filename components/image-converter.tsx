'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { OUTPUT_FORMATS, formatBytes, type OutputFormat, isValidInputFormat } from '@/lib/format-utils';
import { validateFile } from '@/lib/validation';
import { cn } from '@/utils/cn';
import { useToast } from './toast-provider';

interface ImageConverterProps {
  defaultFormat?: OutputFormat;
  title?: string;
  description?: string;
  fixedInputFormat?: string; // Expected input format (e.g., 'png' for png-to-jpg page)
  fixedOutputFormat?: OutputFormat; // Fixed output format (hides format selection)
  showFormatSelection?: boolean; // Whether to show format dropdown
}

export function ImageConverter({ 
  defaultFormat = 'png',
  title = 'Convert Your Image',
  description = 'Drag and drop your image or click to browse',
  fixedInputFormat,
  fixedOutputFormat,
  showFormatSelection = true
}: ImageConverterProps) {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<OutputFormat>(fixedOutputFormat || defaultFormat);
  const [quality, setQuality] = useState<number>(90);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    // Basic file validation
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Check if file matches expected input format
    if (fixedInputFormat) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      // Normalize jpeg to jpg
      const normalizedExtension = fileExtension === 'jpeg' ? 'jpg' : fileExtension;
      const expectedFormat = fixedInputFormat.toLowerCase() === 'jpeg' ? 'jpg' : fixedInputFormat.toLowerCase();
      
      // Allow both jpg and jpeg when expected format is jpg
      const isValidFormat = normalizedExtension === expectedFormat || 
        (expectedFormat === 'jpg' && (normalizedExtension === 'jpg' || normalizedExtension === 'jpeg'));
      
      if (!isValidFormat) {
        const formatDisplay = fixedInputFormat === 'jpg' || fixedInputFormat === 'jpeg' ? 'JPG/JPEG' : fixedInputFormat.toUpperCase();
        const errorMessage = `Please upload a ${formatDisplay} file. You uploaded a ${fileExtension?.toUpperCase() || 'unknown'} file.`;
        setError(errorMessage);
        showToast(errorMessage, 'error');
        return;
      }
    }

    setError(null);
    setFile(selectedFile);
    setDownloadUrl(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [fixedInputFormat, showToast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.svg'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);
      if (quality) formData.append('quality', quality.toString());
      if (width) formData.append('width', width);
      if (height) formData.append('height', height);
      if (backgroundColor && format === 'jpg') {
        formData.append('backgroundColor', backgroundColor);
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Conversion failed' }));
        throw new Error(errorData.error || 'Conversion failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Auto-download
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const supportsQuality = ['jpg', 'webp', 'avif'].includes(format);
  const needsBackground = format === 'jpg' && file?.type === 'image/png';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop the image here' : 'Drag & drop your image'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or click to browse (max 50MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</span>
            </div>
            {preview && (
              <div className="mt-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 max-w-full rounded"
                />
              </div>
            )}
          </div>

          {/* Conversion Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showFormatSelection && !fixedOutputFormat && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Output Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as OutputFormat)}
                  className="w-full px-3 py-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                >
                  {OUTPUT_FORMATS.map((f) => (
                    <option key={f} value={f}>
                      {f.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {fixedOutputFormat && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Output Format
                </label>
                <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  {fixedOutputFormat.toUpperCase()}
                </div>
              </div>
            )}

            {supportsQuality && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Width (px, optional)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Auto"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Height (px, optional)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Auto"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {needsBackground && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 w-20 border rounded"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Converting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleConvert}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Converting...' : 'Convert & Download'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
