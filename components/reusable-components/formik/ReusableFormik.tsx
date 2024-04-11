import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import classes from './ReusableFormik.module.scss';

// This interface is defined as an object where keys are strings and values are of any type. This allows flexibility in defining form fields.
interface FormValues {
  [key: string]: any;
}

// This interface defines the props expected by the ReusableForm component. It includes initialValues (the initial state of form values), and validationSchema (for form validation).
interface Props<T extends FormValues> {
  initialValues: FormValues;
  validationSchema: Yup.ObjectSchema<T>;
}

const ReusableFormik = <T extends FormValues>({
  initialValues,
  validationSchema,
  children,
}: React.PropsWithChildren<Props<T>>) => {
  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(false);
    resetForm(); // Reset the form values
    // console.log('values', values);
  };

  return (
    <div className={classes.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child);
              }
              return child;
            })}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReusableFormik;
