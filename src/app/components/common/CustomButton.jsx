"use client";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CustomButton = ({ 
  children, 
  isLoading, 
  disabled, 
  fullWidth = true, 
  className = '' 
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`${fullWidth ? 'w-full' : ''} ${className} transition-colors duration-200`}
    >
      {isLoading ? t('common.verification') : children}
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string, // aquí definimos el prop adicional
};

export default CustomButton;
