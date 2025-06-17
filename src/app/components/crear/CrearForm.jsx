import React, { useState } from 'react';
import { ChevronLeft, Calendar, Users, Monitor, Thermometer, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import Navbar from '@components/common/Navbar';
import FormContainer from '@components/common/FormContainer';
import DropdownInput from '@components/common/Dropdown';
import TextInput from '@components/common/inputs/TextInput';
import CustomButton from '@components/common/CustomButton';

const ClassroomAssignmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ticMaterials, setTicMaterials] = useState({
    videobeam: false,
    airConditioning: false
  });
  const [newTask, setNewTask] = useState('');
  const [formValues, setFormValues] = useState({
    professor: '',
    capacity: '',
    sede: '',
    classroom: '',
    subject: '',
    classType: '',
    timeSlot: ''
  });

  const professorsOptions = [
    { value: 'juan_perez', label: 'Dr. Juan Pérez' },
    { value: 'maria_gonzalez', label: 'Dra. María González' },
    { value: 'carlos_rodriguez', label: 'Ing. Carlos Rodríguez' }
  ];

  const sedesOptions = [
    { value: '3d2', label: '3D2' },
    { value: 'sede_principal', label: 'Sede Principal' },
    { value: 'sede_norte', label: 'Sede Norte' }
  ];

  const classTypesOptions = [
    { value: 'teorica', label: 'Teórica' },
    { value: 'practica', label: 'Práctica' },
    { value: 'laboratorio', label: 'Laboratorio' }
  ];

  const subjectsOptions = [
    { value: 'ingenieria_software_iv', label: 'Ingeniería de Software IV' },
    { value: 'bases_datos', label: 'Bases de Datos' },
    { value: 'programacion_web', label: 'Programación Web' }
  ];

  const timeSlotOptions = [
    { value: '7:00-9:00', label: '7:00 a.m - 9:00 a.m' },
    { value: '9:00-11:00', label: '9:00 a.m - 11:00 a.m' },
    { value: '11:00-13:00', label: '11:00 a.m - 1:00 p.m' },
    { value: '13:00-15:00', label: '1:00 p.m - 3:00 p.m' },
    { value: '15:00-17:00', label: '3:00 p.m - 5:00 p.m' },
    { value: '17:00-19:00', label: '5:00 p.m - 7:00 p.m' },
    { value: '19:00-21:00', label: '7:00 p.m - 9:00 p.m' }
  ];

  const initialValues = {
    professor: '',
    capacity: '',
    sede: '',
    classroom: '',
    subject: '',
    classType: '',
    timeSlot: ''
  };

  const validationSchema = Yup.object({
    professor: Yup.string().required('Profesor es requerido'),
    capacity: Yup.number()
      .required('Capacidad es requerida')
      .positive('Debe ser un número positivo')
      .integer('Debe ser un número entero'),
    sede: Yup.string().required('Sede es requerida'),
    classroom: Yup.string().required('Salón es requerido'),
    subject: Yup.string().required('Materia es requerida'),
    classType: Yup.string().required('Tipo de aula es requerido'),
    timeSlot: Yup.string().required('Horario es requerido'),
  });

  const addTicMaterial = () => {
    if (newTask.trim()) {
      console.log('Adding new TIC material:', newTask);
      setNewTask('');
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const assignmentData = {
      ...values,
      date: selectedDate,
      ticMaterials,
      newTask
    };
    console.log('Assignment data:', assignmentData);
    alert('Asignación creada exitosamente');
    setSubmitting(false);
  };

  const handleFormChange = (values) => {
    setFormValues(values);
  };

  const getLabelByValue = (options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
<div className="min-h-screen bg-gray-50">
      <Navbar />
       <div className="px-12 pt-6">
        <div className="flex items-center">
        <ChevronLeft className="w-6 h-6 text-gray-600 mr-2 cursor-pointer" />
        <h1 className="text-2xl font-bold text-gray-800">Crear nueva asignación de aula</h1>
    </div>
  </div>
      <div className="flex gap-16 px-12 py-6">
        {/* Formulario + Calendario */}
        <div className="flex-[3] bg-indigo-900 rounded-lg p-6 text-white">
          <div className="flex items-center mb-6">
            <ChevronLeft className="w-6 h-6 text-gray-200 mr-2 cursor-pointer" />
            <h1 className="text-2xl font-bold text-white">Crear nueva asignación de aula</h1>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* Calendario - Primera columna */}
            <div className="col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Seleccionar Fecha</h3>
                <Calendar className="w-5 h-5" />
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                className="w-full"
                calendarClassName="border-indigo-700 bg-indigo-800 rounded-lg"
                dayClassName={() => "text-white hover:bg-indigo-700"}
                monthClassName={() => "text-white"}
                weekDayClassName={() => "text-indigo-300"}
              />
            </div>

            {/* Formulario - Tres columnas restantes */}
            <div className="col-span-3">
              <FormContainer
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                onChange={handleFormChange}
              >
                {/* Primera fila - 2 campos */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <DropdownInput 
                    name="professor" 
                    label="Profesor" 
                    options={professorsOptions} 
                    placeholderOption="Ingrese el nombre del profesor *" 
                    selectClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                  <TextInput 
                    name="capacity" 
                    label="Capacidad de aula" 
                    placeholder="Ingrese la capacidad del aula *" 
                    inputClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white placeholder-indigo-300 focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Segunda fila - 2 campos */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <DropdownInput 
                    name="sede" 
                    label="Sede" 
                    options={sedesOptions} 
                    placeholderOption="Ingrese la sede *" 
                    selectClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                  <DropdownInput 
                    name="classType" 
                    label="Tipo de aula" 
                    options={classTypesOptions} 
                    placeholderOption="Ingrese el tipo de aula *" 
                    selectClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Tercera fila - 2 campos */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <TextInput 
                    name="classroom" 
                    label="Salón" 
                    placeholder="3D2 *" 
                    inputClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white placeholder-indigo-300 focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                  <DropdownInput 
                    name="subject" 
                    label="Materia" 
                    options={subjectsOptions} 
                    placeholderOption="Ingeniería de Software IV *" 
                    selectClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Cuarta fila - 1 campo ancho */}
                <div className="mb-6">
                  <DropdownInput 
                    name="timeSlot" 
                    label="Hora de ingreso y salida" 
                    options={timeSlotOptions} 
                    placeholderOption="Ingrese el horario *" 
                    selectClassName="w-full h-12 bg-indigo-800 border-indigo-700 text-white focus:ring-indigo-500 px-4" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Material TIC */}
                <div className="mb-6">
                  <div className="bg-indigo-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-lg">Material TIC</h4>
                      <button type="button" className="text-indigo-300 text-sm hover:text-white underline">
                        View
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <label className="flex items-center p-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.videobeam} 
                          onChange={(e) => setTicMaterials({ ...ticMaterials, videobeam: e.target.checked })} 
                          className="mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded" 
                        />
                        <Monitor className="w-5 h-5 mr-3 text-indigo-300" />
                        <span className="text-sm font-medium">Videobeam</span>
                      </label>
                      <label className="flex items-center p-3 bg-indigo-700 rounded-lg hover:bg-indigo-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.airConditioning} 
                          onChange={(e) => setTicMaterials({ ...ticMaterials, airConditioning: e.target.checked })} 
                          className="mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded" 
                        />
                        <Thermometer className="w-5 h-5 mr-3 text-indigo-300" />
                        <span className="text-sm font-medium">Aire acondicionador</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Enter new task" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        className="flex-1 h-12 px-4 border border-indigo-600 bg-indigo-700 text-white placeholder-indigo-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      />
                      <button 
                        type="button" 
                        onClick={addTicMaterial} 
                        className="px-6 h-12 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 flex items-center justify-center transition-colors"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>

                <CustomButton className="w-full h-14 bg-indigo-700 hover:bg-indigo-600 text-white disabled:opacity-50 font-semibold text-lg rounded-lg transition-colors">
                  Asignar nueva sala
                </CustomButton>
              </FormContainer>
            </div>
          </div>
        </div>

        {/* Previsualización */}
        <div className="flex-[1] mx-4">
          <div className="w-full bg-white p-8 shadow-lg rounded-lg">
            <div className="bg-indigo-900 text-white p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-1">PREVISUALIZACIÓN DE LA CLASE</h3>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium text-gray-800">Clase Principal</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{formValues.timeSlot ? getLabelByValue(timeSlotOptions, formValues.timeSlot) : 'Horario por asignar'}</p>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{formValues.professor ? getLabelByValue(professorsOptions, formValues.professor) : 'Profesor por asignar'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{formValues.sede ? getLabelByValue(sedesOptions, formValues.sede) : 'Sede por asignar'}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.classroom || 'Aula por asignar'}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.subject ? getLabelByValue(subjectsOptions, formValues.subject) : 'Materia por asignar'}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.capacity ? `Capacidad: ${formValues.capacity}` : 'Capacidad por definir'}</p>
                <p className="text-sm text-gray-600">{formValues.classType ? getLabelByValue(classTypesOptions, formValues.classType) : 'Tipo de aula por definir'}</p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium text-gray-800">Material TIC</span>
                </div>
                {ticMaterials.videobeam && (
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span>Videobeam</span>
                  </div>
                )}
                {ticMaterials.airConditioning && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Thermometer className="w-4 h-4 mr-2" />
                    <span>Aire acondicionador</span>
                  </div>
                )}
                {!ticMaterials.videobeam && !ticMaterials.airConditioning && (
                  <p className="text-sm text-gray-600">Sin material TIC seleccionado</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAssignmentForm;
