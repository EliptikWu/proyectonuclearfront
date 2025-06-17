import PropTypes from 'prop-types';
import { useField } from 'formik';

const BaseInput = ({
  name,
  label,
  className = '',
  inputClassName = '',
  errorClassName = '',
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm sm:text-base font-medium text-black"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        {...field}
        {...props}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base
          placeholder-opacity-100 focus:placeholder-opacity-0
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          ${inputClassName}`}
      />

      {meta.touched && meta.error && (
        <span className={`mt-1 text-xs sm:text-sm text-red-500 block ${errorClassName}`}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

BaseInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  errorClassName: PropTypes.string,
};

export default BaseInput;
