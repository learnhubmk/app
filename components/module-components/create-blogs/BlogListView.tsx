'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import Filter from '../SearchAndFilter/Filter';
import Search from '../SearchAndFilter/Search';
import ActionDropdown from '../../reusable-components/reusable-table/ActionDropdown';
import style from './createBlogs.module.scss';
import { useEditor } from '../../../app/context/EditorContext';

interface Author {
  first_name: string;
  last_name: string;
}

interface Tag {
  name: string;
}

interface BlogPostAPI {
  slug: string;
  title: string;
  tags: Tag[];
  author: Author;
}

interface BlogPost {
  id: string;
  title: string;
  tags: Tag[];
  author: string;
}

const BlogListView = () => {
  const { editorStateChange } = useEditor();
  const [data, setData] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts`;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        const transformedData: BlogPost[] = result.data.map((item: BlogPostAPI) => ({
          id: item.slug,
          title: item.title,
          tags: item.tags,
          author: `${item.author.first_name} ${item.author.last_name}`,
        }));
        setData(transformedData);
      } catch (fetchError) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const headers: (keyof BlogPost)[] = ['title', 'author', 'tags'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
    tags: 'Tags',
  };


  const handleAction = (action: 'view' | 'edit' | 'delete', id: string) => {
    // Implement actual logic for view, edit, delete
    // For now, we'll just set a temporary error message
    setError(`${action} action not implemented for blog ${id}`);
    // Clear error after 3 seconds
    setTimeout(() => setError(null), 3000);
  };

  const renderActionsDropdown = (item: BlogPost) => (
    <ActionDropdown
      dropdownItems={[
        { id: 'view', label: 'View', onClick: () => handleAction('view', item.id) },
        { id: 'edit', label: 'Edit', onClick: () => handleAction('edit', item.id) },
        { id: 'delete', label: 'Delete', onClick: () => handleAction('delete', item.id) },
      ]}
    />
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={style.mainContainer}>
      {error && <div className={style.errorMessage}>{error}</div>}
      <div className={style.inputWrapper}>
        <Search handleInputChange={() => {}} searchValue="Search" />
        <div className={style.rightContainer}>
          <Filter handleRoleChange={() => {}} />
          <Button
            href=""
            type="button"
            buttonText="Add Blog"
            buttonClass={['primaryButton']}
            moveIcon
          />
        </div>
      </div>
      <ReusableTable
        headers={headers}
        displayNames={displayNames}
        data={data}
        onRowClick={handleView}
        renderActionsDropdown={renderActionsDropdown}
      />
    </div>
  );
};

export default BlogListView;
