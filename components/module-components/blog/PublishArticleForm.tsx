'use client';

import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import useAddNewPost, { NewPost } from '../../../apis/mutations/blogs/useAddNewPost';
import { TagObject } from './TagInput';
import styles from './PublishArticleForm.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import TagManager from './TagManager';
import Button from '../../reusable-components/button/Button';
import StatusManager from './StatusManager';

const PublishArticleForm = () => {
  const addNewPostMutation = useAddNewPost();
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState('');

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

  const handleAddPost = (values: NewPost) => {
    addNewPostMutation.mutate(values);
  };

  useEffect(() => {
    if (addNewPostMutation.isSuccess) {
      router.push('/content-panel/blogs');
    }
  }, [addNewPostMutation.isSuccess, router]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: '',
        excerpt: '',
        content: '',
        tags: [],
        status: '',
      }}
      onSubmit={handleAddPost}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.inputLabel} htmlFor="title">
              Наслов
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
              Краток опис
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
              Содржина
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
              Тагови
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
            />
            {touched.tags && errors.tags && <div className={styles.error}>{errors.tags}</div>}
          </div>

          <div className={styles.fields}>
            <label htmlFor="status" className={styles.inputLabel}>
              Статус
            </label>
            <StatusManager
              currentStatus={currentStatus}
              handleStatusChange={(event) => setCurrentStatus(event.target.value)}
            />
            {touched.status && errors.status && <div className={styles.error}>{errors.status}</div>}
          </div>

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
