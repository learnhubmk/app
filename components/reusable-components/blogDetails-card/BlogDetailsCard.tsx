/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DropZone from '../drop-zone/DropZone';
import CancelModal from '../modals/CancelModal';

interface BlogDetailsCardProps {
  title: string;
  imageUrl: string;
  content: string;
  author: { firstName: string; lastName: string };
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
  // Hardcoded author temporarily. This will be replaced with logged-in user in the future.
  // TODO: Replace hardcoded author with the logged-in user's data
  const hardcodedAuthor = { firstName: 'John', lastName: 'Doe' };

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<{ image: string | null }>({
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditable(editMode);
  }, [searchParams]);

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const isImageRequired = isEditable && !imageUrl;

    if (form && form.checkValidity() && !isImageRequired) {
      setIsEditable((prevEditable) => !prevEditable);
      setValidationErrors({ image: null });
      setHasUnsavedChanges(false);
    } else {
      form?.reportValidity();
      if (isImageRequired) {
        setValidationErrors({ image: 'Image is required.' });
      }
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setShowModal(true);
    } else {
      router.push('/content-panel/blogs');
    }
  };

  const confirmDiscardChanges = () => {
    setShowModal(false);
    router.push('/content-panel/blogs');
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    setHasUnsavedChanges(false);
    router.replace(window.location.pathname);
    if (onCancelClick) {
      onCancelClick();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    onChange(event);
    setHasUnsavedChanges(true);
  };

  return (
    <form className={styles.blogDetailsCard} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButton}>
          <button type="button" onClick={handleBackClick} aria-label="Go back">
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
            onChange={handleInputChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
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
          <DropZone
            onImageChange={(files) => {
              onImageChange(files);
              if (validationErrors.image) {
                setValidationErrors({ image: null });
              }
              setHasUnsavedChanges(true);
            }}
          />
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
              handleInputChange({ target: { name: 'content', value: editorContent } })
            }
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
        )}
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={`${hardcodedAuthor.firstName} ${hardcodedAuthor.lastName}`}
          name="author"
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
          onChange={handleInputChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          disabled={!isEditable}
          name="tags"
          required
          placeholder="Enter tags separated by commas"
          className={styles.inputField}
        />
      </div>

      <CancelModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDiscardChanges}
      />
    </form>
  );
};

export default BlogDetailsCard;
