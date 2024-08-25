import React from 'react';
import styles from '../../../app/content-panel/blogs/[id]/BlogDetailsPage.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';

interface BlogDetailsCardProps {
  title: string;
  imageUrl: string;
  slug: string;
  author: { first_name: string; last_name: string };
  publishDate: string;
  tags: string[];
  isEditable: boolean;
  onEditClick: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (newContent: string) => void;
  onAuthorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTagsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: () => void;
}

const BlogDetailsCard: React.FC<BlogDetailsCardProps> = ({
  title,
  imageUrl,
  slug,
  author,
  publishDate,
  tags,
  isEditable,
  onEditClick,
  onImageChange,
  onTitleChange,
  onSlugChange,
  onAuthorChange,
  onDateChange,
  onTagsChange,
  onDeleteClick,
}) => {
  return (
    <div className={styles.blogDetailsCard}>
      <div className={styles.actionButtons}>
        <button onClick={onEditClick}>{isEditable ? 'Save' : 'Edit'}</button>
        <button onClick={onDeleteClick}>Delete</button>
      </div>

      <div className={styles.titleInput}>
        <h1>
          <input type="text" value={title} onChange={onTitleChange} disabled={!isEditable} />
        </h1>
      </div>

      <div className={styles.imageSection}>
        <label>Image:</label>
        <input type="file" disabled={!isEditable} onChange={onImageChange} />
        {imageUrl && <img src={imageUrl} alt="Blog" />}
      </div>

      <div className={styles.slugSection}>
        <label>Slug:</label>
        <TiptapEditor content={slug} editable={isEditable} onChange={onSlugChange} />
      </div>

      <div className={styles.authorSection}>
        <label>Author:</label>
        <input
          type="text"
          value={author.first_name}
          onChange={(e) =>
            onAuthorChange({
              ...e,
              target: { ...e.target, value: e.target.value, name: 'first_name' },
            })
          }
          disabled={!isEditable}
        />
        <input
          type="text"
          value={author.last_name}
          onChange={(e) =>
            onAuthorChange({
              ...e,
              target: { ...e.target, value: e.target.value, name: 'last_name' },
            })
          }
          disabled={!isEditable}
        />
      </div>

      <div className={styles.dateSection}>
        <label>Date:</label>
        <input type="date" value={publishDate} onChange={onDateChange} disabled={!isEditable} />
      </div>

      <div className={styles.tagsSection}>
        <label>Tags:</label>
        <input type="text" value={tags.join(', ')} onChange={onTagsChange} disabled={!isEditable} />
      </div>
    </div>
  );
};

export default BlogDetailsCard;
