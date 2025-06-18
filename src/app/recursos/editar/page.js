"use client";
import '../../i18n';

import Header from '@components/common/Navbar';
import EditarRecursos from '@components/resources/EditarRecursos';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const PageEditarRecurso = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="min-h-screen w-screen bg-principal_container flex flex-col">
      <Header />
      <main className="flex-grow">
        {alert && <Alert type={alert.type} message={alert.message} />}
        <EditarRecursos onSubmit={handleSubmit} alert={alert} />
      </main>
    </div>
  );
};

PageEditarRecurso.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default PageEditarRecurso;
