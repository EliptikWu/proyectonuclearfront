"use client";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import FormContainer from '@components/common/FormContainer';
import TextInput from '@/app/components/common/inputs/TextInputFormik';
import PasswordInput from '@components/common/inputs/PasswordInput';
import CustomButton from '@components/common/CustomButton';
import Logo from '@components/common/Logo';
import Alert from '@components/common/alerts/Alert';
import bookImage from '@assets/images/jpg/books-login.jpg';
import logoHumboldt from '@assets/images/png/humboldt-logo.png';

const LoginForm = ({ onSubmit, alert }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen relative overflow-hidden bg-principal_container">
      
      {/* Imagen superpuesta con gradiente rotado */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-visible">
        <div
          className="absolute top-0 left-0 w-[140%] h-full bg-center bg-cover transform translate-x-[-20%] z-20"
          style={{
            backgroundImage: `url(${bookImage.src})`,
            clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
          }}
        >
          {/* Gradiente con la misma forma y rotación */}
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
              clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
            }}
          ></div>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative z-10">
        <div className="w-full max-w-md self-center">

          {alert && <Alert type={alert.type} message={alert.message} />}

          <div className="flex justify-center mb-4">
            <Logo 
              src={logoHumboldt}
              alt={t('login.logoAlt')}
              width={280}
              height={160}
              className="max-w-xs"
            />
          </div>

          <FormContainer
            onSubmit={onSubmit}
            initialValues={{ user: '', password: '' }}
          >
            <TextInput
              name="user"
              autoComplete="username"
              label={<span className="text-black_text">{t('login.forms.labels.username')}</span>}
              placeholder={t('login.forms.placeholders.username')}
              inputClassName="px-4 py-3 border-border_button focus:ring-blue_button_login_hover focus:border-blue_button_login text-black_text"
            />

            <PasswordInput
              name="password"
              label={<span className="text-black_text">{t('login.forms.labels.username')}</span>}
              placeholder={t('login.forms.placeholders.password')}
              inputClassName="px-4 py-3 border-border_button focus:ring-blue_button_login_hover focus:border-blue_button_login text-black_text"
            />


            <div className="text-right -mt-2">
              <a 
                href="#" 
                className="text-sm text-blue_button_login hover:text-blue_button_login_hover transition-colors"
              >
                {t('login.forms.forgotPassword')}
              </a>
            </div>

            <CustomButton
              className="bg-blue_button_login hover:bg-blue_button_login_hover text-white font-medium rounded-lg text-lg px-5 py-3 transition-colors duration-200"
            >
              {t('login.forms.button')}
            </CustomButton>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  alert: PropTypes.object,
};

export default LoginForm;
