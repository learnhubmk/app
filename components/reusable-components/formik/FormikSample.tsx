'use client';

import { ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import ReusableForm from './ReusableFormik';

import classes from './FormikSample.module.scss';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const SampleForm = () => {
  // Define initial form values
  const initialValues: FormValues = {
    email: '',
    username: '',
    password: '',
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    password: Yup.string().required('Password is required'),
    username: Yup.string()
      .min(2, 'Username too Short!')
      .max(50, 'Username too Long!')
      .required('Username is required'),
  });

  return (
    <div className={classes.formContainer}>
      <ReusableForm initialValues={initialValues} validationSchema={validationSchema}>
        <div className={classes.field}>
          <Field name="email" placeholder="Email" />
          <div className={classes.error}>
            <ErrorMessage name="email" component="span" />
          </div>
        </div>
        <div className={classes.field}>
          <Field name="username" placeholder="Username" />
          <div className={classes.error}>
            <ErrorMessage name="username" component="span" />
          </div>
        </div>
        <div className={classes.field}>
          <Field name="password" placeholder="Password" />
          <div className={classes.error}>
            <ErrorMessage name="password" component="span" />
          </div>
        </div>
      </ReusableForm>
    </div>
  );
};

export default SampleForm;
