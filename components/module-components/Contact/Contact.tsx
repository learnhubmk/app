import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './contact.module.scss';

const ContactForm = () => {
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Пораката е успешно испратена');
      resetForm();
    }, 1000);
  };

  return (
    <div className={style.container}>
      <div>
        <h1 className={style.title}>Контактирај нé</h1>
      </div>

      <div>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validate={(values) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = 'Задолжително внесете име';
            }
            if (!values.email) {
              errors.email = 'Задолжително внесете емаил адреса';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Невалидна емаил адреса';
            }
            if (!values.message) {
              errors.message = 'Задолжително внесете порака';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={style.content}>
              <div>
                <Field
                  className={style.contactForm}
                  type="text"
                  name="name"
                  placeholder="Внеси го твоето име"
                />
                <ErrorMessage className={style.contactError} name="name" component="div" />
              </div>
              <div>
                <Field
                  className={style.contactForm}
                  type="email"
                  name="email"
                  placeholder="Внеси ја твојата емаил адреса"
                />
                <ErrorMessage className={style.contactError} name="email" component="div" />
              </div>
              <div>
                <Field
                  className={style.contactForm}
                  as="textarea"
                  name="message"
                  placeholder="Порака"
                />
                <ErrorMessage className={style.contactError} name="message" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Испрати
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactForm;
