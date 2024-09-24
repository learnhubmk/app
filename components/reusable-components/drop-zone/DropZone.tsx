import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './DropZone.module.scss';

interface DropZoneProps {
  onImageChange: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024,
    onDrop: (files) => {
      setAcceptedFiles(files);
      onImageChange(files);
      setErrorMessage(null);
    },
    onDropRejected: () => {
      setErrorMessage('File rejected. Ensure the file is an image and under 5MB.');
    },
  });

  const clearFiles = () => {
    setAcceptedFiles([]);
    onImageChange([]);
    setErrorMessage(null);
  };

  return (
    <div className={styles.dropzone}>
      <div {...getRootProps()} className={styles.dropzoneArea}>
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select one</p>
      </div>
      {acceptedFiles.length > 0 && (
        <div className={styles.files}>
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
          <img
            src={URL.createObjectURL(acceptedFiles[0])}
            alt="Preview"
            style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
          <button type="button" onClick={clearFiles}>
            Clear
          </button>
        </div>
      )}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
};

export default DropZone;
