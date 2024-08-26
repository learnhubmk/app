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
  slug: string;
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
    slug: 'N/A',
    image: '',
    author: { first_name: 'N/A', last_name: 'N/A' },
    publishDate: 'N/A',
    tags: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`
      );
      const data = await response.json();
      const { title, slug, image, author, publish_date, tags } = data.data || {};
      setBlogDetails({
        title: title || 'N/A',
        slug: slug || 'N/A',
        image: image || '',
        author: author || { first_name: 'N/A', last_name: 'N/A' },
        publishDate: publish_date || 'N/A',
        tags: tags || [],
      });
    };
    fetchData();
  }, [params.id]);

  const handleEditClick = () => {
    if (isEditable) {
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

  return (
    <div className={styles.blogDetailsPageContainer}>
      <BlogDetailsCard
        title={blogDetails.title}
        imageUrl={selectedImage || blogDetails.image}
        slug={blogDetails.slug}
        author={blogDetails.author}
        publishDate={blogDetails.publishDate}
        tags={blogDetails.tags}
        isEditable={isEditable}
        onEditClick={handleEditClick}
        onImageChange={handleImageChange}
        onChange={handleChange}
        onDeleteClick={() => console.log('Delete button clicked')} // Implement delete logic here
      />
    </div>
  );
};

export default BlogDetailsPage;
