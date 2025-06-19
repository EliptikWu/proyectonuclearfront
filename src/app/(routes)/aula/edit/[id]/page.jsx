'use client';

import "@i18n/i18n";
import { Suspense } from 'react';
import Header from '@components/common/Navbar';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const LazyEditarAula = dynamic(() => import('@/app/components/Classroom/EditarAula'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Cargando editor de aula...</div>,
});

const PageEditarAula = ({ alert = null, handleSubmit = () => {} }) => {
  return (
    <div className="min-h-screen w-screen bg-principal_container flex flex-col">
      <Header />
      <main className="flex-grow">
        {alert && <Alert type={alert.type} message={alert.message} />}
        <Suspense fallback={<div className="text-center py-8">Cargando aula...</div>}>
          <LazyEditarAula onSubmit={handleSubmit} alert={alert} />
        </Suspense>
      </main>
    </div>
  );
};

PageEditarAula.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default PageEditarAula;
