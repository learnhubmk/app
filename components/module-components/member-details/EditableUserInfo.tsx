import React from 'react';
import Image from 'next/image';
import { FormikProps } from 'formik';
import { TransformedMember } from '../../../apis/queries/members/types';
import styles from './EditableUserInfo.module.scss';
import TextInput from '../../reusable-components/text-input/TextInput';
import Button from '../../reusable-components/button/Button';

const EditableUserInfo = ({
  userData,
  isEditing,
  setIsEditing,
  formik,
}: {
  userData: TransformedMember;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  formik: FormikProps<{ profileImageURL: string; firstName: string; lastName: string }>;
}) => {
  return (
    <div className={styles.container}>
      <Image alt="User image" src={userData?.image || ''} width={150} height={150} />
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <TextInput
            inputClass={['tagTableInput']}
            disabled={!isEditing}
            type="text"
            placeholder="https://example.com/placeholder-image.png"
            onChange={() => {}}
            label="Слика"
            name="profileImageURL"
            field="profileImageURL"
            formik={formik}
          />
        </div>

        <div className={styles.input}>
          <TextInput
            inputClass={['tagTableInput']}
            disabled={!isEditing}
            type="text"
            placeholder="Митре"
            onChange={() => {}}
            label="Име"
            name="firstName"
            field="firstName"
            formik={formik}
          />
        </div>

        <div className={styles.input}>
          <TextInput
            inputClass={['tagTableInput']}
            disabled={!isEditing}
            type="text"
            placeholder="Митревски"
            onChange={() => {}}
            label="Презиме"
            name="lastName"
            field="lastName"
            formik={formik}
          />
        </div>

        {isEditing && (
          <div className={styles.buttonContainer}>
            <Button type="submit" buttonText="Save" buttonClass={['primaryButton']} />
            <Button
              onClick={() => {
                setIsEditing(false);
                formik.resetForm();
              }}
              buttonText="Cancel"
              type="button"
              buttonClass={['secondaryButton']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableUserInfo;
