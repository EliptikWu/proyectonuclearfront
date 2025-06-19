"use client";
import "@i18n/i18n";
import { useRouter } from "next/navigation";
import VisualizarAuditoria from '@/app/components/Auditoria/visualizarAuditoria';
import Alert from '@components/common/alerts/Alert';
import PropTypes from 'prop-types';
import { auditorias } from '@data/auditoria';

export default function AuditoriaPage({ alert = null, handleSubmit = () => {} }) {
  const router = useRouter();
  return (
    
    <div className="min-h-screen w-full bg-principal_container">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <VisualizarAuditoria auditorias={auditorias} />
    </div>
  );
}

AuditoriaPage.propTypes = {
  alert: PropTypes.object,
  handleSubmit: PropTypes.func,
};
