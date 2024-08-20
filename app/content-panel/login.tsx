import React from 'react';
import LoginForm from '../../components/reusable-components/login-form/LoginForm';
import { submitLoginForm } from '../../components/reusable-components/login-form/SubmitLoginForm';

const ContentPanelLoginPage = () => {
  return <LoginForm submitLoginForm={submitLoginForm} />;
};

export default ContentPanelLoginPage;
