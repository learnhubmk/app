'use client';

import React, { useRef, useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, error }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles.imageUpload}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      role="button"
      tabIndex={0}
      aria-label="Upload image"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      {preview ? (
        <div className={styles.previewContainer}>
          <Image
            src={preview}
            alt="Preview"
            className={styles.preview}
            width={300}
            height={200}
            style={{ objectFit: 'contain' }}
          />
          <div className={styles.overlay}>
            <span>Click or drag to change image</span>
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <i className="bi bi-cloud-upload" />
          <span>Click or drag image here</span>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ImageUpload;
