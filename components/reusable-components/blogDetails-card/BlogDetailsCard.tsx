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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  onChange,
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
          <input
            type="text"
            value={title}
            onChange={onChange}
            name="title"
            disabled={!isEditable}
          />
        </h1>
      </div>

      <div className={styles.imageSection}>
        <label>Image:</label>
        <input type="file" disabled={!isEditable} onChange={onImageChange} />
        {imageUrl && <img src={imageUrl} alt="Blog" />}
      </div>

      <div className={styles.slugSection}>
        <label>Slug:</label>
        <TiptapEditor
          content={slug}
          editable={isEditable}
          onChange={(content) => onChange({ target: { name: 'slug', value: content } } as any)}
        />
      </div>

      <div className={styles.authorSection}>
        <label>Author:</label>
        <input
          type="text"
          value={author.first_name}
          onChange={onChange}
          name="author_first_name" // Match with handleChange
          disabled={!isEditable}
        />
        <input
          type="text"
          value={author.last_name}
          onChange={onChange}
          name="author_last_name" // Match with handleChange
          disabled={!isEditable}
        />
      </div>

      <div className={styles.dateSection}>
        <label>Date:</label>
        <input
          type="date"
          value={publishDate}
          onChange={onChange}
          name="publishDate"
          disabled={!isEditable}
        />
      </div>

      <div className={styles.tagsSection}>
        <label>Tags:</label>
        <input
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
