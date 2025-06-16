import PropTypes from 'prop-types';
import { useField } from 'formik';

const BaseInput = ({ name, label, darkMode = false, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className={`block mb-2 text-base sm:text-lx font-medium ${ 
            darkMode ? 'text-light_text' : 'text-dark_text'
          }`}
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
          ${
            darkMode
              ? 'bg-dark_container text-light_text border-dark_container_charts'
              : 'bg-light_container text-dark_text border-light_container_charts'
          }`}
      />

      {meta.touched && meta.error && (
        <span className="text-red-500 text-xs sm:text-sm mt-1 block">
          {meta.error}
        </span>
      )}
    </div>
  );
};

BaseInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default BaseInput;