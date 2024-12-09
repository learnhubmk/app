import React from 'react';

import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import ContentPanelLoginContainer from '../../../components/reusable-components/login-form/ContentPanelLoginContainer';

const Login = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте назад!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <ContentPanelLoginContainer />
    </SignupAndLoginLayout>
  );
};

export default Login;
