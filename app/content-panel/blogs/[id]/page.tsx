'use client';

import React, { useState, useEffect } from 'react';
import styles from './BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';
import useGetBlogDetails from '../../../../api/queries/blogs/getBlogDetails';

const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogDetailsData, setBlogDetailsData] = useState({
    title: '',
    image: '',
    content: '',
    author: {
      first_name: '',
      last_name: '',
    },
    publishDate: '',
    tags: [] as string[],
  });

  const { data, error, isLoading } = useGetBlogDetails(params.id);

  useEffect(() => {
    if (data?.data) {
      const fetchedBlog = data.data;
      const { title, image, content, author, publish_date: publishDate, tags } = fetchedBlog;

      const [year, month, day] = publishDate.split('-');
      const formattedDate = `${year}-${month}-${day}`;

      setBlogDetailsData({
        title: title || 'N/A',
        image: image || '',
        content: content || 'N/A',
        author: {
          first_name: author?.first_name || 'N/A',
          last_name: author?.last_name || 'N/A',
        },
        publishDate: formattedDate || 'Date not available',
        tags: tags || [],
      });
    }
  }, [data]);

  const handleEditClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      const isFormValid = form.checkValidity();
      if (!isFormValid) {
        form.reportValidity();
        return;
      }
      setIsEditable((prevEditable) => !prevEditable);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (!validImageTypes.includes(file.type)) {
        setSelectedImage(null);
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
      const field = name.replace('author_', '') as 'first_name' | 'last_name';
      setBlogDetailsData((prevData) => ({
        ...prevData,
        author: {
          ...prevData.author,
          [field]: value,
        },
      }));
    } else {
      setBlogDetailsData((prevData) => ({
        ...prevData,
        [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
      }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blog details</div>;
  }

  return (
    <div className={styles.blogDetailsPageContainer}>
      <form>
        <BlogDetailsCard
          title={blogDetailsData.title}
          imageUrl={selectedImage || blogDetailsData.image}
          content={blogDetailsData.content}
          author={blogDetailsData.author}
          publishDate={blogDetailsData.publishDate}
          tags={blogDetailsData.tags}
          isEditable={isEditable}
          onEditClick={handleEditClick}
          onImageChange={handleImageChange}
          onChange={handleChange}
          onDeleteClick={() => {
            // Future delete logic will go here
          }}
        />
      </form>
    </div>
  );
};

export default BlogDetailsPage;
