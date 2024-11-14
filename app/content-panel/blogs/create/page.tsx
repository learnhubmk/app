'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import useAddNewPost from '../../../../apis/mutations/blogs/useAddNewPost';
import TagManager from '../../../../components/module-components/blog/TagManager';

import styles from './createArticlePage.module.scss';
import Button from '../../../../components/reusable-components/button/Button';
import TiptapEditor from '../../../../components/editor/TiptapEditor';

interface Values {
  title: string;
  excerpt: string;
  content: string;
  tags: number[];
}

const PostArticle = () => {
  const addNewPostMutation = useAddNewPost();

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    excerpt: Yup.string().required('Excerpt is required'),
    content: Yup.string().required('Content is required'),
    tags: Yup.string().required('Tags are required'),
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
          onSubmit={(values: Values) => {
            handleAddPost(values);
          }}
        >
          {({ touched, errors }) => (
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
                {touched.title && errors.title ? (
                  <div className={styles.error}>{errors.title}</div>
                ) : null}
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
                {touched.excerpt && errors.excerpt ? (
                  <div className={styles.error}>{errors.excerpt}</div>
                ) : null}
              </div>

              <TiptapEditor content="" editable onChange={() => {}} />

              <TagManager />

              <Button buttonText="Publish Article" buttonClass={['primaryButton']} type="submit" />
            </Form>
          )}
        </Formik>

        {addNewPostMutation.isPending ? (
          'Adding post...'
        ) : (
          <>
            {addNewPostMutation.isError ? (
              <div>An error occurred: {addNewPostMutation.error.message}</div>
            ) : null}

            {addNewPostMutation.isSuccess ? <div>Added new post</div> : null}
          </>
        )}
      </div>
    </div>
  );
};

export default PostArticle;
