/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import DropZone from '../drop-zone/DropZone';
import CancelModal from '../modals/CancelModal';
import { BlogDetailsCardProps, IBlogCardState } from '../_Types';
import useUpdatePost from '../../../apis/mutations/blogs/useUpdatePost';

const BlogCardInitialState: IBlogCardState = {
  showModal: false,
  modalType: 'back',
  hasUnsavedChanges: false,
};

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  postId,
  blogContent,
  actions: { onImageChange, onChange, onDeleteClick, onCancelClick },
  errors: { imageError, onValidationError },
  states: { isEditing, setIsEditing },
}) => {
  const [state, setState] = useState<IBlogCardState>(BlogCardInitialState);
  const { title, image, content, publishDate, tags } = blogContent;
  const router = useRouter();
  const updatePostMutation = useUpdatePost();
  console.log('postId', postId);

  const handleConfirm = () => {
    setState((prev) => ({ ...prev, showModal: false }));
    if (state.modalType === 'back') {
      router.push('/content-panel/blogs');
    } else {
      setIsEditing(false);
      setState((prev) => ({ ...prev, hasUnsavedChanges: false }));
      router.replace(window.location.pathname);
      onCancelClick?.();
    }
  };

  const handleAction = (action: 'back' | 'edit' | 'cancel' | 'save') => {
    const form = document.querySelector('form') as HTMLFormElement;
    switch (action) {
      case 'save':
        if (form?.checkValidity()) {
          setIsEditing(!isEditing);
          onValidationError('');
          setState((prev) => ({ ...prev, hasUnsavedChanges: false }));
          // call the API here.............
          //https://api.learnhub.mk/docs/#content-PUTcontent-blog-posts--id-
          updatePostMutation.mutate({ id: postId, updatedPost: blogContent });
        } else {
          form?.reportValidity();
        }
        break;
      case 'edit':
        if (form?.checkValidity()) {
          setIsEditing(!isEditing);
          onValidationError('');
          setState((prev) => ({ ...prev, hasUnsavedChanges: false }));
        } else {
          form?.reportValidity();
        }
        break;

      case 'back':
        if (state.hasUnsavedChanges) {
          setState((prev) => ({ ...prev, modalType: 'back', showModal: true }));
        } else {
          router.push('/content-panel/blogs');
        }
        break;

      case 'cancel':
        if (state.hasUnsavedChanges) {
          setState((prev) => ({ ...prev, modalType: 'cancel', showModal: true }));
        } else {
          handleConfirm();
        }
        break;

      default:
        console.error('Unknown action:', action);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    onChange(event);
    setState((prev) => ({ ...prev, hasUnsavedChanges: true }));
  };

  const renderInput = (id: string, value: string, disabled: boolean = !isEditing) => (
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
          <button type="button" onClick={() => handleAction('back')} aria-label="Go back">
            <i className="bi bi-arrow-left" />
          </button>
        </div>
        <div className={styles.rightButtons}>
          {isEditing ? (
            <>
              <button type="button" onClick={() => handleAction('save')}>
                Save
              </button>
              <button type="button" onClick={() => handleAction('cancel')}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => handleAction('edit')}>
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
        {isEditing ? (
          <DropZone
            onImageChange={(files) => {
              onImageChange(files);
              if (imageError) onValidationError('');
              setState({
                ...state,
                hasUnsavedChanges: true,
              });
            }}
            onValidationError={onValidationError}
            isRequired={false}
          />
        ) : (
          image && <Image src={image} alt="Blog" width={400} height={300} />
        )}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="content">Content:</label>
        {isEditing ? (
          <TiptapEditor
            content={content}
            editable={isEditing}
            onChange={(editorContent: string) =>
              handleInputChange({ target: { name: 'content', value: editorContent } })
            }
          />
        ) : (
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
        show={state.showModal}
        onHide={() => setState((prev) => ({ ...prev, showModal: false }))}
        onConfirm={handleConfirm}
      />
    </form>
  );
};

export default BlogDetailsCard;
