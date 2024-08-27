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
  isEditable: boolean;
  onEditClick: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: () => void;
}

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  title,
  imageUrl,
  content,
  author,
  publishDate,
  tags,
  isEditable,
  onEditClick,
  onImageChange,
  onChange,
  onDeleteClick,
}) => {
  return (
    <div className={styles.blogDetailsCard}>
      <div className={styles.actionButtons}>
        <button type="button" onClick={onEditClick}>
          {isEditable ? 'Save' : 'Edit'}
        </button>
        <button type="button" onClick={onDeleteClick}>
          Delete
        </button>
      </div>

      <div className={styles.titleInput}>
        <h1>
          <input
            type="text"
            value={title}
            onChange={onChange}
            name="title"
            id="title" // Add ID here
            disabled={!isEditable}
          />
        </h1>
      </div>

      <div className={styles.imageSection}>
        <label htmlFor="imageUpload">Image:</label>
        <input id="imageUpload" type="file" disabled={!isEditable} onChange={onImageChange} />
        {imageUrl && <Image src={imageUrl} alt="Blog" width={500} height={300} />}
      </div>

      <div className={styles.contentSection}>
        <label htmlFor="contentEditor">Content:</label>
        <TiptapEditor
          content={content}
          editable={isEditable}
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
          disabled={!isEditable}
        />
        <label htmlFor="authorLastName">Author Last Name:</label>
        <input
          id="authorLastName"
          type="text"
          value={author.last_name}
          onChange={onChange}
          name="author_last_name"
          disabled={!isEditable}
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
          disabled={!isEditable}
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
          disabled={!isEditable}
        />
      </div>
    </div>
  );
};

export default BlogDetailsCard;
