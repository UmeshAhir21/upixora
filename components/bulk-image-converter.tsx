'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { OUTPUT_FORMATS, formatBytes, type OutputFormat } from '@/lib/format-utils';
import { validateFile } from '@/lib/validation';
import { cn } from '@/utils/cn';

export function BulkImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [format, setFormat] = useState<OutputFormat>('png');
  const [quality, setQuality] = useState<number>(90);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: File[] = [];
    const newPreviews: Record<string, string> = {};

    acceptedFiles.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          newPreviews[file.name] = reader.result as string;
          setPreviews((prev) => ({ ...prev, ...newPreviews }));
        };
        reader.readAsDataURL(file);
      }
    });

    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.svg'],
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024,
  });

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setPreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[fileName];
      return newPreviews;
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fileName];
      return newErrors;
    });
    setCompleted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fileName);
      return newSet;
    });
  };

  const convertFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    if (quality) formData.append('quality', quality.toString());

    const progressInterval = setInterval(() => {
      setProgress((prev) => ({
        ...prev,
        [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
      }));
    }, 100);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress((prev) => ({ ...prev, [file.name]: 100 }));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Conversion failed' }));
        throw new Error(errorData.error || 'Conversion failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setCompleted((prev) => new Set(prev).add(file.name));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[file.name];
        return newErrors;
      });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [file.name]: err instanceof Error ? err.message : 'Conversion failed',
      }));
    } finally {
      setProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
    }
  };

  const handleConvertAll = async () => {
    setLoading(true);
    setErrors({});
    setCompleted(new Set());

    for (const file of files) {
      await convertFile(file);
    }

    setLoading(false);
  };

  const supportsQuality = ['jpg', 'webp', 'avif'].includes(format);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Bulk Image Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert multiple images at once. Upload up to 10 images at a time.
        </p>
      </div>

      {/* Upload Area */}
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
              {isDragActive ? 'Drop images here' : 'Drag & drop multiple images'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              or click to browse (max 50MB per image)
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Options */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Output Format</label>
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
          {supportsQuality && (
            <div>
              <label className="block text-sm font-medium mb-2">Quality: {quality}%</label>
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
          <div className="md:col-span-2">
            <button
              onClick={handleConvertAll}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Converting...' : `Convert All (${files.length} images)`}
            </button>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <div className="flex items-start gap-4">
                {previews[file.name] && (
                  <img
                    src={previews[file.name]}
                    alt={file.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{file.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</span>
                  </div>
                  {progress[file.name] !== undefined && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Converting...</span>
                        <span>{progress[file.name]}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${progress[file.name]}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {completed.has(file.name) && (
                    <p className="text-sm text-green-600 dark:text-green-400">✓ Converted</p>
                  )}
                  {errors[file.name] && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors[file.name]}</p>
                  )}
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Remove file"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
