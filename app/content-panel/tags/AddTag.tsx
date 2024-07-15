import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Button from '../../../components/reusable-components/button/Button';
import styles from './addTag.module.scss';

interface AddTagProps {
  onCancel: () => void;
  onAdd: (tag: string) => boolean;
}

const AddTag: React.FC<AddTagProps> = ({ onCancel, onAdd }) => {
  const validationSchema = Yup.object({
    tagName: Yup.string().trim().required('Tag name cannot be empty'),
  });

  return (
    <Formik
      initialValues={{ tagName: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setFieldError, resetForm }) => {
        const success = onAdd(values.tagName.trim());
        if (success) {
          resetForm();
          onCancel();
          toast.success('Tag created successfully');
        } else {
          setFieldError('tagName', 'Tag already exists');
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.addTagContainer}>
          <div className={styles.controlsContainer}>
            <div className={styles.inputWrapper}>
              <Field
                name="tagName"
                type="text"
                placeholder="Enter new tag name"
                className={styles.input}
              />
              {errors.tagName && touched.tagName && (
                <div className={styles.error}>{errors.tagName}</div>
              )}
            </div>
            <Button
              onClick={onCancel}
              type="button"
              buttonText="Cancel"
              buttonClass={['deleteButton']}
            />
            <Button type="submit" buttonText="Create Tag" buttonClass={['createTag']} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTag;
