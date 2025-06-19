"use client";
import "@/i18n";

import EditarForm from '@/app/components/ClassroomAssignment/EditarForm';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const EditarPage = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="h-screen w-screen bg-principal_container">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <EditarForm onSubmit={handleSubmit} alert={alert} />
    </div>
  );
};

EditarPage.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default EditarPage;