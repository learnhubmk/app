'use client';

import React, { useState } from 'react';

// Placeholder Text Editor Component
const TextEditor = ({ content, editable }: { content: string; editable: boolean }) => (
  <div>
    {editable ? <textarea defaultValue={content} disabled={!editable} /> : <p>{content}</p>}
  </div>
);

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${params.id}`);
    const data = await response.json();
    return data.data;
  };

  const data = await fetchData();
  const {
    title = 'N/A',
    slug = 'N/A',
    image = '',
    author = { first_name: 'N/A', last_name: 'N/A' },
    publish_date = 'N/A',
    tags = [],
  } = data || {};

  const handleEditClick = () => {
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

  return (
    <div>
      <div>
        <button onClick={handleEditClick}>{isEditable ? 'Save' : 'Edit'}</button>
        <button>Delete</button>
      </div>
      <h1>{title}</h1>
      <div>
        <label>Image:</label>
        <input type="file" disabled={!isEditable} onChange={handleImageChange} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {!selectedImage && image && <img src={image} alt="Blog" />}
      </div>
      <div>
        <label>slug:</label>
        <TextEditor content={slug} editable={isEditable} />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={`${author.first_name} ${author.last_name}`}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label>Date:</label>
        <input type="text" value={publish_date} disabled={!isEditable} />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags.length ? tags.map((tag: any) => tag.name).join(', ') : 'N/A'}
          disabled={!isEditable}
        />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
