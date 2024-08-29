'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const [blogDetails, setBlogDetails] = useState<BlogDetails>({
    title: 'N/A',
    content: 'N/A',
    image: '',
    author: { first_name: 'N/A', last_name: 'N/A' },
    publishDate: 'N/A',
    tags: [],
  });
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

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
  }, [params.id]);

  const handleDeleteClick = () => {
    // Implement the delete logic here
  };

  const handleViewBlogListClick = () => {
    router.push('/content-panel/blogs/');
  };

  const noop = () => {};

  if (hasError) {
    return <div className={styles.error}>Something went wrong. Please try again later.</div>;
  }

  return (
    <div className={styles.blogDetailsPageContainer}>
      <div className={styles.actionButtons}>
        <Link className={styles.editButton} href={`/content-panel/blogs/${params.id}/edit`}>
          Edit
        </Link>
        <button type="button" className={styles.deleteButton} onClick={handleDeleteClick}>
          Delete
        </button>
        <button type="button" className={styles.viewListButton} onClick={handleViewBlogListClick}>
          View Blog List
        </button>
      </div>
      <form>
        <BlogDetailsCard
          title={blogDetails.title}
          imageUrl={blogDetails.image}
          content={blogDetails.content}
          author={blogDetails.author}
          publishDate={blogDetails.publishDate}
          tags={blogDetails.tags}
          onChange={noop}
          readOnly
        />
      </form>
    </div>
  );
};

export default BlogDetailsPage;
