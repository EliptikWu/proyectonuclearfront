import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
  

const FormContainer = ({ 
  children, 
  darkMode = false, 
  onSubmit, 
  initialValues,
  validationSchema
}) => (
  <div
    className={`w-full mx-auto bg-opacity-60 rounded-2xl shadow-lg p-6
      ${darkMode ? 'bg-dark_container' : 'bg-light_container'}
      sm:max-w-md md:max-w-lg lg:max-w-xl`}
  >
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-6">
        {children}
      </Form>
    </Formik>
  </div>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object
};

export default FormContainer;