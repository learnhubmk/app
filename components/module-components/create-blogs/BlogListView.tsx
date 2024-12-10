'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogManagementControls from './BlogManagementControls';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import ActionDropdown from '../../reusable-components/reusable-table/ActionDropdown';
import { useEditor } from '../../../app/context/EditorContext';
import useGetBlogs from '../../../apis/queries/blogs/getBlogs';
import useDebounce from '../../../utils/hooks/useDebounce';
import { BlogPost } from './interfaces';
import style from './createBlogs.module.scss';
import { defaultMeta } from '../../reusable-components/pagination/Pagination';

const BlogListView = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { editorStateChange } = useEditor();
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useGetBlogs(debouncedSearchTerm, paginationPage);

  const handleView = (id: string) => {
    editorStateChange({ isEditable: false });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleEdit = (id: string) => {
    editorStateChange({ isEditable: true });
    router.push(`/content-panel/blogs/${id}`);
  };

  const renderActionsDropdown = (item: BlogPost) => (
    <ActionDropdown
      dropdownItems={[
        { id: 'view', label: 'View', onClick: () => handleView(item.id) },
        { id: 'edit', label: 'Edit', onClick: () => handleEdit(item.id) },
        { id: 'delete', label: 'Delete', onClick: () => {} },
      ]}
    />
  );

  const headers: (keyof BlogPost)[] = ['title', 'author'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
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
        paginationData={data?.meta || defaultMeta}
        setPaginationPage={setPaginationPage}
        headers={headers}
        displayNames={displayNames}
        data={data?.data || []}
        isLoading={isLoading}
        onRowClick={handleView}
        renderActionsDropdown={renderActionsDropdown}
      />
    </div>
  );
};

export default BlogListView;
