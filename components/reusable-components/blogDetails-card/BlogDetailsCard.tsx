/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import DOMPurify from 'dompurify';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface BlogDetailsCardProps {
  title: string;
  imageUrl: string;
  content: string;
  author: { first_name: string; last_name: string };
  publishDate: string;
  tags: string[];
  onImageChange: (files: File[]) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => void;
  onDeleteClick: () => void;
  onCancelClick: () => void;
  imageError: string | null;
}

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  title,
  imageUrl,
  content,
  publishDate,
  tags,
  onImageChange,
  onChange,
  onDeleteClick,
  onCancelClick,
}) => {
  // Hardcoding author temporarily. This will be replaced with logged-in user in the future.
  // TODO: Replace hardcoded author with the logged-in user's data
  const hardcodedAuthor = { first_name: 'John', last_name: 'Doe' };

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ image: string | null }>({
    image: null,
  });

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections: rejectedFiles,
  } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop: (files) => {
      if (files.length > 0) {
        setImageFile(files[0]);
        onImageChange(files);
      }
    },
    onDropRejected: (rejectedFiles) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('File Rejections:', rejectedFiles);
      }
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditable(editMode);
  }, [searchParams]);

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const isImageRequired = isEditable && !imageFile && !imageUrl;

    if (form && form.checkValidity() && !isImageRequired) {
      setIsEditable((prevEditable) => !prevEditable);
      setValidationErrors({ image: null });
    } else {
      form?.reportValidity();
      if (isImageRequired) {
        setValidationErrors({ image: 'Image is required.' });
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    router.replace(window.location.pathname);
    if (onCancelClick) {
      onCancelClick();
    }
  };

  return (
    <form className={styles.blogDetailsCard} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButton}>
          <button
            type="button"
            onClick={() => router.push('/content-panel/blogs')}
            aria-label="Go back"
          >
            <i className="bi bi-arrow-left" />
          </button>
        </div>
        <div className={styles.rightButtons}>
          {isEditable ? (
            <>
              <button type="button" onClick={handleEditClick}>
                Save
              </button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
              <button type="button" onClick={onDeleteClick}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.titleInput}>
        <h1>
          <input
            type="text"
            value={title}
            onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
            name="title"
            id="title"
            disabled={!isEditable}
            required
            placeholder="Title is required"
            className={styles.inputField}
          />
        </h1>
      </div>

      <div className={styles.imageSection}>
        <label htmlFor="imageUpload">Image:</label>
        {validationErrors.image && <p className={styles.errorText}>{validationErrors.image}</p>}
        {isEditable ? (
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} id="imageUpload" />
            <p>Drag 'n' drop some files here, or click to select files</p>
            {acceptedFiles.length > 0 && (
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
            {rejectedFiles.length > 0 && (
              <ul>
                {rejectedFiles.map(({ file, errors }) => (
                  <li key={file.name}>
                    {file.name} - {errors.map((e) => e.message).join(', ')}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          imageUrl && <Image src={imageUrl} alt="Blog" width={400} height={300} />
        )}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="content">Content:</label>
        {isEditable ? (
          <TiptapEditor
            content={content}
            editable={isEditable}
            onChange={(editorContent: string) =>
              onChange({ target: { name: 'content', value: editorContent } })
            }
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
        )}
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="authorFirstName">Author First Name:</label>
        <input
          id="authorFirstName"
          type="text"
          value={hardcodedAuthor.first_name}
          name="author_first_name"
          disabled
          className={styles.inputField}
        />
        <label htmlFor="authorLastName">Author Last Name:</label>
        <input
          id="authorLastName"
          type="text"
          value={hardcodedAuthor.last_name}
          name="author_last_name"
          disabled
          className={styles.inputField}
        />
      </div>

      <div className={styles.dateSection}>
        <label htmlFor="publishDate">Date:</label>
        <input
          id="publishDate"
          type="date"
          value={publishDate}
          disabled
          className={styles.inputField}
          required
        />
      </div>

      <div className={styles.tagsSection}>
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={tags.join(', ')}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          disabled={!isEditable}
          name="tags"
          required
          placeholder="Enter tags separated by commas"
          className={styles.inputField}
        />
      </div>
    </form>
  );
};

export default BlogDetailsCard;
