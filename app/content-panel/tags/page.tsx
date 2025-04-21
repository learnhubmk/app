'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { UserRole } from '../../../Types';

import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagTable from '../../../components/module-components/tags/TagTable';
import TextInput from '../../../components/reusable-components/text-input/TextInput';
import AddTag from '../../../components/module-components/tags/AddTag';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import useDebounce from '../../../utils/hooks/useDebounce';

import useGetTags from '../../../apis/queries/tags/getTags';
import useAddNewTag from '../../../apis/mutations/tags/useAddNewTag';
import useDeleteTag from '../../../apis/mutations/tags/useDeleteTag';
import useEditTag from '../../../apis/mutations/tags/useEditTag';
import { defaultMeta } from '../../../components/reusable-components/pagination/Pagination';
import { Tag } from '../../../components/reusable-components/_Types';

const Tags = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === UserRole.admin;

  // MUTATIONS
  const addNewTagMutation = useAddNewTag();
  const deleteTagMutation = useDeleteTag();
  const editTagMutation = useEditTag();

  // STATE
  const [showAddTag, setShowAddTag] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading } = useGetTags(debouncedSearchTerm, page, itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, itemsPerPage]);

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .required('Името за тагот е задолжително')
      .test('unique', 'Тагот веќе постои', (value) => {
        return !tags.some((tag) => tag.name.toLowerCase() === value?.toLowerCase().trim());
      }),
  });

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error('Само администратори можат да бришат тагови.');
      return;
    }
    await deleteTagMutation.mutateAsync(id);
  };

  const addTag = async (newTag: string) => {
    if (!isAdmin) {
      return { success: false, error: 'Само администратори можат да додаваат тагови.' };
    }

    const trimmedNewTag = newTag.trim();

    if (tags.some((tag) => tag.name.toLowerCase() === trimmedNewTag.toLowerCase())) {
      return { success: false, error: 'Тагот веќе постои.' };
    }

    await addNewTagMutation.mutateAsync({ tagName: trimmedNewTag });
    return { success: true }; // this is for formik validation purposes
  };

  const handleSaveChanges = async (tagId: string, newName: string) => {
    if (!isAdmin) {
      toast.error('Само администратори можат да уредуваат тагови.');
      return;
    }
    await editTagMutation.mutateAsync({ tagId, newName: newName.trim() });
    setEditingTagId(null);
  };

  const formik = useFormik({
    initialValues: {
      tagName: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleSaveChanges(editingTagId!, values.tagName);
      resetForm();
    },
  });

  const triggerEdit = (tagId: string) => {
    if (!isAdmin) {
      toast.error('Само администратори можат да уредуваат тагови.');
      return;
    }
    const tagToEdit = tags.find((tag) => tag.id === tagId);

    if (tagToEdit) {
      setEditingTagId(tagId);
      formik.setFieldValue('tagName', tagToEdit.name);
    }
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
    formik.resetForm();
  };

  useEffect(() => {
    if (data?.data) {
      setTags(data.data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <TagManagementControls
        onAddClick={() => setShowAddTag(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdmin={isAdmin}
      />

      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}

      <TagTable
        setItemsPerPage={setItemsPerPage}
        paginationData={data?.meta || defaultMeta}
        setPaginationPage={setPage}
        isLoading={isLoading}
        tags={data?.data || []}
        editingTagId={editingTagId}
        onEdit={triggerEdit}
        onDelete={handleDelete}
        onSave={formik.handleSubmit}
        onCancel={handleCancelEdit}
        isAdmin={isAdmin}
        renderEditInput={() => (
          <div style={{ height: '40px' }}>
            <TextInput
              placeholder="Внеси име за тагот"
              name="tagName"
              type="text"
              field="tagName"
              formik={formik}
              isRequired
              label=""
              inputClass={['tagTableInput']}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Tags;
