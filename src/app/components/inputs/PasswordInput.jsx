import { useState } from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';


const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <BaseInput
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-[calc(50%+6px)] right-6 transform -translate-y-1/2"
      >
      </button>
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default PasswordInput;