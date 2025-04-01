'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { UserRole } from '../../../Types';
import useAddNewPost, { NewPost } from '../../../apis/mutations/blogs/useAddNewPost';
import styles from './PublishArticleForm.module.scss';
import TiptapEditor from '../../editor/TiptapEditor';
import TagManager, { TagManagerRef } from './TagManager';
import Button from '../../reusable-components/button/Button';
import ReusableModal from '../../reusable-components/reusable-modal/ReusableModal';
import StatusManager from './StatusManager';
import { Tag } from '../../reusable-components/_Types';

const PublishArticleForm = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === UserRole.admin;
  const router = useRouter();
  const tagManagerRef = useRef<TagManagerRef>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const addNewPostMutation = useAddNewPost(() => {
    setHasUnsavedChanges(false);
    router.push('/content-panel/blogs');
  });

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
    setHasUnsavedChanges(false); // Reset immediately since we're about to save
    addNewPostMutation.mutate(values);
    tagManagerRef.current?.clearInput();
  };

  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

  const handleNavigateAway = useCallback(() => {
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
        secondaryButtonLabel="Откажи"
        onPrimaryButtonClick={handleNavigateAway}
        onSecondaryButtonClick={() => setShowUnsavedChangesModal(false)}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          title: '',
          excerpt: '',
          content: '',
          tags: [],
          status: '',
        }}
        onSubmit={handleAddPost}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form
            className={styles.form}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('title', e.target.value);
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.inputLabel} htmlFor="excerpt">
                Краток опис
              </label>
              <Field
                className={styles.input}
                id="excerpt"
                name="excerpt"
                placeholder="Неколку зборови кои резимираат за што е статијата."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('excerpt', e.target.value);
                  setHasUnsavedChanges(true);
                }}
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
                  setFieldValue('content', newContent);
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
                    newTags.map((tag) => tag.id)
                  );
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.tags && errors.tags && <div className={styles.error}>{errors.tags}</div>}
            </div>

            <div className={styles.fields}>
              <label htmlFor="status" className={styles.inputLabel}>
                Статус
              </label>
              <Field
                id="status"
                name="status"
                component={StatusManager}
                currentStatus={values.status}
                handleStatusChange={(newStatus: string) => {
                  setFieldValue('status', newStatus);
                  setHasUnsavedChanges(true);
                }}
              />
              {touched.status && errors.status && (
                <div className={styles.error}>{errors.status}</div>
              )}
            </div>

            {addNewPostMutation.isPending ? (
              <Button
                disabled
                buttonText="Испраќање..."
                buttonClass={['primaryButton']}
                type="submit"
              />
            ) : (
              <Button buttonText="Креирај Статија" buttonClass={['primaryButton']} type="submit" />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PublishArticleForm;
