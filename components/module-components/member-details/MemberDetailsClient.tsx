'use client';

import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import EditableUserInfo from './EditableUserInfo';
import Loading from '../../../app/loading';
import { TransformedMember } from '../../../apis/queries/members/types';
import useGetMemberDetails from '../../../apis/queries/members/getMemberDetails';
import axiosInstance from '../../../apis/axiosInstance';
import ENDPOINTS from '../../../apis/endpoints';

const MemberDetailsClient = ({
  initialData,
  userId,
}: {
  initialData: TransformedMember;
  userId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError } = useGetMemberDetails(userId, initialData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async ({
    profileImageURL,
    firstName,
    lastName,
  }: {
    profileImageURL: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      await axiosInstance.put(`${ENDPOINTS.MEMBERS.UPDATE}/${userId}`, {
        image: profileImageURL, // TO DO: CHANGE IMAGE LOGIC (backend expects actual file and not url)
        first_name: firstName,
        last_name: lastName,
        email: data?.email,
        status: data?.status,
        role: data?.role,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    profileImageURL: Yup.string()
      .url('Профилната слика мора да биде валиден линк.')
      .required('Профилната слика е задолжителна.'),
    firstName: Yup.string()
      .min(3, 'Името мора да има барем 3 карактери.')
      .required('Името е задолжително'),
    lastName: Yup.string()
      .min(5, 'Името мора да има барем 5 карактери')
      .required('Презимето е задолжително.'),
  });

  const formik = useFormik({
    initialValues: {
      profileImageURL: data?.image || '',
      firstName: data?.first_name || '',
      lastName: data?.last_name || '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSave(values);
      resetForm();
    },
  });

  if (isLoading) return <Loading />;

  if (isError) return <div>Настана грешка</div>;

  console.log(isEditing);
  return (
    <form onSubmit={formik.handleSubmit}>
      {isEditing ? (
        <button type="button">Save</button>
      ) : (
        <button type="button" onClick={() => handleEdit()}>
          Edit
        </button>
      )}
      <button type="button">Delete</button>
      <EditableUserInfo
        setIsEditing={setIsEditing}
        formik={formik}
        isEditing={isEditing}
        userData={data}
      />
    </form>
  );
};

export default MemberDetailsClient;
