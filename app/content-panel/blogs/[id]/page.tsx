'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';
import useGetBlogDetails from '../../../../apis/queries/blogs/getBlogDetails';
import { BlogDetailsData } from '../../../../components/reusable-components/_Types';
import useDeletePost from '../../../../apis/mutations/blogs/useDeletePost';
import TitleContentLayout from '../../../../components/reusable-components/title-content-layout/TitleContentLayout';

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [blogDetailsData, setBlogDetailsData] = useState<BlogDetailsData | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useGetBlogDetails(params.id);
  const { mutateAsync: deleteBlogPost } = useDeletePost();

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

  const handleDeleteClick = async (id: string) => {
    await deleteBlogPost(id);
  };

  const handleValidationError = (validationError: string) => {
    setImageError(validationError);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;
  if (!blogDetailsData) return null;

  return (
    <TitleContentLayout title="Детали за статијата">
      <div className={styles.blogDetailsPageContainer}>
        <BlogDetailsCard
          id={blogDetailsData.id}
          title={blogDetailsData.title}
          imageUrl={blogDetailsData.image}
          content={blogDetailsData.content}
          author={blogDetailsData.author}
          publishDate={blogDetailsData.publishDate}
          tags={blogDetailsData.tags}
          status={blogDetailsData.status}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onValidationError={handleValidationError}
          onDeleteClick={handleDeleteClick}
          onCancelClick={handleCancelClick}
          imageError={imageError}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
    </TitleContentLayout>
  );
};

export default BlogDetailsPage;
