"use client";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CustomButton = ({ children, isLoading, disabled, fullWidth = true }) => {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`bg-blue_button hover:bg-blue_button_hover text-light_text font-medium rounded-lg
        text-base sm:text-lg px-5 py-2.5 sm:py-3 ${fullWidth ? 'w-full' : ''} transition-colors duration-200`}
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
};

export default CustomButton;