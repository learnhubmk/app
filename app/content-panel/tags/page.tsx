'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagTable from '../../../components/module-components/tags/TagTable';
import TextInput from '../../../components/reusable-components/text-input/TextInput';
import AddTag from '../../../components/module-components/tags/AddTag';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import useDebounce from '../../../utils/hooks/useDebounce';

import useGetTags from '../../../api/queries/tags/getTags';
import useAddNewTag from '../../../api/mutations/tags/useAddNewTag';
import useDeleteTag from '../../../api/mutations/tags/useDeleteTag';
import useEditTag from '../../../api/mutations/tags/useEditTag';

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  // MUTATIONS
  const addNewTagMutation = useAddNewTag();
  const deleteTagMutation = useDeleteTag();
  const editTagMutation = useEditTag();

  // STATE
  const [showAddTag, setShowAddTag] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, refetch } = useGetTags(debouncedSearchTerm);

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .required('Името за тагот е задолжително')
      .test('unique', 'Тагот веќе постои', (value) => {
        return !tags.some((tag) => tag.name.toLowerCase() === value?.toLowerCase().trim());
      }),
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteTagMutation.mutateAsync(id);
      await refetch();

      toast.success('Тагот беше успешно избришан.');
    } catch (error) {
      console.error(error);
      await refetch();
    }
  };

  const addTag = async (newTag: string) => {
    const trimmedNewTag = newTag.trim();

    if (tags.some((tag) => tag.name.toLowerCase() === trimmedNewTag.toLowerCase())) {
      return { success: false, error: 'Тагот веќе постои.' };
    }

    try {
      await addNewTagMutation.mutateAsync({
        tagName: trimmedNewTag,
      });
      await refetch();

      return { success: true };
    } catch (error) {
      await refetch();
      return { success: false, error: 'API Error' };
    }
  };

  const handleSaveChanges = async (tagId: string, newName: string) => {
    try {
      await editTagMutation.mutateAsync({ tagId, newName: newName.trim() });
      await refetch();

      setEditingTagId(null);
      toast.success('Тагот беше успешно изменет');
    } catch (error) {
      console.error(error);
      await refetch();
    }
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
      />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable
        isLoading={isLoading}
        tags={tags}
        editingTagId={editingTagId}
        onEdit={triggerEdit}
        onDelete={handleDelete}
        onSave={formik.handleSubmit}
        onCancel={handleCancelEdit}
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
