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
          className="block mb-2 text-sm font-medium text-black"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        {...field}
        {...props}
        className={`w-full h-12 border border-gray-300 rounded-lg px-3 py-2 text-sm
          placeholder-opacity-100 focus:placeholder-opacity-0
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'}
          ${inputClassName}`}
      />

      {/* Contenedor fijo para el error que siempre ocupa espacio */}
      <div className="h-5 mt-1">
        {meta.touched && meta.error && (
          <span className={`text-xs text-red-500 block ${errorClassName}`}>
            {meta.error}
          </span>
        )}
      </div>
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