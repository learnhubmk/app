/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import DropZone from '../drop-zone/DropZone';
import CancelModal from '../modals/CancelModal';
import { BlogDetailsCardProps } from '../_Types';
import { useEditor } from '../../../app/context/EditorContext';
import useUpdatePostStatus from '../../../apis/mutations/blogs/updatePostStatus';
import StatusManager from '../../module-components/blog/StatusManager';
import capitalizeAndFormatString from '../../../api/utils/blogStatusUtils';

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  id,
  title,
  imageUrl,
  content,
  author,
  publishDate,
  tags,
  status,
  onImageChange,
  onChange,
  onDeleteClick,
  onCancelClick,
  imageError,
  onValidationError,
}) => {
  const { editorState, editorStateChange } = useEditor();
  const [isEditable, setIsEditable] = useState<boolean>(editorState.isEditable);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'back' | 'cancel'>('back');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [blogStatus, setBlogStatus] = useState(status);

  const initialStatus = useRef(status);

  const router = useRouter();
  const { mutate: updateStatus } = useUpdatePostStatus();

  useEffect(() => {
    setIsEditable(editorState.isEditable);
  }, [editorState.isEditable]);

  const handleConfirm = () => {
    setShowModal(false);
    if (modalType === 'back') {
      router.push('/content-panel/blogs');
    } else {
      setIsEditable(false);
      setHasUnsavedChanges(false);
      editorStateChange({ isEditable: false });
      router.replace(window.location.pathname);
      onCancelClick?.();
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setModalType('back');
      setShowModal(true);
    } else {
      router.push('/content-panel/blogs');
    }
  };

  const handleCancelClick = () => {
    if (hasUnsavedChanges) {
      setModalType('cancel');
      setShowModal(true);
    } else {
      handleConfirm();
    }
  };

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;

    if (form?.checkValidity()) {
      const newEditableState = !isEditable;
      setIsEditable(newEditableState);
      editorStateChange({ isEditable: newEditableState });
      onValidationError('');
      setHasUnsavedChanges(false);

      if (newEditableState) {
        // eslint-disable-next-line no-unused-expressions
        initialStatus.current === blogStatus;
      } else if (!newEditableState && blogStatus !== initialStatus.current) {
        updateStatus({ id, status: blogStatus });
      }
    } else {
      form?.reportValidity();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    onChange(event);
    setHasUnsavedChanges(true);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBlogStatus(event.target.value);
    setHasUnsavedChanges(true);
  };

  const renderInput = (inputId: string, value: string, disabled: boolean = !isEditable) => (
    <input
      type="text"
      id={inputId}
      name={id}
      value={value}
      onChange={handleInputChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
      disabled={disabled}
      required
      placeholder={`${String(inputId).charAt(0).toUpperCase() + String(inputId).slice(1)} is required`}
      className={styles.inputField}
    />
  );

  const blogAuthor = `${author.first_name} ${author.last_name}`;
  const tagNames = tags.map((tag) => tag.name);

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
            isRequired={false}
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
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="author">Author:</label>
        {renderInput('author', blogAuthor, true)}
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
        {renderInput('tags', tagNames.join(', '))}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="status">Статус</label>
        {isEditable ? (
          <StatusManager currentStatus={blogStatus} handleStatusChange={handleStatusChange} />
        ) : (
          <span className={styles.statusField}>{capitalizeAndFormatString(blogStatus)}</span>
        )}
      </div>
      <CancelModal show={showModal} onHide={() => setShowModal(false)} onConfirm={handleConfirm} />
    </form>
  );
};

export default BlogDetailsCard;
