import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

const TextInput = (props) => {
  return <BaseInput {...props} type="text" />;
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default TextInput;