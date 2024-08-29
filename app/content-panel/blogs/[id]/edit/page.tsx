'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../BlogDetailsPage.module.scss';
import BlogDetailsCard from '../../../../../components/reusable-components/blogDetails-card/BlogDetailsCard';

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

const BlogEditPage = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [blogDetails, setBlogDetails] = useState<BlogDetails>({
    title: 'N/A',
    content: 'N/A',
    image: '',
    author: { first_name: 'N/A', last_name: 'N/A' },
    publishDate: 'N/A',
    tags: [],
  });

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load saved details from localStorage if available
    const savedDetails = localStorage.getItem(`blog-details-${params.id}`);
    if (savedDetails) {
      setBlogDetails(JSON.parse(savedDetails));
    } else {
      // Fetch data from API if no saved changes
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const {
            title,
            content,
            image,
            author,
            publish_date: publishDate,
            tags,
          } = data.data || {};

          setBlogDetails({
            title: title || 'N/A',
            content: content || 'N/A',
            image: image || '',
            author: author || { first_name: 'N/A', last_name: 'N/A' },
            publishDate: publishDate || 'N/A',
            tags: tags || [],
          });
        } catch (fetchError) {
          setHasError(true);
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
    }
  }, [params.id]);

  const handleSaveClick = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form && form.checkValidity()) {
      // Save the changes to local storage
      localStorage.setItem(`blog-details-${params.id}`, JSON.stringify(blogDetails));
      //   console.log('blogDetails', blogDetails);
      //   console.log(localStorage.getItem(`blog-details-${params.id}`));

      router.push(`/content-panel/blogs/${params.id}`);
    } else {
      form.reportValidity();
    }
  };

  const handleCancelClick = () => {
    router.push(`/content-panel/blogs/${params.id}`);
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (!validImageTypes.includes(file.type)) {
        setUploadError(
          'Invalid file type. Please upload an image with one of the following formats: JPEG, JPG, PNG, GIF.'
        );
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Use ref to clear the input
        }
        return;
      }

      setUploadError(null);

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
      setBlogDetails((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
    } else {
      setBlogDetails((prev) => ({
        ...prev,
        [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
      }));
    }
  };

  if (hasError) {
    return <div className={styles.error}>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className={styles.blogDetailsPageContainer}>
      <div className={styles.actionButtons}>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
      <form>
        {uploadError && <div className={styles.error}>{uploadError}</div>}
        <BlogDetailsCard
          title={blogDetails.title}
          imageUrl={selectedImage || blogDetails.image}
          content={blogDetails.content}
          author={blogDetails.author}
          publishDate={blogDetails.publishDate}
          tags={blogDetails.tags}
          onImageChange={handleImageChange}
          onChange={handleChange}
          isEditable
          readOnly={false}
        />
      </form>
    </div>
  );
};

export default BlogEditPage;
