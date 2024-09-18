/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState, useRef, useMemo } from 'react';
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
  author: propAuthor,
  publishDate,
  tags,
  onImageChange,
  onChange,
  onDeleteClick,
  onCancelClick,
  imageError,
}) => {
  // TODO: The Author should be a dropdown where all the content managers would be listed and we can select one.
  // There are 3 types of users which are: users, admins, and content managers, so according to role filter them and take only users that are content managers

  const hardcodedAuthors = useMemo(
    () => [
      { id: '1', first_name: 'John', last_name: 'Doe' },
      { id: '2', first_name: 'Jane', last_name: 'Smith' },
      { id: '3', first_name: 'Emily', last_name: 'Johnson' },
    ],
    []
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('');

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditable(editMode);
  }, [searchParams]);

  useEffect(() => {
    const authorMatch = hardcodedAuthors.find(
      (a) => a.first_name === propAuthor.first_name && a.last_name === propAuthor.last_name
    );
    if (authorMatch) {
      setSelectedAuthorId(authorMatch.id);
    }
  }, [propAuthor, hardcodedAuthors]);

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

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthor = hardcodedAuthors.find((a) => a.id === event.target.value);
    if (selectedAuthor) {
      onChange({
        target: {
          name: 'author',
          value: `${selectedAuthor.first_name} ${selectedAuthor.last_name}`,
        },
      });
      setSelectedAuthorId(selectedAuthor.id);
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
        <label htmlFor="authorSelect">Select Author:</label>
        <select
          id="authorSelect"
          value={selectedAuthorId}
          onChange={handleAuthorChange}
          disabled={!isEditable}
          className={styles.inputField}
        >
          <option value="" disabled>
            Select an author
          </option>
          {hardcodedAuthors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </select>

        <label htmlFor="authorFirstName">Author First Name:</label>
        <input
          id="authorFirstName"
          type="text"
          value={propAuthor.first_name}
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
          value={propAuthor.last_name}
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
