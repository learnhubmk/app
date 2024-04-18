'use client';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './contact.module.scss';
import { ContactFormData, submitContactForm } from './SubmitContactForm';

interface ContactFormProps {
  inputClassName?: string;
  textareaClassName?: string;
  buttonClassName?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  inputClassName,
  buttonClassName,
  textareaClassName,
}) => {
  const contactEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formik = useFormik({
    initialValues: { username: '', email: '', message: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[\u0400-\u04FFа-џA-Za-z-]+$/, 'Невалидно име')
        .required('Задолжително внесете име'),
      email: Yup.string()
        .email('Невалидна емаил адреса!')
        .required('Задолжително внесете емаил адреса')
        .matches(contactEmail, 'Погрешен емаил формат'),
      message: Yup.string().required('Пораката е задолжителна'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData: ContactFormData = {
          first_name: values.username,
          last_name: '',
          email: values.email,
          subject: '',
          message: values.message,
          'cf-turnstile-response': '',
        };

        const response = await submitContactForm(formData);

        if (response.status === 200) {
          toast.success('Успешно испратено');
        } else {
          toast.error('Грешка');
        }
      } catch (error) {
        toast.error('Грешка');
      }

      resetForm();
    },
  });
  return (
    <div>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Внесете го Вашето име"
          className={`${inputClassName} ${style.focusableBorder} ${
            formik.touched.username && formik.errors.username ? style.errorInput : ''
          }`}
          value={formik.values.username}
          onChange={formik.handleChange}
          name="username"
        />
        {formik.touched.username && formik.errors.username && (
          <div className={style.contactError}>{formik.errors.username}</div>
        )}
        <input
          type="email"
          placeholder="Внесете ја Вашата емаил адреса"
          className={`${inputClassName} ${style.focusableBorder} ${
            formik.touched.email && formik.errors.email ? style.errorInput : style.focusableBorder
          }`}
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className={style.contactError}>{formik.errors.email}</div>
        )}
        <textarea
          placeholder="Порака"
          className={`${textareaClassName} ${style.focusableBorder} ${
            formik.touched.message && formik.errors.message ? style.errorInput : ''
          }`}
          value={formik.values.message}
          onChange={formik.handleChange}
          name="message"
        />
        {formik.touched.message && formik.errors.message && (
          <div className={style.contactError}>{formik.errors.message}</div>
        )}

        <button type="submit" className={`${buttonClassName} ${style.contactButton}`}>
          <span> Испрати </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="15"
            viewBox="0 0 15 13"
            fill="none"
            transform="scale(1.3)"
          >
            <path
              d="M14.6015 7.25735C14.5981 7.34463 14.5692 7.429 14.5183 7.49998C14.4674 7.57096 14.3968 7.62543 14.3152 7.65661L1.27898 12.6724C1.16415 12.7165 1.03937 12.7282 0.918377 12.706C0.797382 12.6838 0.68486 12.6286 0.593196 12.5466C0.501532 12.4646 0.434278 12.3588 0.398837 12.241C0.363397 12.1232 0.361143 11.998 0.392324 11.8789L1.73101 6.77367L0.78057 1.58236C0.758223 1.46122 0.769777 1.33627 0.813956 1.22127C0.858134 1.10628 0.93322 1.00573 1.03093 0.930704C1.12864 0.85568 1.24517 0.809104 1.36767 0.796116C1.49016 0.783127 1.61386 0.804232 1.72512 0.8571L14.3454 6.83833C14.4244 6.87555 14.4908 6.93517 14.5362 7.00977C14.5816 7.08437 14.6041 7.17067 14.6008 7.25796L14.6015 7.25735ZM2.52683 7.24892L1.36484 11.6834L11.968 7.60373L2.52683 7.24892ZM12.0016 6.71303L1.73565 1.84913L2.56168 6.35827L12.0016 6.71303Z"
              fill="black"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
