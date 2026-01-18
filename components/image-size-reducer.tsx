'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatBytes, type OutputFormat } from '@/lib/format-utils';
import { validateFile } from '@/lib/validation';
import { cn } from '@/utils/cn';
import { useToast } from './toast-provider';

export function ImageSizeReducer() {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [targetSize, setTargetSize] = useState<string>('');
  const [targetSizeUnit, setTargetSizeUnit] = useState<'MB' | 'KB'>('MB');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [reducedSize, setReducedSize] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      showToast(validation.error || 'Invalid file', 'error');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setDownloadUrl(null);
    setReducedSize(null);
    setTargetSize('');

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [showToast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.svg'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const handleReduce = async () => {
    if (!file) return;

    const targetSizeBytes = parseFloat(targetSize);
    if (isNaN(targetSizeBytes) || targetSizeBytes <= 0) {
      setError('Please enter a valid target size');
      showToast('Please enter a valid target size', 'error');
      return;
    }

    const targetBytes = targetSizeUnit === 'MB' 
      ? targetSizeBytes * 1024 * 1024 
      : targetSizeBytes * 1024;

    if (targetBytes >= originalSize) {
      setError('Target size must be smaller than original size');
      showToast('Target size must be smaller than original size', 'error');
      return;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    try {
      // Binary search for optimal quality
      let minQuality = 1;
      let maxQuality = 100;
      let bestQuality = 50;
      let bestBlob: Blob | null = null;
      const tolerance = 0.1; // 10% tolerance

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 3, 90));
      }, 300);

      // Determine output format based on original
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let outputFormat: OutputFormat = 'jpg';
      if (fileExtension === 'png') {
        outputFormat = 'png';
      } else if (fileExtension === 'webp') {
        outputFormat = 'webp';
      }

      // Binary search for optimal quality
      for (let i = 0; i < 8; i++) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', outputFormat);
        formData.append('quality', bestQuality.toString());

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to reduce image');
        }

        const blob = await response.blob();
        const size = blob.size;
        const ratio = size / targetBytes;

        if (ratio >= 0.9 && ratio <= 1.1) {
          // Within tolerance
          bestBlob = blob;
          break;
        }

        if (size > targetBytes) {
          // Too large, reduce quality
          maxQuality = bestQuality;
          bestQuality = Math.floor((minQuality + bestQuality) / 2);
        } else {
          // Too small, increase quality
          minQuality = bestQuality;
          bestQuality = Math.floor((bestQuality + maxQuality) / 2);
        }

        if (maxQuality - minQuality < 3) {
          bestBlob = blob;
          break;
        }
      }

      clearInterval(progressInterval);
      setProgress(100);

      if (!bestBlob) {
        // Final attempt with calculated quality
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', outputFormat);
        formData.append('quality', bestQuality.toString());

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to reduce image');
        }

        bestBlob = await response.blob();
      }

      const url = URL.createObjectURL(bestBlob);
      setDownloadUrl(url);
      setReducedSize(bestBlob.size);
      showToast(`Image reduced successfully!`, 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reduce image');
      showToast(err instanceof Error ? err.message : 'Failed to reduce image', 'error');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !file) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `reduced-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setOriginalSize(0);
    setTargetSize('');
    setDownloadUrl(null);
    setReducedSize(null);
    setError(null);
    setProgress(0);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const targetSizeBytes = targetSize 
    ? (targetSizeUnit === 'MB' ? parseFloat(targetSize) * 1024 * 1024 : parseFloat(targetSize) * 1024)
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Size Reducer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your image and reduce it to your desired file size
        </p>
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
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Original: <span className="font-medium text-gray-900 dark:text-gray-100">{formatBytes(originalSize)}</span>
                </span>
                {reducedSize && (
                  <span className="text-green-600 dark:text-green-400">
                    Reduced: <span className="font-medium">{formatBytes(reducedSize)}</span>
                  </span>
                )}
              </div>
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

          {/* Size Reduction Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-2">
                Target Size
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                  placeholder="Enter size"
                  min="0.1"
                  step="0.1"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white text-gray-900 dark:text-gray-100"
                />
                <select
                  value={targetSizeUnit}
                  onChange={(e) => setTargetSizeUnit(e.target.value as 'MB' | 'KB')}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white text-gray-900 dark:text-gray-100"
                >
                  <option value="MB">MB</option>
                  <option value="KB">KB</option>
                </select>
              </div>
              {targetSize && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Target: {formatBytes(targetSizeBytes)}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <button
                onClick={handleReduce}
                disabled={loading || !targetSize || targetSizeBytes >= originalSize}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Reducing...' : 'Reduce Size'}
              </button>
            </div>
          </div>

          {/* Progress */}
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reducing image size...</span>
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
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Download Reduced Image
              </button>
            )}
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
