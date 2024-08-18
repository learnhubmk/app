import React from 'react';

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`);
    const data = await response.json();

    // Ensure data and data.data are defined
    const blogData = data?.data;

    // Use camel case for local variables
    const {
      title = 'N/A',
      slug = 'N/A',
      excerpt = 'N/A',
      content = 'N/A',
      publish_date: publishDate = 'N/A', // Renamed to camel case
      tags = [],
    } = blogData || {};

    return (
      <div>
        <h1>Blog Details Page</h1>
        <h3>Title: {title}</h3>
        <p>Blog Slug: {slug}</p>
        <p>Blog Excerpt: {excerpt}</p>
        <p>Blog Content: {content}</p>
        <p>Blog Publish Date: {publishDate}</p>
        <p>
          Blog Tags: {tags.length ? tags.map((tag: { name: any }) => tag.name).join(', ') : 'N/A'}
        </p>
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog details:', error);
    return <div>Error loading blog details.</div>;
  }
};

export default BlogDetailsPage;
