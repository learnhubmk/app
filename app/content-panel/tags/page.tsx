'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../components/module-components/tags/Tags.module.scss';
import TagManagementControls from '../../../components/module-components/tags/TagManagementControls';
import AddTag from '../../../components/module-components/tags/AddTag';
import TagTable from '../../../components/module-components/tags/TagTable';
import TextInput from '../../../components/reusable-components/text-input/TextInput';

interface Tag {
  id: string;
  name: string;
}

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'NextJS' },
  ]);
  const [showAddTag, setShowAddTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .required('Tag name is required')
      .test('unique', 'Tag name already exists', function (value) {
        return !tags.some((tag) => tag.name.toLowerCase() === value?.toLowerCase());
      }),
  });

  const handleSaveChanges = (tagId: string, newName: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === tagId ? { ...tag, name: newName } : tag))
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
      resetForm();
    },
  });

  const addTag = (newTag: string) => {
    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = tags.length > 0 ? (parseInt(tags[tags.length - 1].id, 10) + 1).toString() : '1';
    setTags([...tags, { id: newId, name: newTag }]);
    return true;
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

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

  return (
    <div className={styles.container}>
      <TagManagementControls onAddClick={() => setShowAddTag(true)} />
      {showAddTag && <AddTag onCancel={() => setShowAddTag(false)} onAdd={addTag} />}
      <TagTable
        tags={tags}
        onDelete={handleDelete}
        editingTagId={editingTagId}
        onEdit={triggerEdit}
        onSave={formik.handleSubmit}
        onCancel={handleCancelEdit}
        renderEditInput={() => (
          <div style={{ height: '40px' }}>
            <TextInput
              placeholder="Enter tag name"
              name="tagName"
              type="text"
              field="tagName"
              formik={formik}
              isRequired
              label=""
            />
          </div>
        )}
      />
    </div>
  );
};

export default Tags;
