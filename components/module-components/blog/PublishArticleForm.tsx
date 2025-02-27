'use client';

import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import useAddNewPost from '../../../apis/mutations/blogs/useAddNewPost';
import { TagObject } from './TagInput';
import styles from './PublishArticleForm.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import TagManager from './TagManager';
import Button from '../../reusable-components/button/Button';
import QUERY_KEYS from '../../../apis/queryKeys';

const PublishArticleForm = () => {
  const { data: session } = useSession();
  const addNewPostMutation = useAddNewPost();
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);
  const queryClient = useQueryClient();

  const isUserAdmin = session?.user.role === 'admin';

  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Насловот е задолжителен.'),
    excerpt: Yup.string().trim().required('Описот е задолжителен.'),
    content: Yup.string()
      .trim()
      .required('Содржината е задолжителна.')
      .test('not-empty', 'Содржината не смее да биде празна.', (value) => {
        return value !== '<p></p>';
      }),
    tags: Yup.array()
      .required('Таговите се задолжителни.')
      .min(1, 'Мора да селектираш барем еден таг.'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: '',
        excerpt: '',
        content: '',
        tags: [],
      }}
      onSubmit={(values, { resetForm }) => {
        addNewPostMutation.mutate(values, {
          onSuccess: () => {
            resetForm();
            setSelectedTags([]);
            // Invalidate queries and show success message
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS.ALL });
          },
        });
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.inputLabel} htmlFor="title">
              Наслов<span className={styles.required}>*</span>
            </label>
            <Field
              className={styles.input}
              id="title"
              name="title"
              placeholder="Што најдобро ја опишува статијата?"
            />
            {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
          </div>

          <div className={styles.field}>
            <label className={styles.inputLabel} htmlFor="excerpt">
              Краток опис<span className={styles.required}>*</span>
            </label>
            <Field
              className={styles.input}
              id="excerpt"
              name="excerpt"
              placeholder="Неколку зборови кои резимираат за што е статијата."
            />
            {touched.excerpt && errors.excerpt && (
              <div className={styles.error}>{errors.excerpt}</div>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="content-editor" className={styles.inputLabel}>
              Содржина<span className={styles.required}>*</span>
            </label>
            <TiptapEditor
              editable
              content={values.content}
              onChange={(newContent) => setFieldValue('content', newContent)}
            />
            {touched.content && errors.content && (
              <div className={styles.error}>{errors.content}</div>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="tags" className={styles.inputLabel}>
              Тагови<span className={styles.required}>*</span>
            </label>
            <TagManager
              selectedTags={selectedTags}
              onTagsChange={(newTags) => {
                setSelectedTags(newTags);
                setFieldValue(
                  'tags',
                  newTags.map((tag) => tag.id)
                );
              }}
              isAdmin={isUserAdmin}
            />
            {touched.tags && errors.tags && <div className={styles.error}>{errors.tags}</div>}
          </div>

          {/* <div className={styles.field}>
            <label className={styles.inputLabel} htmlFor="image">
              Слика<span className={styles.required}>*</span>
            </label>
            <DropZone onImageChange={handleImageChange} onValidationError={setImageError} />

            {imageError && <div className={styles.error}>{imageError}</div>}
          </div> */}

          {addNewPostMutation.isPending ? (
            <Button
              disabled
              buttonText="Испраќање..."
              buttonClass={['primaryButton']}
              type="submit"
            />
          ) : (
            <Button buttonText="Креирај Статија" buttonClass={['primaryButton']} type="submit" />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PublishArticleForm;
