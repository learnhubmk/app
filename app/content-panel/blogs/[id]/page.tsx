'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';
import useGetBlogDetails from '../../../../api/queries/blogs/getBlogDetails';

interface Author {
  firstName: string;
  lastName: string;
}

interface BlogDetailsData {
  title: string;
  image: string;
  content: string;
  author: Author;
  publishDate: string;
  tags: string[];
}

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [blogDetailsData, setBlogDetailsData] = useState<BlogDetailsData>({
    title: '',
    image: '',
    content: '',
    author: { firstName: '', lastName: '' },
    publishDate: '',
    tags: [],
  });
  const [originalBlogData, setOriginalBlogData] = useState<BlogDetailsData | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useGetBlogDetails(params.id);

  useEffect(() => {
    if (data?.data) {
      const fetchedBlog = data.data;
      const { title, image, content, author, publish_date: publishDate, tags } = fetchedBlog;

      const formattedDate = publishDate ? publishDate.split('T')[0] : 'N/A';

      const formattedBlogData = {
        title: title || 'N/A',
        image: image || '',
        content: content || 'N/A',
        author: {
          firstName: author?.firstName || 'N/A',
          lastName: author?.lastName || 'N/A',
        },
        publishDate: formattedDate,
        tags: tags || [],
      };

      setBlogDetailsData(formattedBlogData);
      setOriginalBlogData(formattedBlogData);
    }
  }, [data]);

  const handleImageChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBlogDetailsData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setBlogDetailsData((prevData) => ({
      ...prevData,
      [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
    }));
  };

  const handleCancelClick = () => {
    if (originalBlogData) {
      setBlogDetailsData(originalBlogData);
      setImageError(null);
      setIsEditing(false);
      router.replace(`/blogs/${params.id}`);
    }
  };

  const handleValidationError = (validationError: string) => {
    setImageError(validationError);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;

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
