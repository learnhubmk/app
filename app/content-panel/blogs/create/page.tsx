'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import useAddNewPost from '../../../../apis/mutations/blogs/useAddNewPost';
import TagManager from '../../../../components/module-components/blog/TagManager';

import styles from './createArticlePage.module.scss';
import Button from '../../../../components/reusable-components/button/Button';
import TiptapEditor from '../../../../components/editor/TiptapEditor';
import { TagObject } from '../../../../components/module-components/blog/TagInput';

interface Values {
  title: string;
  excerpt: string;
  content: string;
  tags: number[] | string[];
}

const PostArticle = () => {
  const addNewPostMutation = useAddNewPost();
  const [selectedTags, setSelectedTags] = useState<TagObject[]>([]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    excerpt: Yup.string().required('Excerpt is required'),
    content: Yup.string()
      .required('Content is required')
      .test('not-empty', 'Content cannot be empty', (value) => {
        return value !== '<p></p>';
      }),
    tags: Yup.array().required('Tags are required').min(1),
  });

  const handleAddPost = (values: Values) => {
    addNewPostMutation.mutate(values);
  };

  return (
    <div className={styles.container}>
      <h2>Post an article</h2>

      <div className={styles.controlsContainer}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            title: '',
            excerpt: '',
            content: '',
            tags: [],
          }}
          onSubmit={handleAddPost}
        >
          {({ values, setFieldValue, touched, errors }) => (
            <Form className={styles.form}>
              <div className={styles.field}>
                <label className={styles.inputLabel} htmlFor="title">
                  Article Title
                </label>
                <Field
                  className={styles.input}
                  id="title"
                  name="title"
                  placeholder="Your awesome title goes here"
                />
                {touched.title && errors.title && (
                  <div className={styles.error}>{errors.title}</div>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.inputLabel} htmlFor="excerpt">
                  Short Description
                </label>
                <Field
                  className={styles.input}
                  id="excerpt"
                  name="excerpt"
                  placeholder="A short description of the article."
                />
                {touched.excerpt && errors.excerpt && (
                  <div className={styles.error}>{errors.excerpt}</div>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.inputLabel}>Content</label>
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
                <label className={styles.inputLabel}>Tags</label>
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

              {addNewPostMutation.isPending ? (
                <Button
                  disabled
                  buttonText="Submitting..."
                  buttonClass={['primaryButton']}
                  type="submit"
                />
              ) : (
                <Button
                  buttonText="Publish Article"
                  buttonClass={['primaryButton']}
                  type="submit"
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostArticle;
