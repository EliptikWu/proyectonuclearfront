'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@components/common/inputs/TextInput';
import Dropdown from '@/app/components/common/inputs/Dropdown';
import FormContainer from '@components/common/FormContainer';
import CustomButton from '@components/common/CustomButton';
import Alert from '@components/common/alerts/Alert';

const EditarRecursos = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recursoId = searchParams.get('id');

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Validaciones
  const validationSchema = Yup.object({
    nombreTic: Yup.string().required('El nombre del TIC es requerido'),
    descripcion: Yup.string().required('La descripción es requerida'),
    disponible: Yup.string().required('Debe seleccionar si está disponible'),
    cantidad: Yup.number()
      .required('La cantidad es requerida')
      .min(1, 'Debe ser al menos 1')
      .integer('Debe ser un número entero'),
  });

  // Cargar datos del recurso
  useEffect(() => {
    const fetchRecurso = async () => {
      try {
        const response = await fetch(`/api/recursos/${recursoId}`);
        if (!response.ok) throw new Error('No se pudo cargar el recurso');
        const data = await response.json();

        setInitialValues({
          nombreTic: data.nombre || '',
          descripcion: data.descripcion || '',
          disponible: data.estado?.toLowerCase() === 'disponible' ? 'si' : 'no',
          cantidad: data.cantidad || 1,
        });
      } catch (error) {
        console.error(error);
        setAlert({
          show: true,
          type: 'error',
          message: 'Error al cargar los datos del recurso.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (recursoId) fetchRecurso();
  }, [recursoId]);

  // Guardar cambios
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`/api/recursos/${recursoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: values.nombreTic,
          descripcion: values.descripcion,
          estado: values.disponible === 'si' ? 'DISPONIBLE' : 'NO DISPONIBLE',
          cantidad: values.cantidad,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar el recurso');

      setAlert({
        show: true,
        type: 'success',
        message: 'Material TIC actualizado correctamente',
      });
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Error al actualizar el recurso',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  // Mientras carga
  if (loading || !initialValues) {
    return <p className="text-center py-12 text-gray-600">Cargando recurso...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-principal_container">
      {/* Encabezado */}
      <div className="flex items-center mb-6 px-12 py-8">
        <ChevronLeft
          className="w-6 h-6 text-black_text mr-2 cursor-pointer"
          onClick={() => router.push('/recursos/visualizar')}
        />
        <h2 className="text-2xl font-bold text-gray-800">Editar Material TIC</h2>
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
            Guardar Cambios
          </CustomButton>
        </FormContainer>

        {alert.show && (
          <div className="mt-4">
            <Alert
              type={alert.type}
              message={alert.message}
              onConfirm={handleCloseAlert}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarRecursos;
