import PropTypes from 'prop-types';
import { useField } from 'formik';

const BaseInput = ({ name, label, className = '', inputClassName = '', errorClassName = '', ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-base sm:text-lx font-medium"
        >
          {label}
        </label>
      )}

      <input
        {...field}
        {...props}
        id={name}
        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg text-xl sm:text-sm
          placeholder:opacity-100 focus:placeholder:opacity-0 transition-opacity duration-200
          ${inputClassName}`}
      />

      {meta.touched && meta.error && (
        <span className={`text-xs sm:text-sm mt-1 block text-red-500 ${errorClassName}`}>
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
