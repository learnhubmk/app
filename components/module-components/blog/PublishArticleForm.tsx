'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { UserRole } from '../../../Types';
import { useAddNewPost, NewPost } from '../../../apis/mutations/blogs/useAddNewPost';
import styles from './PublishArticleForm.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import TagManager, { TagManagerRef } from './TagManager';
import Button from '../../reusable-components/button/Button';
import ImageUpload from '../../reusable-components/image-upload/ImageUpload';
import ReusableModal from '../../reusable-components/reusable-modal/ReusableModal';
import StatusManager from './StatusManager';
import { Tag } from '../../reusable-components/_Types';

interface FormValues {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: string;
  image?: File;
}

const PublishArticleForm = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === UserRole.admin;
  const router = useRouter();
  const tagManagerRef = useRef<TagManagerRef>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { mutate: addNewPost, isPending } = useAddNewPost();

  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Насловот е задолжителен.'),
    excerpt: Yup.string().trim().required('Описот е задолжителен.'),
    content: Yup.string()
      .trim()
      .required('Содржината е задолжителна.')
      .test('not-empty', 'Содржината не смее да биде празна.', (value) => {
        return value !== '<p></p>';
      }),
    tags: Yup.array()
      .required('Таговите се задолжителни.')
      .min(1, 'Мора да селектираш барем еден таг.'),
    status: Yup.string().required('Статусот е задолжителен.'),
    image: Yup.mixed<File>()
      .test('fileSize', 'Сликата не смее да биде поголема од 5MB', (value) => {
        if (!value) return true;
        return (value as File).size <= 5000000;
      })
      .test('fileType', 'Дозволени се само слики', (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'image/gif'].includes((value as File).type);
      }),
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          'Имате незачувани промени. Дали сте сигурни дека сакате да ја напуштите страницата?';
        return e.returnValue;
      }
      return undefined;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleAddPost = (values: NewPost) => {
    addNewPost(values, {
      onSuccess: () => {
        toast.success('Статијата е успешно креирана!');
        setHasUnsavedChanges(false);
        tagManagerRef.current?.clearInput();
        router.push('/content-panel/blogs');
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || 'Настана грешка при креирање на статијата.';
        toast.error(errorMessage);
      },
    });
  };

  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const handleNavigateAway = useCallback(() => {
    setHasUnsavedChanges(false);
    router.push('/content-panel/blogs');
  }, [router]);

  const handleBackClick = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedChangesModal(true);
    } else {
      handleNavigateAway();
    }
  };

  return (
    <>
      <ReusableModal
        isOpen={showUnsavedChangesModal}
        title="Незачувани промени"
        description="Имате незачувани промени. Дали сте сигурни дека сакате да ја напуштите страницата?"
        onClose={() => setShowUnsavedChangesModal(false)}
        primaryButtonLabel="Напушти"
        secondaryButtonLabel="Остани"
        onPrimaryButtonClick={handleNavigateAway}
        onSecondaryButtonClick={() => setShowUnsavedChangesModal(false)}
      />
      <Formik<FormValues>
        validationSchema={validationSchema}
        initialValues={{
          title: '',
          excerpt: '',
          content: '',
          tags: [],
          status: 'draft',
          image: undefined,
        }}
        onSubmit={handleAddPost}
      >
        {({ values, setFieldValue, touched, errors }: FormikProps<FormValues>) => (
          <Form
            className={styles.form}
            onChange={() => setHasUnsavedChanges(true)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
                e.preventDefault();
              }
            }}
          >
            <div className={styles.actionButtons}>
              <div className={styles.leftButton}>
                <button type="button" onClick={handleBackClick} aria-label="Назад">
                  <i className="bi bi-arrow-left" />
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.inputLabel} htmlFor="title">
                Наслов
              </label>
              <Field
                className={styles.input}
                id="title"
                name="title"
                placeholder="Што најдобро ја опишува статијата?"
              />
              {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.inputLabel} htmlFor="excerpt">
                Краток опис
              </label>
              <Field
                as="textarea"
                rows={3}
                className={styles.input}
                id="excerpt"
                name="excerpt"
                placeholder="Неколку зборови кои резимираат за што е статијата."
              />
              {touched.excerpt && errors.excerpt && (
                <div className={styles.error}>{errors.excerpt}</div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="content-editor" className={styles.inputLabel}>
                Содржина
              </label>
              <TiptapEditor
                id="content-editor"
                editable
                content={values.content}
                onChange={(newContent) => {
                  setFieldValue('content', newContent, true);
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.content && errors.content && (
                <div className={styles.error}>{errors.content}</div>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="tags" className={styles.inputLabel}>
                Тагови
              </label>
              <TagManager
                ref={tagManagerRef}
                selectedTags={selectedTags}
                isAdmin={isAdmin}
                isEditMode
                onTagsChange={(newTags) => {
                  setSelectedTags(newTags);
                  setFieldValue(
                    'tags',
                    newTags.map((tag) => tag.id),
                    true
                  );
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.tags && errors.tags && <div className={styles.error}>{errors.tags}</div>}
            </div>

            <div className={styles.field}>
              <label htmlFor="status" className={styles.inputLabel}>
                Статус
              </label>
              <Field
                id="status"
                name="status"
                component={StatusManager}
                currentStatus={values.status}
                onChange={(newStatus: string) => {
                  setFieldValue('status', newStatus);
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.status && errors.status && (
                <div className={styles.error}>{errors.status}</div>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.inputLabel} htmlFor="image">
                Слика
              </label>
              <ImageUpload
                onImageSelect={(file) => {
                  setFieldValue('image', file);
                  setHasUnsavedChanges(true);
                }}
                error={touched.image && errors.image ? (errors.image as string) : undefined}
              />
            </div>

            <Button
              disabled={isPending}
              buttonText={isPending ? 'Испраќање...' : 'Креирај Статија'}
              buttonClass={['primaryButton']}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PublishArticleForm;
