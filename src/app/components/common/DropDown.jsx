import PropTypes from 'prop-types';
import { useField } from 'formik';

const Dropdown = ({
  name,
  label,
  options,
  className = '',
  selectClassName = '',
  errorClassName = '',
  placeholderOption = 'Selecciona una opción',
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
      
      <select
        id={name}
        {...field}
        {...props}
        className={`w-full h-12 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'}
          ${selectClassName}`}
      >
        <option value="">{placeholderOption}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      
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

DropdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  placeholderOption: PropTypes.string,
};

export default Dropdown;