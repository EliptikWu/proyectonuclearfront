"use client";
import '../../i18n'; 

import CrearForm from '@components/crear/CrearForm';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const CrearPage = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="h-screen w-screen bg-principal_container">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <CrearForm onSubmit={handleSubmit} alert={alert} />
    </div>
  );
};

CrearPage.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default CrearPage;