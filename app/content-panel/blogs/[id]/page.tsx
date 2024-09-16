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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => setSelectedImage(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
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

  // Ensure `useIsEditable` is called before any early returns
  useIsEditable(isEditable);

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
        onCancelClick={handleCancelClick}
        onDeleteClick={() => {
          // Future delete logic will go here
        }}
      />
    </div>
  );
};

export default BlogDetailsPage;
