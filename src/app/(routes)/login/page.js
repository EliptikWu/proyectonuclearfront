"use client";
import "@i18n/i18n";
import LoginForm from '@components/Login/LoginForm';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const LoginPage = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="h-screen w-screen bg-principal_container">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <LoginForm onSubmit={handleSubmit} alert={alert} />
    </div>
  );
};

LoginPage.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default LoginPage;