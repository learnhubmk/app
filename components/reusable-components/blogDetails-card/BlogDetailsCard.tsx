/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import CancelModal from '../modals/CancelModal';
import { BlogDetailsCardProps, Tag } from '../_Types';
import { useEditor } from '../../../app/context/EditorContext';
import StatusManager from '../../module-components/blog/StatusManager';
import { UserRole } from '../../../Types';
import capitalizeAndFormatString from '../../../api/utils/blogStatusUtils';
import ReusableModal from '../reusable-modal/ReusableModal';
import TagManager, { TagManagerRef } from '../../module-components/blog/TagManager';
import useEditBlogPost from '../../../apis/mutations/blogs/useEditBlogPost';

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  id,
  title,
  content,
  author,
  publishDate,
  tags,
  status,
  onChange,
  onDeleteClick,
  onCancelClick,
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === UserRole.admin;
  const { editorState, editorStateChange } = useEditor();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(editorState.isEditable);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'back' | 'cancel'>('back');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { mutate: submitEditPostChanges } = useEditBlogPost(() => {
    setIsEditable(false);
    editorStateChange({ isEditable: false });
    setHasUnsavedChanges(false);
  });

  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Title is required'),
    content: Yup.string()
      .trim()
      .required('Content is required')
      .test('not-empty', 'Content cannot be empty', (value) => value !== '<p></p>'),
    tags: Yup.array()
      .required('Таговите се задолжителни.')
      .min(1, 'Мора да селектираш барем еден таг.'),
    status: Yup.string().required('Status is required'),
  });

  useEffect(() => {
    setIsEditable(editorState.isEditable);
  }, [editorState.isEditable]);

  useEffect(() => {
    setSelectedTags(tags);
  }, [tags]);

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
      setIsEditable(false);
      setHasUnsavedChanges(false);
      editorStateChange({ isEditable: false });
      onCancelClick?.();
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditable(true);
    editorStateChange({ isEditable: true });
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleDeleteClose = () => {
    setIsOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsOpen(false);
    if (onDeleteClick) {
      onDeleteClick(id);
    }
    router.push('/content-panel/blogs');
  };

  const tagManagerRef = useRef<TagManagerRef>(null);

  const handleSubmit = (values: any) => {
    setHasUnsavedChanges(false); // Reset immediately since we're about to save
    submitEditPostChanges({ id, ...values });
    tagManagerRef.current?.clearInput();

    onChange({
      target: {
        name: 'formData',
        value: values,
      },
    });
  };

  const blogAuthor = `${author.first_name} ${author.last_name}`;
  const tagsIdList = tags.map((tag) => tag.id);

  return (
    <Formik
      initialValues={{
        title,
        content,
        tags: tagsIdList,
        status,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form
          className={styles.blogDetailsCard}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
              e.preventDefault();
            }
          }}
        >
          <div className={styles.actionButtons}>
            <div className={styles.leftButton}>
              <button type="button" onClick={handleBackClick} aria-label="Назад">
                <i className="bi bi-arrow-left" />
              </button>
            </div>
            <div className={styles.rightButtons}>
              {isEditable ? (
                <>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={handleEditClick}>
                    Edit
                  </button>
                  <button type="button" onClick={handleDeleteClick}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.titleInput}>
            <label htmlFor="title">Title:</label>
            <Field
              id="title"
              name="title"
              disabled={!isEditable}
              className={styles.inputField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('title', e.target.value);
                setHasUnsavedChanges(true);
              }}
            />
            {touched.title && errors.title && (
              <div className={styles.errorText}>{errors.title}</div>
            )}
          </div>

          <div className={styles.contentSection}>
            <label htmlFor="content">Content:</label>
            <TiptapEditor
              id="content"
              content={values.content}
              editable={isEditable}
              onChange={(newContent) => {
                setFieldValue('content', newContent);
                setHasUnsavedChanges(true);
              }}
            />
            {touched.content && errors.content && (
              <div className={styles.errorText}>{errors.content}</div>
            )}
          </div>

          <div className={styles.authorSection}>
            <label htmlFor="author">Author:</label>
            <input
              id="author"
              type="text"
              value={blogAuthor}
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
            />
          </div>

          <div className={styles.tagsSection}>
            <label htmlFor="tags">Tags:</label>
            <div id="tags">
              <TagManager
                ref={tagManagerRef}
                selectedTags={selectedTags}
                isAdmin={isAdmin}
                isEditMode={isEditable}
                onTagsChange={(newTags) => {
                  setSelectedTags(newTags);
                  setFieldValue(
                    'tags',
                    newTags.map((tag) => tag.id)
                  );
                  setHasUnsavedChanges(true);
                }}
              />
            </div>
            {touched.tags && errors.tags && <div className={styles.errorText}>{errors.tags}</div>}
          </div>

          <div className={styles.contentSection}>
            <label htmlFor="status">Status:</label>
            {isEditable ? (
              <Field
                id="status"
                name="status"
                component={StatusManager}
                currentStatus={values.status}
                handleStatusChange={(newStatus: string) => {
                  setFieldValue('status', newStatus);
                  setHasUnsavedChanges(true);
                }}
              />
            ) : (
              <span id="status" className={styles.statusField}>
                {capitalizeAndFormatString(values.status)}
              </span>
            )}
            {touched.status && errors.status && (
              <div className={styles.errorText}>{errors.status}</div>
            )}
          </div>

          <CancelModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleConfirm}
          />

          <ReusableModal
            title="Are you sure you want to proceed?"
            isOpen={isOpen}
            onClose={handleDeleteClose}
            primaryButtonLabel="Delete"
            secondaryButtonLabel="Cancel"
            onPrimaryButtonClick={handleDeleteConfirm}
            onSecondaryButtonClick={handleDeleteClose}
          />
        </Form>
      )}
    </Formik>
  );
};

export default BlogDetailsCard;
