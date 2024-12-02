/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Image from 'next/image';
import useAddNewMember from '../../../apis/mutations/admin-add-member/addNewMember';
import styles from './AddMemberForm.module.scss';
import error from '../../../public/error.svg';
import TextInput from '../../reusable-components/text-input/TextInput';

const AddMemberForm: React.FC = () => {
  const addMemberMutation = useAddNewMember();
  const [isBearerTokenAvailable, setIsBearerTokenAvailable] = useState(true);

  useEffect(() => {
    setIsBearerTokenAvailable(!!process.env.NEXT_PUBLIC_BEARER);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      first_name: Yup.string().required('Required'),
      last_name: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      if (!isBearerTokenAvailable) {
        console.error('Bearer token is not available');
        return;
      }
      try {
        await addMemberMutation.mutateAsync(values);
        console.log('Member added successfully');
        formik.resetForm();
      } catch (error) {
        console.error('Error adding member:', error);
      }
    },
  });

  if (!isBearerTokenAvailable) {
    return <p>Bearer token is not available. Please check your environment variables.</p>;
  }

  return (
    <div className={styles.addMemberForm}>
      <form className={styles.innerAddMemberForm} onSubmit={formik.handleSubmit}>
        <h2 className={styles.addMemberTitle}>Invite New Member</h2>
        <TextInput
          placeholder="Enter email address"
          label="Email"
          name="email"
          type="email"
          field="email"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Enter first name"
          label="First Name"
          name="first_name"
          type="text"
          field="first_name"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Enter last name"
          label="Last Name"
          name="last_name"
          type="text"
          field="last_name"
          formik={formik}
          isRequired
        />
        <button
          type="submit"
          className={styles.addMemberBtn}
          disabled={addMemberMutation.isPending}
        >
          {addMemberMutation.isPending ? 'Inviting...' : 'Invite Member'}
        </button>
        {addMemberMutation.isError && (
          <div className={styles.errorMessageContainer}>
            <Image src={error} alt="Error" />
            <p className={styles.errorMessage}>
              {addMemberMutation.error?.message || 'An error occurred while inviting the member'}
            </p>
          </div>
        )}
        {addMemberMutation.isSuccess && (
          <p className={styles.successMessage}>Member invited successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddMemberForm;
