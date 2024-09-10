/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
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
  const router = useRouter();

  const textToBoolean = (text: string) => text?.toLowerCase() === 'true';

  const searchParams = useSearchParams();

  const isEditable = textToBoolean(searchParams.get('edit') as string);

  const handleCancelClick = () => {
    router.push('/content-panel/blogs');
    if (onCancelClick) {
      onCancelClick();
    }
  };

  return (
    <div className={styles.blogDetailsCard}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButton}>
          <button type="button" onClick={handleCancelClick} aria-label="Go back">
            <i className="bi bi-arrow-left" />
          </button>
        </div>
        <div className={styles.rightButtons}>
          <button
            type="button"
            onClick={onEditClick}
            aria-label={isEditable ? 'Save changes' : 'Edit blog'}
          >
            {isEditable ? 'Save' : 'Edit'}
          </button>
          <button type="button" onClick={onDeleteClick} aria-label="Delete blog">
            Delete
          </button>
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
        {isEditable ? (
          <input
            className={styles.inputField}
            id="imageUpload"
            type="file"
            onChange={onImageChange}
            required
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
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          name="publishDate"
          disabled={!isEditable}
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
    </div>
  );
};

export default BlogDetailsCard;
