import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Upload, File, X, CheckCircle, AlertCircle, Image } from 'lucide-react';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  dragAndDrop?: boolean;
  showPreview?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  onUpload?: (files: File[]) => Promise<void>;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
  'data-testid'?: string;
}

interface FileWithPreview extends File {
  preview?: string;
  uploadStatus?: 'pending' | 'uploading' | 'success' | 'error';
  uploadProgress?: number;
  error?: string;
}

/**
 * FileUpload component for MedSpaSync Pro
 * Provides file upload with drag & drop, preview, and progress tracking
 * Built with TypeScript and Framer Motion for enhanced user experience
 * Supports multiple file formats and validation
 */
const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  dragAndDrop = true,
  showPreview = true,
  onFilesSelected,
  onFileRemove,
  onUpload,
  variant = 'default',
  className = '',
  'data-testid': dataTestId = 'file-upload',
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;
      
      const isValidType = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return acceptedType === fileExtension;
        }
        if (acceptedType.includes('*')) {
          const [mainType] = acceptedType.split('/');
          return mimeType.startsWith(mainType);
        }
        return acceptedType === mimeType;
      });
      
      if (!isValidType) {
        return `File type not supported. Accepted: ${accept}`;
      }
    }
    
    return null;
  };

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  };

  const processFiles = useCallback(async (fileList: FileList) => {
    const newFiles: FileWithPreview[] = [];
    const currentFileCount = files.length;
    
    for (let i = 0; i < fileList.length; i++) {
      if (currentFileCount + newFiles.length >= maxFiles) {
        break;
      }
      
      const file = fileList[i] as FileWithPreview;
      const error = validateFile(file);
      
      if (error) {
        file.uploadStatus = 'error';
        file.error = error;
      } else {
        file.uploadStatus = 'pending';
        if (showPreview) {
          file.preview = await createFilePreview(file);
        }
      }
      
      newFiles.push(file);
    }
    
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
  }, [files, maxFiles, maxSize, accept, showPreview, onFilesSelected]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileRemove?.(index);
  };

  const handleUpload = async () => {
    if (!onUpload || uploading) return;
    
    const validFiles = files.filter(file => file.uploadStatus === 'pending');
    if (validFiles.length === 0) return;
    
    setUploading(true);
    
    try {
      // Update status to uploading
      setFiles(prev => prev.map(file => 
        file.uploadStatus === 'pending' 
          ? { ...file, uploadStatus: 'uploading', uploadProgress: 0 }
          : file
      ));
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(file => 
          file.uploadStatus === 'uploading' 
            ? { ...file, uploadProgress: progress }
            : file
        ));
      }
      
      await onUpload(validFiles);
      
      // Mark as success
      setFiles(prev => prev.map(file => 
        file.uploadStatus === 'uploading' 
          ? { ...file, uploadStatus: 'success', uploadProgress: 100 }
          : file
      ));
    } catch (error) {
      // Mark as error
      setFiles(prev => prev.map(file => 
        file.uploadStatus === 'uploading' 
          ? { ...file, uploadStatus: 'error', error: 'Upload failed' }
          : file
      ));
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getStatusIcon = (file: FileWithPreview) => {
    switch (file.uploadStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'uploading':
        return (
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        );
      default:
        return null;
    }
  };

  const variantClasses = {
    default: 'border-2 border-dashed border-gray-300 rounded-lg p-8',
    compact: 'border border-gray-300 rounded-md p-4',
    minimal: 'border-b border-gray-300 pb-4',
  };

  const dropZoneClasses = clsx(
    variantClasses[variant],
    'transition-all duration-200 cursor-pointer',
    {
      'border-blue-500 bg-blue-50': dragActive,
      'hover:border-gray-400 hover:bg-gray-50': !disabled && !dragActive,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <div className="w-full" data-testid={dataTestId}>
      {/* Drop Zone */}
      <div
        className={dropZoneClasses}
        onDragEnter={dragAndDrop ? handleDragIn : undefined}
        onDragLeave={dragAndDrop ? handleDragOut : undefined}
        onDragOver={dragAndDrop ? handleDrag : undefined}
        onDrop={dragAndDrop ? handleDrop : undefined}
        onClick={() => !disabled && fileInputRef.current?.click()}
        data-testid={`${dataTestId}-dropzone`}
      >
        <div className="text-center">
          <Upload className={clsx(
            'mx-auto mb-4',
            variant === 'default' ? 'w-12 h-12' : 'w-8 h-8',
            dragActive ? 'text-blue-500' : 'text-gray-400'
          )} />
          
          {variant === 'default' && (
            <>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {dragAndDrop ? 'Drop files here or click to upload' : 'Click to upload files'}
              </p>
              <p className="text-sm text-gray-500">
                {accept && `Supported formats: ${accept}`}
                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                {multiple && ` • Max files: ${maxFiles}`}
              </p>
            </>
          )}
          
          {variant === 'compact' && (
            <p className="text-sm text-gray-600">
              {dragAndDrop ? 'Drop files or click to browse' : 'Click to browse files'}
            </p>
          )}
          
          {variant === 'minimal' && (
            <p className="text-sm text-blue-600">Choose files</p>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
        data-testid={`${dataTestId}-input`}
      />

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border"
                  data-testid={`${dataTestId}-file-${index}`}
                >
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0 mr-3">
                    {showPreview && file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file)
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.uploadStatus === 'error' && file.error && (
                      <p className="text-xs text-red-500 mt-1">{file.error}</p>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {file.uploadStatus === 'uploading' && (
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${file.uploadProgress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Icon */}
                  <div className="flex-shrink-0 ml-3">
                    {getStatusIcon(file)}
                  </div>

                  {/* Remove Button */}
                  {file.uploadStatus !== 'uploading' && (
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      data-testid={`${dataTestId}-remove-${index}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Upload Button */}
            {onUpload && files.some(file => file.uploadStatus === 'pending') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex justify-end"
              >
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                    'bg-blue-600 text-white hover:bg-blue-700',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                  data-testid={`${dataTestId}-upload-button`}
                >
                  {uploading ? 'Uploading...' : 'Upload Files'}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;