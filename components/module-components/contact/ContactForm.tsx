'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import Turnstile from 'react-turnstile';
import { ContactFormData, submitContactForm } from './SubmitContactForm';
import Button from '../../reusable-components/button/Button';
import TextInput from '../../reusable-components/text-input/TextInput';
import TextArea from '../../reusable-components/text-area/TextArea';
import { fullNameRegexValidation, emailRegexValidation } from './regexValidation';

const ContactForm = () => {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { username: '', email: '', message: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, '*Минимум број на каратктери 2!')
        .max(75, '*Максимум број на каратктери 75!')
        .matches(fullNameRegexValidation, '*Невалидно име')
        .required('*Задолжително внесете име'),
      email: Yup.string()
        .email('*Невалидна емаил адреса!')
        .required('*Задолжително внесете емаил адреса')
        .matches(emailRegexValidation, '*Погрешен емаил формат'),
      message: Yup.string()
        .min(20, '*Минимум број на каратктери 20!')
        .max(500, '*Максимум број на каратктери 500!')
        .required('*Пораката е задолжителна'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!turnstileToken) {
        return;
      }

      try {
        const formData: ContactFormData = {
          name: values.username,
          email: values.email,
          message: values.message,
          cfTurnstileResponse: turnstileToken,
        };

        const response = await submitContactForm(formData);
        if (response) {
          toast.success(response);
          resetForm();
        } else {
          toast.error(response);
        }
      } catch (error) {
        toast.error('Грешка');
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          placeholder="Внесете го вашето име"
          label="Име и презиме"
          name="username"
          type="text"
          field="username"
          formik={formik}
          isRequired
        />
        <TextInput
          placeholder="Внесете ја вашата електронска пошта"
          label="Електронска Пошта"
          name="email"
          type="email"
          field="email"
          formik={formik}
          isRequired
        />
        <TextArea
          placeholder="Напиши ја твојата порака овде"
          label="Порака"
          name="message"
          field="message"
          formik={formik}
          isRequired
        />

        <Button
          href=""
          type="submit"
          buttonClass={['primaryButton', 'contactButton']}
          buttonText="Испрати"
        />
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE || ''}
          onVerify={(token) => setTurnstileToken(token)}
          theme="light"
          size="invisible"
        />
      </form>
    </div>
  );
};

export default ContactForm;
