'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatBytes } from '@/lib/format-utils';
import { cn } from '@/utils/cn';
import { useToast } from './toast-provider';

interface ConversionOption {
  from: string;
  to: string;
  label: string;
}

const CONVERSION_MAP: Record<string, ConversionOption[]> = {
  xml: [
    { from: 'xml', to: 'doc', label: 'XML to DOC' },
    { from: 'xml', to: 'docx', label: 'XML to DOCX' },
    { from: 'xml', to: 'pdf', label: 'XML to PDF' },
    { from: 'xml', to: 'txt', label: 'XML to TXT' },
  ],
  doc: [
    { from: 'doc', to: 'pdf', label: 'DOC to PDF' },
    { from: 'doc', to: 'docx', label: 'DOC to DOCX' },
    { from: 'doc', to: 'txt', label: 'DOC to TXT' },
  ],
  docx: [
    { from: 'docx', to: 'pdf', label: 'DOCX to PDF' },
    { from: 'docx', to: 'doc', label: 'DOCX to DOC' },
    { from: 'docx', to: 'txt', label: 'DOCX to TXT' },
  ],
  pdf: [
    { from: 'pdf', to: 'doc', label: 'PDF to DOC' },
    { from: 'pdf', to: 'docx', label: 'PDF to DOCX' },
    { from: 'pdf', to: 'txt', label: 'PDF to TXT' },
  ],
  txt: [
    { from: 'txt', to: 'doc', label: 'TXT to DOC' },
    { from: 'txt', to: 'docx', label: 'TXT to DOCX' },
    { from: 'txt', to: 'pdf', label: 'TXT to PDF' },
  ],
  xls: [
    { from: 'xls', to: 'xlsx', label: 'XLS to XLSX' },
    { from: 'xls', to: 'csv', label: 'XLS to CSV' },
    { from: 'xls', to: 'pdf', label: 'XLS to PDF' },
  ],
  xlsx: [
    { from: 'xlsx', to: 'xls', label: 'XLSX to XLS' },
    { from: 'xlsx', to: 'csv', label: 'XLSX to CSV' },
    { from: 'xlsx', to: 'pdf', label: 'XLSX to PDF' },
  ],
  csv: [
    { from: 'csv', to: 'xls', label: 'CSV to XLS' },
    { from: 'csv', to: 'xlsx', label: 'CSV to XLSX' },
  ],
};

interface FileConverterProps {
  fixedFrom?: string;
  fixedTo?: string;
  title?: string;
  description?: string;
}

export function FileConverter({ 
  fixedFrom,
  fixedTo,
  title = 'File Converter',
  description = 'Upload your file and convert it to different formats'
}: FileConverterProps) {
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [selectedConversion, setSelectedConversion] = useState<ConversionOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  };

  const getAvailableConversions = useCallback((fileName: string): ConversionOption[] => {
    const ext = getFileExtension(fileName);
    return CONVERSION_MAP[ext] || [];
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      showToast('File size must be less than 50MB', 'error');
      return;
    }

    const fileExt = getFileExtension(selectedFile.name);
    
    // Check if fixed format is required
    if (fixedFrom && fileExt !== fixedFrom) {
      const errorMsg = `Please upload a ${fixedFrom.toUpperCase()} file. You uploaded a ${fileExt.toUpperCase()} file.`;
      setError(errorMsg);
      showToast(errorMsg, 'error');
      return;
    }

    const availableConversions = getAvailableConversions(selectedFile.name);
    if (availableConversions.length === 0) {
      setError('No conversion options available for this file type');
      showToast('No conversion options available for this file type', 'error');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setDownloadUrl(null);

    // Auto-select conversion if fixed format is specified
    if (fixedFrom && fixedTo) {
      const fixedConversion = availableConversions.find(
        opt => opt.from === fixedFrom && opt.to === fixedTo
      );
      if (fixedConversion) {
        setSelectedConversion(fixedConversion);
      } else {
        setSelectedConversion(null);
      }
    } else {
      setSelectedConversion(null);
    }
  }, [showToast, fixedFrom, fixedTo, getAvailableConversions]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/xml': ['.xml'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  const handleConvert = async () => {
    if (!file || !selectedConversion) return;

    setLoading(true);
    setProgress(0);
    setError(null);
    setDownloadUrl(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('from', selectedConversion.from);
      formData.append('to', selectedConversion.to);

      const response = await fetch('/api/convert-file', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json().catch(() => ({ error: 'Conversion failed' }));
          throw new Error(errorData.error || 'Conversion failed');
        } else {
          throw new Error(`Conversion failed with status ${response.status}`);
        }
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Auto-download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}.${selectedConversion.to}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast('File converted successfully!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert file');
      showToast(err instanceof Error ? err.message : 'Failed to convert file', 'error');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSelectedConversion(null);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const availableConversions = file ? getAvailableConversions(file.name) : [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
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
                {isDragActive ? 'Drop the file here' : 'Drag & drop your file'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                or click to browse (max 50MB)
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Supported: XML, DOC, DOCX, PDF, TXT, XLS, XLSX, CSV
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</span>
            </div>
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
                {getFileExtension(file.name).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Conversion Options */}
          {availableConversions.length > 0 ? (
            <div className="space-y-4">
              {!fixedFrom && !fixedTo && (
                <h3 className="text-lg font-semibold">Available Conversions:</h3>
              )}
              {fixedFrom && fixedTo && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Selected conversion: <span className="font-semibold">{fixedFrom.toUpperCase()} to {fixedTo.toUpperCase()}</span>
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableConversions.map((option) => {
                  const isSelected = selectedConversion?.from === option.from && selectedConversion?.to === option.to;
                  const isFixed = !!(fixedFrom && fixedTo && option.from === fixedFrom && option.to === fixedTo);
                  
                  return (
                  <button
                    key={`${option.from}-${option.to}`}
                    onClick={() => !isFixed && setSelectedConversion(option)}
                    disabled={isFixed}
                    className={cn(
                      'p-4 border-2 rounded-lg text-left transition-all duration-200',
                      isSelected || isFixed
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800',
                      isFixed && 'cursor-default'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {option.label}
                      </span>
                      {(isSelected || isFixed) && (
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                No conversion options available for this file type.
              </p>
            </div>
          )}

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
              disabled={loading || !selectedConversion}
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
