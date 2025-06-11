import LoginForm from '@/components/login/LoginForm';
import userThemeStore from '@store/userThemeStore';
import { useAuth } from '@hooks/useAuth';
import { useLogin } from '@hooks/useLogin';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const LoginPage = () => {
  const { darkMode } = userThemeStore();
  useAuth();
  const { handleSubmit, alert } = useLogin(); 

  return (
    <div className={`h-screen w-screen sm:p-9 sm:pt-48 xl:p-28 ${darkMode ? 'bg-dark_background' : 'bg-light_background'}`}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <LoginForm darkMode={darkMode} onSubmit={handleSubmit} alert={alert} />
    </div>
  );
};

LoginPage.propTypes = {
  darkMode: PropTypes.bool,
};

export default LoginPage;