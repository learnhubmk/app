/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import DropZone from '../drop-zone/DropZone';
import CancelModal from '../modals/CancelModal';
import { BlogDetailsCardProps } from '../_Types';
import { useAppSelector } from '../../../store/_Hooks';

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
  imageError,
  onValidationError,
}) => {
  // Hardcoded author temporarily. This will be replaced with logged-in user in the future.
  // TODO: Replace hardcoded author with the logged-in user's data
  // const hardcodedAuthor = { firstName: 'John', lastName: 'Doe' };
  const editorState = useAppSelector((state) => state.editorState);

  const [isEditable, setIsEditable] = useState<boolean>(editorState.isEditable);
  const [showModal, setShowModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const router = useRouter();

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const isImageRequired = isEditable && !imageUrl;

    if (form?.checkValidity() && !isImageRequired) {
      setIsEditable((prevEditable) => !prevEditable);
      onValidationError('');
      setHasUnsavedChanges(false);
    } else {
      form?.reportValidity();
      if (isImageRequired) onValidationError('Image is required.');
    }
  };

  const handleBackClick = () =>
    hasUnsavedChanges ? setShowModal(true) : router.push('/content-panel/blogs');

  const confirmDiscardChanges = () => {
    setShowModal(false);
    router.push('/content-panel/blogs');
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    setHasUnsavedChanges(false);
    router.replace(window.location.pathname);
    onCancelClick?.();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    onChange(event);
    setHasUnsavedChanges(true);
  };

  const renderInput = (id: string, value: string, disabled: boolean = !isEditable) => (
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={handleInputChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
      disabled={disabled}
      required
      placeholder={`${id.charAt(0).toUpperCase() + id.slice(1)} is required`}
      className={styles.inputField}
    />
  );

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
        <h1>{renderInput('title', title)}</h1>
      </div>

      <div className={styles.imageSection}>
        <label htmlFor="imageUpload">Image:</label>
        {imageError && <p className={styles.errorText}>{imageError}</p>}
        {isEditable ? (
          <DropZone
            onImageChange={(files) => {
              onImageChange(files);
              if (imageError) onValidationError('');
              setHasUnsavedChanges(true);
            }}
            onValidationError={onValidationError}
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
          /* eslint-disable-next-line react/no-danger */
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="author">Author:</label>
        {renderInput('author', 'John Doe', true)}
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
        {renderInput('tags', tags.join(', '))}
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
