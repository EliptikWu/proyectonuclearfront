import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const CustomButton = ({ children, isLoading, disabled, fullWidth = true }) => {
  const { t } = useTranslation();
  
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={`bg-blue_button hover:bg-blue_button_hover text-light_text font-medium rounded-lg
        text-base sm:text-lg px-5 py-2.5 sm:py-3 ${fullWidth ? 'w-full' : ''}`}
    >
      {isLoading ? t('common.verification') : children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default CustomButton;
