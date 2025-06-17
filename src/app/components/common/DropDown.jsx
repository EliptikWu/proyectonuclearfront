import PropTypes from 'prop-types';
import { useField } from 'formik';

const DropdownInput = ({
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
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={name}
        {...field}
        {...props}
        className={`w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-principal_purple ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        } ${selectClassName}`}
      >
        <option value="">{placeholderOption}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className={`text-red-500 text-xs mt-1 ${errorClassName}`}>{meta.error}</div>
      )}
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

export default DropdownInput;
