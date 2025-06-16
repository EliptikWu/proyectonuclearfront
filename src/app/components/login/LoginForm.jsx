"use client";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import FormContainer from '@components/common/FormContainer';
import TextInput from '@components/common/inputs/TextInput';
import PasswordInput from '@components/common/inputs/PasswordInput';
import CustomButton from '@components/common/CustomButton';
import Logo from '@components/common/Logo';
import Alert from '@components/common/alerts/Alert';

const LoginForm = ({ onSubmit, alert, darkMode = false }) => {
  const { t } = useTranslation();

  return (
    <FormContainer
      darkMode={darkMode}
      onSubmit={onSubmit}
      initialValues={{ user: '', password: '' }}
    >
      {alert && <Alert type={alert.type} message={alert.message} />}

      <Logo 
        src="/src/assets/images/svg/logo-sm.svg" 
        alt={t('login.altTexts.logoAlt')} 
      />

      <TextInput
        name="user"
        autoComplete="username"
        label={t('login.forms.labels.username')}
        placeholder={t('login.forms.placeholders.username')}
        darkMode={darkMode}
      />

      <PasswordInput
        name="password"
        label={t('login.forms.labels.password')}
        placeholder={t('login.forms.placeholders.password')}
        darkMode={darkMode}
      />

      <CustomButton>
        {t('login.forms.button')}
      </CustomButton>
    </FormContainer>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  alert: PropTypes.object,
  darkMode: PropTypes.bool,
};

export default LoginForm;