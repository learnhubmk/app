import React from 'react';
import style from './contact.module.scss';
import Circle from './circle';
import ContactForm from './contactForm';

const Contact: React.FC = () => {
  return (
    <div className={style.contactContainer}>
      <div>
        <p className={style.contactTitle}>Контактирај нé</p>
        <Circle />
      </div>
      <div className={style.contactSection}>
        <ContactForm
          inputClassName={style.contactSection}
          buttonClassName={style.button}
          textareaClassName={style.textarea}
        />
      </div>
    </div>
  );
};

export default Contact;
