import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import styles from './DropZone.module.scss';

interface DropZoneProps {
  onImageChange: (files: File[]) => void;
  onValidationError: (error: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageChange, onValidationError }) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const validateImage = useCallback(
    (file: File) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        onValidationError('Invalid file type. Please select a JPEG, PNG, or GIF image.');
        return false;
      }

      if (file.size > maxSize) {
        onValidationError('File size exceeds 5MB. Please select a smaller image.');
        return false;
      }

      return true;
    },
    [onValidationError]
  );

  const onDrop = useCallback(
    (files: File[]) => {
      const validFiles = files.filter(validateImage);
      if (validFiles.length > 0) {
        setAcceptedFiles(validFiles);
        onImageChange(validFiles);
      }
    },
    [validateImage, onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    noClick: false,
    noKeyboard: false,
  });

  const clearFiles = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAcceptedFiles([]);
    onImageChange([]);
  };

  return (
    <div className={styles.dropzone}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className={styles.dropzoneArea} {...getRootProps()}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} style={{ display: 'none' }} />
        {acceptedFiles.length === 0 ? (
          <p>Drag and drop an image here, or click to select one</p>
        ) : (
          <div className={styles.files}>
            <ul>
              {acceptedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
            <Image
              src={URL.createObjectURL(acceptedFiles[0])}
              alt="Preview"
              width={500}
              height={300}
              style={{ borderRadius: '8px', marginTop: '10px' }}
            />
            <button type="button" onClick={clearFiles}>
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
