'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import { ChevronLeft } from 'lucide-react';

import TextInput from '@/app/components/common/inputs/TextInputFormik';
import Dropdown from '@/app/components/common/inputs/Dropdown';
import FormContainer from '@components/common/FormContainer';
import CustomButton from '@components/common/CustomButton';
import Alert from '@components/common/alerts/Alert';

const EditarAula = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const aulaId = searchParams.get('id');

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre del aula es requerido'),
    capacidad: Yup.number().required('La capacidad es requerida').min(1).integer(),
    tipo: Yup.string().required('El tipo es requerido'),
    estado: Yup.string().required('El estado es requerido'),
    descripcion: Yup.string().nullable(),
  });

  useEffect(() => {
    const fetchAula = async () => {
      try {
        const res = await fetch(`/api/aulas/${aulaId}`);
        if (!res.ok) throw new Error('No se pudo cargar el aula');
        const data = await res.json();

        setInitialValues({
          nombre: data.nombre || '',
          capacidad: data.capacidad || 0,
          tipo: data.tipo || '',
          estado: data.estado || '',
          descripcion: data.descripcion || '',
        });
      } catch (error) {
        console.error(error);
        setAlert({
          show: true,
          type: 'error',
          message: 'Error al cargar los datos del aula.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (aulaId) fetchAula();
  }, [aulaId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`/api/aulas/${aulaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Error al actualizar el aula');

      setAlert({
        show: true,
        type: 'success',
        message: 'Aula actualizada correctamente',
      });
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Error al actualizar el aula',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  if (loading || !initialValues) {
    return <p className="text-center py-12 text-gray-600">Cargando aula...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-principal_container">
      <div className="flex items-center mb-6 px-12 py-8">
        <ChevronLeft
          className="w-6 h-6 text-black_text mr-2 cursor-pointer"
          onClick={() => router.push('/aula/view')}
        />
        <h2 className="text-2xl font-bold text-gray-800">Editar Aula</h2>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <FormContainer
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4">
            <TextInput name="nombre" label="Nombre del Aula" placeholder="Ej: Aula 101" />
            <TextInput name="descripcion" label="Descripción" placeholder="Ej: Aula amplia y ventilada" />
            <TextInput name="capacidad" label="Capacidad" type="number" placeholder="Ej: 30" />
            <Dropdown
              name="tipo"
              label="Tipo"
              options={[
                { label: 'TEÓRICA', value: 'TEORICA' },
                { label: 'HIBRIDA', value: 'HIBRIDA' },
              ]}
              placeholderOption="Seleccione un tipo"
            />
            <Dropdown
              name="estado"
              label="Estado"
              options={[
                { label: 'LIBRE', value: 'LIBRE' },
                { label: 'INHABILITADA', value: 'INHABILITADA' },
              ]}
              placeholderOption="Seleccione un estado"
            />
          </div>

          <CustomButton type="submit" className="mt-6 w-full bg-indigo-600 text-white">
            Guardar Cambios
          </CustomButton>
        </FormContainer>

        {alert.show && (
          <div className="mt-4">
            <Alert type={alert.type} message={alert.message} onConfirm={handleCloseAlert} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarAula;
