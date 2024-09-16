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
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  author,
  publishDate,
  tags,
  onImageChange,
  onChange,
  onDeleteClick,
  onCancelClick,
  imageError,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditable(editMode);
  }, [searchParams]);

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form && form.checkValidity()) {
      setIsEditable((prevEditable) => !prevEditable);
    } else {
      form?.reportValidity();
    }
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    router.replace(window.location.pathname);
    if (onCancelClick) {
      onCancelClick();
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
            onChange={onImageChange}
            required
            ref={fileInputRef}
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
              onChange({ target: { name: 'content', value: editorContent } })
            }
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
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
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={tags.join(', ')}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          name="tags"
          disabled={!isEditable}
          required
          placeholder="Enter tags separated by commas"
          className={styles.inputField}
        />
      </div>
    </form>
  );
};

export default BlogDetailsCard;
