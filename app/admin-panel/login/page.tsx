import React from 'react';

import SignupAndLoginLayout from '../../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import AdminPanelLoginContainer from '../../../components/reusable-components/login-form/AdminPanelLoginContainer';

const AdminLogin = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Admin Login Panel"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да се најавите."
    >
      <AdminPanelLoginContainer />
    </SignupAndLoginLayout>
  );
};

export default AdminLogin;
