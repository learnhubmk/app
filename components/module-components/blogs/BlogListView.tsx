'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogManagementControls from './BlogManagementControls';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import { useEditor } from '../../../app/context/EditorContext';
import useGetBlogs from '../../../apis/queries/blogs/getBlogs';
import useDebounce from '../../../utils/hooks/useDebounce';
import { BlogPost } from './interfaces';
import { defaultMeta } from '../../reusable-components/pagination/Pagination';
import style from './BlogListView.module.scss';
import Dropdown from '../../reusable-components/reusable-dropdown/ReusableDropdown';
import useDeletePost from '../../../apis/mutations/blogs/useDeletePost';
import ReusableModal from '../../reusable-components/reusable-modal/ReusableModal';

const BlogListView = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const { editorStateChange } = useEditor();
  const router = useRouter();

  const deletePostMutation = useDeletePost();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useGetBlogs(debouncedSearchTerm, paginationPage, itemsPerPage);

  useEffect(() => {
    setPaginationPage(1);
  }, [debouncedSearchTerm, itemsPerPage]);

  const handleView = (id: string) => {
    editorStateChange({ isEditable: false });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleEdit = (id: string) => {
    editorStateChange({ isEditable: true });
    router.push(`/content-panel/blogs/${id}`);
  };

  const handleDeleteClose = () => {
    setIsOpen(false);
    setPostToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      await deletePostMutation.mutateAsync(postToDelete.id);
      handleDeleteClose();
    }
  };

  const handleOpenDeleteModal = (post: BlogPost) => {
    setPostToDelete(post);
    setIsOpen(true);
  };

  const getActions = (item: BlogPost) => {
    const actions = [
      { id: 'view', label: 'View', onClick: () => handleView(item.id) },
      { id: 'edit', label: 'Edit', onClick: () => handleEdit(item.id) },
      {
        id: 'delete',
        label: 'Delete',
        onClick: () => {
          handleOpenDeleteModal(item);
        },
      },
    ];
    return actions;
  };

  const renderActionsDropdown = (item: BlogPost) => (
    <Dropdown placeholder="Actions" items={getActions(item)} />
  );

  const headers: (keyof BlogPost)[] = ['title', 'author', 'status'];
  const displayNames = {
    title: 'Title',
    author: 'Author',
    status: 'Status',
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.inputWrapper}>
        <BlogManagementControls
          onAddClick={() => {
            router.push('/content-panel/blogs/create');
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <ReusableTable
        setItemsPerPage={setItemsPerPage}
        paginationData={data?.meta || defaultMeta}
        setPaginationPage={setPaginationPage}
        headers={headers}
        displayNames={displayNames}
        data={data?.data || []}
        isLoading={isLoading}
        onRowClick={handleView}
        renderActionsDropdown={renderActionsDropdown}
      />
      <ReusableModal
        title="Are you sure you want to proceed?"
        isOpen={isOpen}
        onClose={handleDeleteClose}
        primaryButtonLabel="Delete"
        secondaryButtonLabel="Cancel"
        onPrimaryButtonClick={handleDeleteConfirm}
        onSecondaryButtonClick={handleDeleteClose}
      />
    </div>
  );
};

export default BlogListView;
