'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
  status: string;
}

const BlogListView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { editorStateChange } = useEditor();
  const [data, setData] = useState<BlogPost[]>([]);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts`;
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const result = await response.json();

        const transformedData: BlogPost[] = result.data.map((item: BlogPostAPI) => ({
          id: item.slug,
          title: item.title,
          tags: item.tags,
          author: `${item.author.first_name} ${item.author.last_name}`,
          status: 'draft',
        }));

        setData(transformedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, [apiUrl]);

  const headers: (keyof BlogPost)[] = ['title', 'author', 'status'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
    status: 'Status',
  };

  const handleView = (id: string) => {
    editorStateChange({ isEditable: false });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleEdit = (id: string) => {
    editorStateChange({ isEditable: true });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleChangeStatus = async (id: string, newStatus: string) => {
    if (!session || !session.user) {
      // eslint-disable-next-line no-console
      console.error('Session is not available');
      return;
    }

    try {
      const changeStatusUrl = new URL(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-posts/${id}/statuses`
      );

      const requestHeaders = {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const body: { publish_date?: string; status: string } = {
        status: newStatus,
      };

      if (newStatus === 'published') {
        // eslint-disable-next-line prefer-destructuring
        body.publish_date = new Date().toISOString().split('T')[0];
      }

      fetch(changeStatusUrl.toString(), {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(() => {
          setData((prevData) => {
            const [updatedItem] = prevData.filter((item) => item.id === id);
            updatedItem.status = newStatus;
            return prevData.map((item) => (item.id === id ? updatedItem : item));
          });
        })
        .catch((err) => {
          if (err instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(`Error updating status: ${err.message}`);
            if (err.message.includes('404')) {
              // eslint-disable-next-line no-console
              console.error('The specified blog post ID was not found.');
            }
          } else {
            // eslint-disable-next-line no-console
            console.error('An unexpected error occurred:', err);
          }
        });
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(`Error updating status: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.error('An unexpected error occurred:', err);
      }
    }
  };

  const renderActionsDropdown = (item: BlogPost) => {
    if (!session || !session.user.role) {
      return null;
    }

    const userRole = session.user.role as 'admin' | 'content_manager';

    const dropdownItems = [
      { id: 'view', label: 'View', onClick: () => handleView(item.id) },
      { id: 'edit', label: 'Edit', onClick: () => handleEdit(item.id) },
      userRole === 'admin'
        ? {
            id: 'publish',
            label: 'Publish',
            onClick: () => handleChangeStatus(item.id, 'published'),
          }
        : undefined,
      userRole === 'content_manager' && item.status === 'draft'
        ? {
            id: 'in-review',
            label: 'Move to In Review',
            onClick: () => handleChangeStatus(item.id, 'in_review'),
          }
        : undefined,
    ].filter(
      (dropdownItem): dropdownItem is { id: string; label: string; onClick: () => void } =>
        dropdownItem !== undefined
    );

    return <ActionDropdown dropdownItems={dropdownItems} />;
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <BlogManagementControls
          onAddClick={() => {
            router.push('/content-panel/blogs/new');
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
