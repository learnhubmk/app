import SignupAndLoginLayout from '../../components/reusable-components/signup-and-login-layout/SignupAndLoginLayout';
import ReusableForm from '../../components/reusable-components/reusable-form/ReusableForm';

const SignupPage = () => {
  return (
    <SignupAndLoginLayout
      welcomeTitle="Добредојдовте на платформата!"
      welcomeSubtitle="Ве молиме пополнете ги податоците подолу за да креирате свој профил."
    >
      <ReusableForm />
    </SignupAndLoginLayout>
  );
};

export default SignupPage;
