import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Button from '../../reusable-components/button/Button';
import styles from './addTag.module.scss';

interface AddTagProps {
  onCancel: () => void;
  onAdd: (tag: string) => boolean;
}

const AddTag: React.FC<AddTagProps> = ({ onCancel, onAdd }) => {
  const validationSchema = Yup.object({
    tagName: Yup.string().trim().required('Името на тагот е задолжително.'),
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
          toast.success('Тагот е успешно креиран!');
        } else {
          setFieldError('tagName', 'Тагот веке постои.');
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
                placeholder="Внеси ново име за тагот."
                className={styles.input}
              />
              {errors.tagName && touched.tagName && (
                <div className={styles.error}>{errors.tagName}</div>
              )}
            </div>
            <Button
              onClick={onCancel}
              type="button"
              buttonText="Откажи"
              buttonClass={['deleteButton']}
            />
            <Button type="submit" buttonText="Креирај таг" buttonClass={['createTag']} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTag;
