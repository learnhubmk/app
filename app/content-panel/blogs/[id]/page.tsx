'use client';

import React, { useState, useEffect } from 'react';
import styles from './BlogDetailsPage.module.scss';
import TiptapEditor from '../../../../components/editor/TiptapEditor';

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('N/A');
  const [slug, setSlug] = useState('N/A');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState({ first_name: 'N/A', last_name: 'N/A' });
  const [publish_date, setPublishDate] = useState('N/A');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`
      );
      const data = await response.json();
      const { title, slug, image, author, publish_date, tags } = data.data || {};
      setTitle(title || 'N/A');
      setSlug(slug || 'N/A');
      setImage(image || '');
      setAuthor(author || { first_name: 'N/A', last_name: 'N/A' });
      setPublishDate(publish_date || 'N/A');
      setTags(tags || []);
    };
    fetchData();
  }, [params.id]);

  const handleEditClick = () => {
    if (isEditable) {
      // Implement save logic here
    }
    setIsEditable(!isEditable);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setter(event.target.value);
  };

  return (
    <div className={styles.blogDetailsPageContainer}>
      <div className={styles.actionButtons}>
        <button onClick={handleEditClick}>{isEditable ? 'Save' : 'Edit'}</button>
        <button>Delete</button>
      </div>

      <div className={styles.titleInput}>
        <h1>
          <input
            type="text"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            disabled={!isEditable}
          />
        </h1>
      </div>
      <div className={styles.imageSection}>
        <label>Image:</label>
        <input type="file" disabled={!isEditable} onChange={handleImageChange} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {!selectedImage && image && <img src={image} alt="Blog" />}
      </div>
      <div className={styles.slugSection}>
        <label>Slug:</label>
        <TiptapEditor
          content={slug}
          editable={isEditable}
          onChange={(newContent) => setSlug(newContent)}
        />
      </div>
      <div className={styles.authorSection}>
        <label>Author First Name:</label>
        <input
          type="text"
          value={author.first_name}
          onChange={(e) => setAuthor({ ...author, first_name: e.target.value })}
          disabled={!isEditable}
          className={styles.authorInput}
        />
        <label>Author Last Name:</label>
        <input
          type="text"
          value={author.last_name}
          onChange={(e) => setAuthor({ ...author, last_name: e.target.value })}
          disabled={!isEditable}
          className={styles.authorInput}
        />
      </div>

      <div className={styles.dateSection}>
        <label>Date:</label>
        <input
          type="date"
          value={publish_date}
          onChange={(e) => handleInputChange(e, setPublishDate)}
          disabled={!isEditable}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.tagsSection}>
        <label>Tags:</label>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={(e) =>
            handleInputChange(e, (value) =>
              setTags(value.split(',').map((tag: string) => tag.trim()))
            )
          }
          disabled={!isEditable}
          className={styles.tagsInput}
        />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
