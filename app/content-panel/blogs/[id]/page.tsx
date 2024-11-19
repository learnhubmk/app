'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';
import useGetBlogDetails from '../../../../apis/queries/blogs/getBlogDetails';
import { BlogDetailsData } from '../../../../components/reusable-components/_Types';

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [blogDetailsData, setBlogDetailsData] = useState<BlogDetailsData | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useGetBlogDetails(params.id);

  useEffect(() => {
    if (data) {
      setBlogDetailsData(data);
    }
  }, [data]);

  const handleImageChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBlogDetailsData((prev) => (prev ? { ...prev, image: reader.result as string } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setBlogDetailsData((prevData) =>
      prevData
        ? {
            ...prevData,
            [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
          }
        : null
    );
  };

  const handleCancelClick = () => {
    if (data) {
      setBlogDetailsData(data);
      setImageError(null);
      setIsEditing(false);
      router.replace(window.location.pathname);
    }
  };

  const handleValidationError = (validationError: string) => {
    setImageError(validationError);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;
  if (!blogDetailsData) return null;

  return (
    <div className={styles.blogDetailsPageContainer}>
      <BlogDetailsCard
        title={blogDetailsData.title}
        imageUrl={blogDetailsData.image}
        content={blogDetailsData.content}
        publishDate={blogDetailsData.publishDate}
        tags={blogDetailsData.tags}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onValidationError={handleValidationError}
        onDeleteClick={() => {
          // Future delete logic will go here
        }}
        onCancelClick={handleCancelClick}
        imageError={imageError}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default BlogDetailsPage;
