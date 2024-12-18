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
  const { title, image, content, publishDate, tags, author, excerpt, slug } = blogContent;
  const router = useRouter();
  const { updatePost } = useUpdatePost();

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
          setIsEditing(false);
          onValidationError('');
          setState((prev) => ({ ...prev, hasUnsavedChanges: false }));
          updatePost.mutate({ id: postId, updatedPost: blogContent });
        } else {
          form?.reportValidity();
        }
        break;
      case 'edit':
        if (form?.checkValidity()) {
          setIsEditing(true);
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
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    onChange(event);
    setState((prev) => ({ ...prev, hasUnsavedChanges: true }));
  };

  return (
    <form className={styles.blogDetailsCard} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButton}>
          <button type="button" onClick={() => handleAction('back')} aria-label="Go back">
            <i className="bi bi-arrow-left" aria-hidden="true" />
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
        <label htmlFor="title">
          <h1>
            {isEditing ? (
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                required
                placeholder="Title is required"
                className={styles.inputField}
              />
            ) : (
              title
            )}
          </h1>
        </label>
      </div>
      <div className={styles.excerptSection}>
        <label htmlFor="excerpt">Excerpt:</label>
        <p id="excerpt">{excerpt}</p>
      </div>
      <div className={styles.slugSection}>
        <label htmlFor="slug">Slug:</label>
        <p id="slug">{slug}</p>
      </div>
      <div className={styles.imageSection}>
        <label htmlFor="image">Image:</label>
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
            editable
            onChange={(editorContent: string) =>
              handleInputChange({ target: { name: 'content', value: editorContent } })
            }
          />
        ) : (
          <div id="content">{content}</div>
        )}
      </div>
      <div className={styles.authorSection}>
        <label htmlFor="author">Author:</label>
        <span id="author">{`${author.firstName} ${author.lastName}`}</span>
      </div>
      <div className={styles.dateSection}>
        <label htmlFor="publishDate">Date:</label>
        <span id="publishDate">{publishDate}</span>
      </div>
      <div className={styles.tagsSection}>
        <label htmlFor="tags">Tags:</label>
        <span id="tags">{tags.join(', ')}</span>
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
