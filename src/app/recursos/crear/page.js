"use client";
import '../../i18n';

import Header from '@components/common/Navbar';
import CrearRecursos from '@components/resources/CrearRecursos';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';

const PageCrearRecurso = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="min-h-screen w-screen bg-principal_container flex flex-col">
      <Header />
      <main className="flex-grow">
        {alert && <Alert type={alert.type} message={alert.message} />}
        <CrearRecursos onSubmit={handleSubmit} alert={alert} />
      </main>
    </div>
  );
};

PageCrearRecurso.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default PageCrearRecurso;
