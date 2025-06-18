import React from 'react';
import * as Yup from 'yup';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import TextInput from '@components/common/inputs/TextInput';
import Dropdown from '@/components/common/Dropdown';
import FormContainer from '@components/common/FormContainer';
import CustomButton from '@components/common/CustomButton';
import Alert from '@components/common/alerts/Alert';

const CrearRecursos = ({ alert = null, onSubmit = () => {} }) => {
  const router = useRouter();
  const [localAlert, setLocalAlert] = React.useState(alert || { show: false, type: '', message: '' });

  const initialValues = {
    nombreTic: '',
    descripcion: '',
    disponible: '',
    cantidad: '',
  };

  const validationSchema = Yup.object({
    nombreTic: Yup.string().required('El nombre del TIC es requerido'),
    descripcion: Yup.string().required('La descripción es requerida'),
    disponible: Yup.string().required('Debe seleccionar si está disponible'),
    cantidad: Yup.number()
      .required('La cantidad es requerida')
      .min(1, 'Debe ser al menos 1')
      .integer('Debe ser un número entero'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Datos enviados:', values);
    setLocalAlert({
      show: true,
      type: 'success',
      message: 'Material TIC registrado correctamente',
    });
    onSubmit(values);
    setSubmitting(false);
  };

  const handleCloseAlert = () => {
    setLocalAlert({ show: false, type: '', message: '' });
  };

  return (
    <div className="min-h-screen w-full bg-principal_container">
      {/* Encabezado con ícono y título */}
      <div className="flex items-center mb-6 px-12 py-8">
        <ChevronLeft
        className="w-6 h-6 text-black_text mr-2 cursor-pointer"
        onClick={() => router.push('/recursos/visualizar')}
        />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Material TIC</h2>
      </div>

      {/* Formulario */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <FormContainer
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              name="nombreTic"
              label="Nombre del TIC"
              placeholder="Ej: Videobeam"
              inputClassName="w-full text-black"
            />
            <TextInput
              name="descripcion"
              label="Descripción"
              placeholder="Descripción del recurso TIC"
              inputClassName="w-full text-black"
            />
            <Dropdown
              name="disponible"
              label="¿Está disponible?"
              options={[
                { label: 'Sí', value: 'si' },
                { label: 'No', value: 'no' },
              ]}
              placeholderOption="Seleccione una opción"
              selectClassName="w-full text-black"
            />
            <TextInput
              name="cantidad"
              label="Cantidad"
              type="number"
              placeholder="Ej: 5"
              inputClassName="w-full text-black"
            />
          </div>

          <CustomButton type="submit" className="mt-6 w-full bg-indigo-600 text-white">
            Guardar Material TIC
          </CustomButton>
        </FormContainer>

        {localAlert.show && (
          <div className="mt-4">
            <Alert type={localAlert.type} message={localAlert.message} onConfirm={handleCloseAlert} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearRecursos;
