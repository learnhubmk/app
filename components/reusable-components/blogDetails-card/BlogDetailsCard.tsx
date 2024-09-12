/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
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
  onEditClick: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => void;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  title,
  imageUrl,
  content,
  author,
  publishDate,
  tags,
  onEditClick,
  onImageChange,
  onChange,
  onDeleteClick,
  onCancelClick,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditable(editMode);
  }, [searchParams]);

  const handleEditClick = () => {
    const newEditMode = !isEditable;
    setIsEditable(newEditMode);
    router.replace(`${window.location.pathname}?edit=${newEditMode}`);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    router.replace(window.location.pathname);
    if (onCancelClick) {
      onCancelClick();
    }
  };

  const validateImage = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setImageError('Invalid file type. Please select a JPEG, PNG, or GIF image.');
      setIsImageValid(false);
      return false;
    }

    if (file.size > maxSize) {
      setImageError('File size exceeds 5MB. Please select a smaller image.');
      setIsImageValid(false);
      return false;
    }

    setImageError(null);
    setIsImageValid(true);
    return true;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValidImage = validateImage(file);

      if (isValidImage) {
        setImageError(null);
        onImageChange(event);
      } else if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
              <button type="button" onClick={handleEditClick} disabled={!isImageValid}>
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
        {imageError && <p className={styles.errorText}>{imageError}</p>}
        {isEditable ? (
          <input
            className={styles.inputField}
            id="imageUpload"
            type="file"
            onChange={handleImageChange}
            required
            ref={fileInputRef}
          />
        ) : (
          imageUrl && <Image src={imageUrl} alt="Blog" width={500} height={300} />
        )}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="contentEditor">Content:</label>
        <TiptapEditor
          content={content}
          editable={isEditable}
          onChange={(editorContent: string) =>
            onChange({ target: { name: 'content', value: editorContent } })
          }
        />
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="authorFirstName">Author First Name:</label>
        <input
          id="authorFirstName"
          type="text"
          value={author.first_name}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          name="author_first_name"
          disabled={!isEditable}
          className={styles.inputField}
          required
          placeholder="First name is required"
        />
        <label htmlFor="authorLastName">Author Last Name:</label>
        <input
          id="authorLastName"
          type="text"
          value={author.last_name}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          name="author_last_name"
          disabled={!isEditable}
          className={styles.inputField}
          required
          placeholder="Last name is required"
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
        <label htmlFor="tagsInput">Tags:</label>
        <input
          id="tagsInput"
          type="text"
          value={tags.join(', ')}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          name="tags"
          disabled={!isEditable}
          className={styles.inputField}
          required
          placeholder="Tags are required"
        />
      </div>
    </form>
  );
};

export default BlogDetailsCard;
