'use client';

import React, { useState, useEffect } from 'react';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';
import useGetBlogDetails from '../../../../api/queries/blogs/getBlogDetails';

interface Author {
  first_name: string;
  last_name: string;
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
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogDetailsData, setBlogDetailsData] = useState<BlogDetailsData>({
    title: '',
    image: '',
    content: '',
    author: { first_name: '', last_name: '' },
    publishDate: '',
    tags: [],
  });
  const [imageError, setImageError] = useState<string | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  const { data, error, isLoading } = useGetBlogDetails(params.id);

  useEffect(() => {
    if (data?.data) {
      const fetchedBlog = data.data;
      const { title, image, content, author, publish_date: publishDate, tags } = fetchedBlog;

      const formattedDate = publishDate ? publishDate.split('T')[0] : 'N/A';

      setBlogDetailsData({
        title: title || 'N/A',
        image: image || '',
        content: content || 'N/A',
        author: {
          first_name: author?.first_name || 'N/A',
          last_name: author?.last_name || 'N/A',
        },
        publishDate: formattedDate,
        tags: tags || [],
      });
    }
  }, [data]);

  const validateImage = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setImageError('Invalid file type. Please select a JPEG, PNG, or GIF image.');
      setIsImageValid(false);
      return false;
    }

    if (file.size > maxSize) {
      setImageError('File size exceeds 5MB. Please select a smaller image.');
      setIsImageValid(false);
      return false;
    }

    setImageError(null);
    setIsImageValid(true);
    return true;
  };

  const handleImageChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const isValidImage = validateImage(file);

      if (isValidImage) {
        setImageError(null);
        const reader = new FileReader();
        reader.onload = () => setSelectedImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    if ((event as React.ChangeEvent<HTMLInputElement>).target) {
      const { name, value } = (event as React.ChangeEvent<HTMLInputElement>).target;

      if (name.startsWith('author_')) {
        setBlogDetailsData((prevData) => ({
          ...prevData,
          author: {
            ...prevData.author,
            [name.replace('author_', '')]: value,
          },
        }));
      } else {
        setBlogDetailsData((prevData) => ({
          ...prevData,
          [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
        }));
      }
    } else {
      const { name, value } = (event as { target: { name: string; value: string } }).target;
      setBlogDetailsData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };

  const useIsEditable = (value: boolean) => {
    return value;
  };

  useIsEditable(isEditable);

  const useisImageValid = (value: boolean) => {
    return value;
  };

  useisImageValid(isImageValid);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;

  return (
    <div className={styles.blogDetailsPageContainer}>
      <BlogDetailsCard
        title={blogDetailsData.title}
        imageUrl={selectedImage || blogDetailsData.image}
        content={blogDetailsData.content}
        author={blogDetailsData.author}
        publishDate={blogDetailsData.publishDate}
        tags={blogDetailsData.tags}
        onImageChange={handleImageChange}
        onChange={handleChange}
        onDeleteClick={() => {
          // Future delete logic will go here
        }}
        onCancelClick={handleCancelClick}
        imageError={imageError}
      />
    </div>
  );
};

export default BlogDetailsPage;
