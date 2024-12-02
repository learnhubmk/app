'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import BlogManagementControls from './BlogManagementControls';
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
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, [url]);

  const headers: (keyof BlogPost)[] = ['title', 'author'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
  };

  const handleView = (id: string) => {
    editorStateChange({ isEditable: false });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleEdit = (id: string) => {
    editorStateChange({ isEditable: true });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleDelete = () => {
    // delete logic here
  };

  const renderActionsDropdown = (item: BlogPost) => (
    <ActionDropdown
      dropdownItems={[
        { id: 'view', label: 'View', onClick: () => handleView(item.id) },
        { id: 'edit', label: 'Edit', onClick: () => handleEdit(item.id) },
        { id: 'delete', label: 'Delete', onClick: () => handleDelete() },
      ]}
    />
  );

  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <BlogManagementControls
          onAddClick={() => {
            router.push('/content-panel/blogs/create');
          }}
          searchTerm=""
          setSearchTerm={() => {}}
        />
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
