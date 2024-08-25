'use client';

import React, { useState, useEffect } from 'react';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('N/A');
  const [slug, setSlug] = useState('N/A');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState({ first_name: 'N/A', last_name: 'N/A' });
  const [publishDate, setPublishDate] = useState('N/A');
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSlugChange = (newContent: string) => {
    setSlug(newContent);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthor((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishDate(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value.split(',').map((tag) => tag.trim()));
  };

  return (
    <div className={styles.blogDetailsPageContainer}>
      <BlogDetailsCard
        title={title}
        imageUrl={selectedImage || image}
        slug={slug}
        author={author}
        publishDate={publishDate}
        tags={tags}
        isEditable={isEditable}
        onEditClick={handleEditClick}
        onImageChange={handleImageChange}
        onTitleChange={handleTitleChange}
        onSlugChange={handleSlugChange}
        onAuthorChange={handleAuthorChange}
        onDateChange={handleDateChange}
        onTagsChange={handleTagsChange}
        onDeleteClick={() => console.log('Delete button clicked')} // Implement delete logic here
      />
    </div>
  );
};

export default BlogDetailsPage;
