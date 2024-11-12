'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import useAddNewPost from '../../../../apis/mutations/blogs/useAddNewPost';

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
    <div>
      <h1>Post an article</h1>
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
          <Form>
            <label htmlFor="title">Article Title</label>
            <Field id="title" name="title" placeholder="Your awesome title goes here" />
            {touched.title && errors.title ? <div>{errors.title}</div> : null}

            <label htmlFor="excerpt">Short Description</label>
            <Field id="excerpt" name="excerpt" placeholder="A short description of the article." />
            {touched.excerpt && errors.excerpt ? <div>{errors.title}</div> : null}

            <label htmlFor="content">Content</label>
            <Field id="content" name="content" placeholder="This article is about..." />
            {touched.content && errors.content ? <div>{errors.title}</div> : null}

            <label htmlFor="tags">Tags</label>
            {touched.tags && errors.tags ? <div>{errors.tags}</div> : null}

            <Field id="tags" name="tags" placeholder="Tag1, Tag2, Tag3..." />

            <button type="submit">Submit</button>
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
  );
};

export default PostArticle;
