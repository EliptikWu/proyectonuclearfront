import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Alert = ({ 
  type = 'info', 
  message, 
  onConfirm, 
  onCancel, 
  showCancel = false, 
  confirmText, 
  cancelText 
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!message) return;

    const alertTypes = {
      success: {
        title: t('alerts.success.title', 'Success'),
        icon: 'success',
      },
      error: {
        title: t('alerts.error.title', 'Error'),
        icon: 'error',
      },
      warning: {
        title: t('alerts.warning.title', 'Warning'),
        icon: 'warning',
      },
      info: {
        title: t('alerts.info.title', 'Info'),
        icon: 'info',
      },
    };

    const alertConfig = alertTypes[type] || alertTypes.info;

    Swal.fire({
      ...alertConfig,
      text: message,
      confirmButtonText: confirmText || t('alerts.actions.understood', 'OK'),
      showCancelButton: showCancel,
      cancelButtonText: cancelText || t('alerts.actions.cancel', 'Cancel'),
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
      if (result.dismiss === Swal.DismissReason.cancel && onCancel) onCancel();
    });
  }, [type, message, onConfirm, onCancel, showCancel, confirmText, cancelText, t]);

  return null;
};

export default Alert;
