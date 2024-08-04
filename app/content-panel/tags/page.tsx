'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from '../../../components/module-components/tags/Tags.module.scss';
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
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    tagName: Yup.string()
      .required('Името за тагот е задолжително')
      // eslint-disable-next-line func-names
      .test('unique', 'Тагот веќе постои', function (value) {
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

  return (
    <div className={styles.container}>
      <TagTable
        tags={tags}
        editingTagId={editingTagId}
        onEdit={triggerEdit}
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
            />
          </div>
        )}
      />
    </div>
  );
};

export default Tags;
