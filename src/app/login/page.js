"use client";
import LoginForm from '@components/login/LoginForm';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const LoginPage = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="h-screen w-screen sm:p-9 sm:pt-48 xl:p-28 bg-principal_container">
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