import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
  

const FormContainer = ({ 
  children, 
  onSubmit, 
  initialValues,
  validationSchema
}) => (
  <div
    className={`w-full mx-auto bg-opacity-60 rounded-2xl shadow-lg p-6`}
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
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object
};

export default FormContainer;