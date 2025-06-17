"use client";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import FormContainer from '@components/common/FormContainer';
import TextInput from '@components/common/inputs/TextInput';
import PasswordInput from '@components/common/inputs/PasswordInput';
import CustomButton from '@components/common/CustomButton';
import Logo from '@components/common/Logo';
import Alert from '@components/common/alerts/Alert';
import bookImage from '@assets/images/jpg/books-login.jpg'

const LoginForm = ({ onSubmit, alert }) => {
  const { t } = useTranslation();

  return (
    <FormContainer
      onSubmit={onSubmit}
      initialValues={{ user: '', password: '' }}
    >
      {alert && <Alert type={alert.type} message={alert.message} />}

      <Logo 
        src={bookImage}
        alt="Logo de libros"
        width={300}  
        height={200} 
        className="mx-auto mb-4"
      />

      <TextInput
        name="user"
        autoComplete="username"
        label={t('login.forms.labels.username')}
        placeholder={t('login.forms.placeholders.username')}
      />

      <PasswordInput
        name="password"
        label={t('login.forms.labels.password')}
        placeholder={t('login.forms.placeholders.password')}
      />

      <CustomButton
        className="bg-blue_button_login hover:bg-blue_button_hover_login text-black_text font-medium rounded-lg text-base sm:text-lg px-5 py-2.5 sm:py-3"
      >
        {t('login.forms.button')}
      </CustomButton>

    </FormContainer>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  alert: PropTypes.object,
};

export default LoginForm;