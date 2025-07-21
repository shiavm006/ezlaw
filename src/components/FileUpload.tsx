"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./FileUpload.module.css";

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  uploadProgress?: number;
  uploadStatus?: 'pending' | 'uploading' | 'success' | 'error';
}

interface FileUploadProps {
  onFilesChange: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

export default function FileUpload({ 
  onFilesChange, 
  maxFiles = 10, 
  maxFileSize = 50, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt']
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return { valid: false, error: `File size must be less than ${maxFileSize}MB` };
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return { valid: false, error: `File type ${fileExtension} is not supported` };
    }

    // Check if we've reached max files
    if (files.length >= maxFiles) {
      return { valid: false, error: `Maximum ${maxFiles} files allowed` };
    }

    return { valid: true };
  };

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        // For non-image files, create a generic preview
        resolve('');
      }
    });
  };

  const processFiles = async (fileList: FileList) => {
    const newFiles: FileWithPreview[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validation = validateFile(file);
      
      if (!validation.valid) {
        alert(validation.error);
        continue;
      }

      const fileWithPreview: FileWithPreview = {
        ...file,
        id: generateFileId(),
        preview: await createFilePreview(file),
        uploadProgress: 0,
        uploadStatus: 'pending'
      };

      newFiles.push(fileWithPreview);
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);

    // Simulate upload process
    if (newFiles.length > 0) {
      setUploading(true);
      await simulateUpload(newFiles);
      setUploading(false);
    }
  };

  const simulateUpload = async (filesToUpload: FileWithPreview[]) => {
    for (const file of filesToUpload) {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, uploadProgress: progress, uploadStatus: progress === 100 ? 'success' : 'uploading' }
            : f
        ));
      }
    }
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      processFiles(fileList);
    }
  }, [files]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const fileList = event.dataTransfer.files;
    if (fileList) {
      processFiles(fileList);
    }
  }, [files]);

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'txt': return '📃';
      default: return '📎';
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <div 
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className={styles.hiddenInput}
          aria-label="Upload files"
          title="Upload files"
        />
        
        <div className={styles.dropZoneContent}>
          <div className={styles.uploadIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          
          <h3 className={styles.uploadTitle}>
            {isDragOver ? 'Drop files here' : 'Upload Evidence & Documents'}
          </h3>
          
          <p className={styles.uploadDescription}>
            Drag and drop files here, or{' '}
            <button 
              type="button" 
              className={styles.browseButton}
              onClick={() => fileInputRef.current?.click()}
            >
              browse files
            </button>
          </p>
          
          <div className={styles.fileTypes}>
            <span>Accepted formats: {acceptedTypes.join(', ')}</span>
            <span>Max file size: {maxFileSize}MB</span>
            <span>Max files: {maxFiles}</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          <h4 className={styles.fileListTitle}>
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          
          {files.map((file) => (
            <div key={file.id} className={styles.fileItem}>
              <div className={styles.fileInfo}>
                <div className={styles.fileIcon}>
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className={styles.filePreview} />
                  ) : (
                    <span className={styles.fileTypeIcon}>{getFileIcon(file.name)}</span>
                  )}
                </div>
                
                <div className={styles.fileDetails}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileMeta}>
                    {formatFileSize(file.size)} • {file.uploadStatus}
                  </div>
                </div>
                
                <div className={styles.fileActions}>
                  {file.uploadStatus === 'uploading' && (
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${file.uploadProgress}%` }}
                      />
                    </div>
                  )}
                  
                  {file.uploadStatus === 'success' && (
                    <div className={styles.successIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeFile(file.id)}
                    disabled={file.uploadStatus === 'uploading'}
                    aria-label={`Remove ${file.name}`}
                    title={`Remove ${file.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className={styles.uploadStatus}>
          <div className={styles.spinner} />
          <span>Uploading files...</span>
        </div>
      )}
    </div>
  );
} 