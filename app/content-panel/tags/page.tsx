'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagTable from '../../../components/module-components/tags/TagTable';
import TextInput from '../../../components/reusable-components/text-input/TextInput';
import AddTag from '../../../components/module-components/tags/AddTag';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import useDebounce from '../../../utils/hooks/useDebounce';
import useGetTags from '../../../api/queries/tags/getTags';

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  const getTagsQuery = useGetTags();

  const { data, isLoading } = useQuery(getTagsQuery);

  const [showAddTag, setShowAddTag] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .required('Името за тагот е задолжително')
      .test('unique', 'Тагот веќе постои', function (value) {
        return !tags.some((tag) => tag.name.toLowerCase() === value?.toLowerCase().trim());
      }),
  });

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
    toast.success('Тагот беше успешно избришан.');
  };

  const filteredTags = useMemo(() => {
    const trimmedSearchTerm = debouncedSearchTerm.trim().toLowerCase();
    return tags.filter((tag) => tag.name.toLowerCase().includes(trimmedSearchTerm));
  }, [tags, debouncedSearchTerm]);

  const addTag = (newTag: string) => {
    const trimmedNewTag = newTag.trim();
    if (tags.some((tag) => tag.name.toLowerCase() === trimmedNewTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = tags.length > 0 ? (parseInt(tags[tags.length - 1].id, 10) + 1).toString() : '1';
    setTags([...tags, { id: newId, name: trimmedNewTag }]);
    return true;
  };

  const handleSaveChanges = (tagId: string, newName: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === tagId ? { ...tag, name: newName.trim() } : tag))
    );
    setEditingTagId(null);
  };

  const formik = useFormik({
    initialValues: {
      tagName: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSaveChanges(editingTagId!, values.tagName);
      toast.success('Тагот беше успешно изменет');
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
        tags={filteredTags}
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
