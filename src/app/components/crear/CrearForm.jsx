import React, { useState } from 'react';
import { ChevronLeft, Calendar, Users, Monitor, Thermometer, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import Navbar from '@components/common/Navbar';
import FormContainer from '@components/common/FormContainer';
import DropdownInput from '@components/common/Dropdown';
import TextInput from '@components/common/inputs/TextInput';
import CustomButton from '@components/common/CustomButton'
import { useTranslation } from 'react-i18next';

const ClassroomAssignmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation();
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
    professor: Yup.string().required(t('validation.professorRequired')),
    capacity: Yup.number()
      .required(t('validation.capacityRequired'))
      .positive(t('validation.capacityPositive'))
      .integer(t('validation.capacityInteger')),
    sede: Yup.string().required(t('validation.sedeRequired')),
    classroom: Yup.string().required(t('validation.classroomRequired')),
    subject: Yup.string().required(t('validation.subjectRequired')),
    classType: Yup.string().required(t('validation.classTypeRequired')),
    timeSlot: Yup.string().required(t('validation.timeSlotRequired')),
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
    alert(t('classroomAssignment.assignmentCreated'));
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
          <ChevronLeft className="w-6 h-6 text-black_text mr-2 cursor-pointer" />
          <h1 className="text-2xl font-bold text-black_text">{t('classroomAssignment.title')}</h1>
        </div>
      </div>
      <div className="flex gap-16 px-12 py-6">
        {/* Formulario + Calendario */}
        <div className="flex-[3] bg-principal_purple rounded-lg p-6">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* Calendario - Primera columna */}
            <div className="col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{t('classroomAssignment.selectDate')}</h3>
                <Calendar className="w-5 h-5" />
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                className="w-full"
                calendarClassName="border-black_text bg-principal_purple rounded-lg"
                dayClassName={() => "text-white_text hover:bg-principal_purple"}
                monthClassName={() => "text-white_text"}
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
                {/* Primera fila - 2 campos con altura uniforme */}
                <div className="grid grid-cols-2 gap-4 mb-1">
                  <DropdownInput 
                    name="professor" 
                    label={t('classroomAssignment.professor')} 
                    options={professorsOptions} 
                    placeholderOption={t('classroomAssignment.professorPlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                  <TextInput 
                    name="capacity" 
                    label={t('classroomAssignment.capacity')} 
                    placeholder={t('classroomAssignment.capacityPlaceholder')} 
                    inputClassName="w-full h-12 bg-principal_container border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white [&>label]:text-white" 
                  />
                </div>

                {/* Segunda fila - 2 campos con altura uniforme */}
                <div className="grid grid-cols-2 gap-4 mb-1">
                  <DropdownInput 
                    name="sede" 
                    label={t('classroomAssignment.sede')} 
                    options={sedesOptions} 
                    placeholderOption={t('classroomAssignment.sedePlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                  <DropdownInput 
                    name="classType" 
                    label={t('classroomAssignment.classType')} 
                    options={classTypesOptions} 
                    placeholderOption={t('classroomAssignment.classTypePlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Tercera fila - 2 campos con altura uniforme */}
                <div className="grid grid-cols-2 gap-4 mb-1">
                  <TextInput 
                    name="classroom" 
                    label={t('classroomAssignment.classroom')} 
                    placeholder={t('classroomAssignment.classroomPlaceholder')} 
                    inputClassName="w-full h-12 bg-principal_container border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white [&>label]:text-white" 
                  />
                  <DropdownInput 
                    name="subject" 
                    label={t('classroomAssignment.subject')} 
                    options={subjectsOptions} 
                    placeholderOption={t('classroomAssignment.subjectPlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Cuarta fila - 1 campo ancho */}
                <div className="mb-4">
                  <DropdownInput 
                    name="timeSlot" 
                    label={t('classroomAssignment.timeSlot')} 
                    options={timeSlotOptions} 
                    placeholderOption={t('classroomAssignment.timeSlotPlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Material TIC */}
                <div className="mb-6">
                  <div className="bg-indigo-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-base">{t('classroomAssignment.ticMaterial')}</h4>
                      <button type="button" className="text-indigo-300 text-sm hover:text-white underline">
                        {t('classroomAssignment.view')}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <label className="flex items-center p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.videobeam} 
                          onChange={(e) => setTicMaterials({ ...ticMaterials, videobeam: e.target.checked })} 
                          className="mr-2 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded" 
                        />
                        <Monitor className="w-4 h-4 mr-2 text-indigo-300" />
                        <span className="text-sm font-medium">{t('classroomAssignment.videobeam')}</span>
                      </label>
                      <label className="flex items-center p-2 bg-indigo-700 rounded-lg hover:bg-indigo-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.airConditioning} 
                          onChange={(e) => setTicMaterials({ ...ticMaterials, airConditioning: e.target.checked })} 
                          className="mr-2 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded" 
                        />
                        <Thermometer className="w-4 h-4 mr-2 text-indigo-300" />
                        <span className="text-sm font-medium">{t('classroomAssignment.airConditioning')}</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder={t('classroomAssignment.enterNewTask')} 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        className="flex-1 h-9 px-3 py-1 border border-indigo-600 bg-indigo-700 text-white placeholder-indigo-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      />
                      <button 
                        type="button" 
                        onClick={addTicMaterial} 
                        className="px-4 h-9 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 flex items-center justify-center transition-colors"
                      >
                        {t('classroomAssignment.addItem')}
                      </button>
                    </div>
                  </div>
                </div>

                <CustomButton className="w-full h-12 bg-indigo-700 hover:bg-indigo-600 text-white disabled:opacity-50 font-semibold text-base rounded-lg transition-colors">
                  {t('classroomAssignment.assignNewRoom')}
                </CustomButton>
              </FormContainer>
            </div>
          </div>
        </div>

        {/* Previsualización */}
        <div className="flex-[1] mx-4">
          <div className="w-full bg-white p-8 shadow-lg rounded-lg">
            <div className="bg-indigo-900 text-white p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-1">{t('classroomAssignment.classPreview')}</h3>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium text-gray-800">{t('classroomAssignment.mainClass')}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{formValues.timeSlot ? getLabelByValue(timeSlotOptions, formValues.timeSlot) : t('classroomAssignment.scheduleToAssign')}</p>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{formValues.professor ? getLabelByValue(professorsOptions, formValues.professor) : t('classroomAssignment.professorToAssign')}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{formValues.sede ? getLabelByValue(sedesOptions, formValues.sede) : t('classroomAssignment.sedeToAssign')}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.classroom || t('classroomAssignment.classroomToAssign')}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.subject ? getLabelByValue(subjectsOptions, formValues.subject) : t('classroomAssignment.subjectToAssign')}</p>
                <p className="text-sm text-gray-600 mb-1">{formValues.capacity ? `${t('classroomAssignment.capacity')}: ${formValues.capacity}` : t('classroomAssignment.capacityToDefine')}</p>
                <p className="text-sm text-gray-600">{formValues.classType ? getLabelByValue(classTypesOptions, formValues.classType) : t('classroomAssignment.classTypeToDefine')}</p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium text-gray-800">{t('classroomAssignment.ticMaterial')}</span>
                </div>
                {ticMaterials.videobeam && (
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span>{t('classroomAssignment.videobeam')}</span>
                  </div>
                )}
                {ticMaterials.airConditioning && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Thermometer className="w-4 h-4 mr-2" />
                    <span>{t('classroomAssignment.airConditioning')}</span>
                  </div>
                )}
                {!ticMaterials.videobeam && !ticMaterials.airConditioning && (
                  <p className="text-sm text-gray-600">{t('classroomAssignment.noTicMaterial')}</p>
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