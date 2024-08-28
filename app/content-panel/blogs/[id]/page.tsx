'use client';

import React, { useState, useEffect } from 'react';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';

interface Author {
  first_name: string;
  last_name: string;
}

interface BlogDetails {
  title: string;
  content: string;
  image: string;
  author: Author;
  publishDate: string;
  tags: string[];
}

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogDetails, setBlogDetails] = useState<BlogDetails>({
    title: 'N/A',
    content: 'N/A',
    image: '',
    author: { first_name: 'N/A', last_name: 'N/A' },
    publishDate: 'N/A',
    tags: [],
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { title, content, image, author, publish_date: publishDate, tags } = data.data || {};

        setBlogDetails({
          title: title || 'N/A',
          content: content || 'N/A',
          image: image || '',
          author: author || { first_name: 'N/A', last_name: 'N/A' },
          publishDate: publishDate || 'N/A',
          tags: tags || [],
        });
      } catch (error) {
        setError(true);
        setBlogDetails({
          title: 'Error fetching data',
          content: '',
          image: '',
          author: { first_name: 'N/A', last_name: 'N/A' },
          publishDate: 'N/A',
          tags: [],
        });
      }
    };

    fetchData();
  }, [params.id]);

  const handleEditClick = () => {
    if (isEditable) {
      // Future logic will go here
    }
    setIsEditable(!isEditable);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (!validImageTypes.includes(file.type)) {
        alert('Please upload a valid image file (jpg, jpeg, png, gif).');
        setSelectedImage(null);
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name.startsWith('author_')) {
      // Handle nested author fields
      const field = name.replace('author_', '') as 'first_name' | 'last_name';
      setBlogDetails((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
    } else {
      // Handle non-nested fields
      setBlogDetails((prev) => ({
        ...prev,
        [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
      }));
    }
  };

  if (error) {
    return <div className={styles.error}>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className={styles.blogDetailsPageContainer}>
      <BlogDetailsCard
        title={blogDetails.title}
        imageUrl={selectedImage || blogDetails.image}
        content={blogDetails.content}
        author={blogDetails.author}
        publishDate={blogDetails.publishDate}
        tags={blogDetails.tags}
        isEditable={isEditable}
        onEditClick={handleEditClick}
        onImageChange={handleImageChange}
        onChange={handleChange}
        onDeleteClick={() => {
          // Future delete logic will go here
        }}
      />
    </div>
  );
};

export default BlogDetailsPage;
