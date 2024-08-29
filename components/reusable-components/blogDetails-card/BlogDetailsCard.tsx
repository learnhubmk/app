/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import Image from 'next/image';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';

interface BlogDetailsCardProps {
  title: string;
  imageUrl: string;
  content: string;
  author: { first_name: string; last_name: string };
  publishDate: string;
  tags: string[];
  onImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
  isEditable?: boolean;
  readOnly: boolean;
}
const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  title,
  imageUrl,
  content,
  author,
  publishDate,
  tags,
  onImageChange,
  onChange,
  onEditClick,
  onCancelClick,
  onDeleteClick,
  isEditable,
  readOnly,
}) => {
  return (
    <div className={styles.blogDetailsCard}>
      <div className={styles.titleInput}>
        <h1>
          <input
            type="text"
            value={title}
            onChange={onChange}
            name="title"
            id="title"
            required
            placeholder="Title is required"
            className={styles.inputField}
            disabled={readOnly}
          />
        </h1>
      </div>

      <div className={styles.imageSection}>
        <label htmlFor="imageUpload">Image:</label>
        <input
          className={styles.inputField}
          id="imageUpload"
          type="file"
          onChange={onImageChange}
          required
          disabled={readOnly}
        />
        {imageUrl && <Image src={imageUrl} alt="Blog" width={500} height={300} />}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="contentEditor">Content:</label>
        <TiptapEditor
          content={content}
          editable={!readOnly}
          onChange={(editorContent) =>
            onChange({ target: { name: 'content', value: editorContent } } as any)
          }
        />
      </div>

      <div className={styles.authorSection}>
        <label htmlFor="authorFirstName">Author First Name:</label>
        <input
          id="authorFirstName"
          type="text"
          value={author.first_name}
          onChange={onChange}
          name="author_first_name"
          className={styles.inputField}
          required
          placeholder="First name is required"
          disabled={readOnly}
        />
        <label htmlFor="authorLastName">Author Last Name:</label>
        <input
          id="authorLastName"
          type="text"
          value={author.last_name}
          onChange={onChange}
          name="author_last_name"
          className={styles.inputField}
          required
          placeholder="Last name is required"
          disabled={readOnly}
        />
      </div>

      <div className={styles.dateSection}>
        <label htmlFor="publishDate">Date:</label>
        <input
          id="publishDate"
          type="date"
          value={publishDate}
          onChange={onChange}
          name="publishDate"
          className={styles.inputField}
          required
          disabled={readOnly}
        />
      </div>

      <div className={styles.tagsSection}>
        <label htmlFor="tagsInput">Tags:</label>
        <input
          id="tagsInput"
          type="text"
          value={tags.join(', ')}
          onChange={onChange}
          name="tags"
          className={styles.inputField}
          required
          placeholder="Tags are required"
          disabled={readOnly}
        />
      </div>

      <div className={styles.actions}>
        {isEditable && !readOnly && (
          <>
            {onEditClick && (
              <button type="button" onClick={onEditClick}>
                Edit
              </button>
            )}
            {onCancelClick && (
              <button type="button" onClick={onCancelClick}>
                Cancel
              </button>
            )}
            {onDeleteClick && (
              <button type="button" onClick={onDeleteClick}>
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsCard;
