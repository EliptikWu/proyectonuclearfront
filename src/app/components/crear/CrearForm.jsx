import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, Calendar, Users, Monitor, Thermometer, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import Navbar from '@components/common/Navbar';
import FormContainer from '@components/common/FormContainer';
import Dropdown from '@components/common/Dropdown';
import TextInput from '@components/common/inputs/TextInput';
import CustomButton from '@components/common/CustomButton';
import Alert from '@components/common/alerts/Alert'; 
import { useTranslation } from 'react-i18next';
import aulasService from '@services/aulasService';
import { useRouter } from "next/navigation";
import { 
  professorsOptions, 
  subjectsOptions, 
  timeSlotOptions, 
  sedesOptions, 
  classTypesOptions,
  sedesMap 
} from '@data/staticData';

const ClassroomAssignmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation();
  const router = useRouter(); 
  
  // Estados del formulario
  const [formValues, setFormValues] = useState({
    professor: '',
    capacity: '',
    sede: '',
    classroom: '',
    subject: '',
    classType: '',
    timeSlot: ''
  });

  // Estados para materiales TIC
  const [ticMaterials, setTicMaterials] = useState({
    videobeam: false,
    airConditioning: false,
    customMaterials: []
  });
  const [newTask, setNewTask] = useState('');

  // Estados para las aulas desde la API
  const [aulasList, setAulasList] = useState([]);
  const [aulasOptions, setAulasOptions] = useState([]);
  const [loadingAulas, setLoadingAulas] = useState(false);
  const [selectedAulaInfo, setSelectedAulaInfo] = useState(null);
  const [aulaError, setAulaError] = useState(null);

  // Estados para las alertas
  const [alert, setAlert] = useState({
    show: false,
    type: 'info',
    message: ''
  });

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar aulas al montar el componente
  useEffect(() => {
    loadAulas();
  }, []);

  // Cargar aulas filtradas cuando cambia la sede o tipo de clase
  useEffect(() => {
    if (aulasList.length > 0) {
      filterAulasByCriteria();
    }
  }, [formValues.sede, formValues.classType, aulasList]);

  // Función para cargar todas las aulas
  const loadAulas = useCallback(async () => {
    setLoadingAulas(true);
    setAulaError(null);
    try {
      const aulas = await aulasService.getAllAulas();
      
      if (!Array.isArray(aulas)) {
        throw new Error('Los datos recibidos no son un array válido');
      }
      
      setAulasList(aulas);
      const aulasFormatted = aulasService.formatAulasForDropdown(aulas);
      setAulasOptions(aulasFormatted);
      
    } catch (error) {
      console.error('Error loading aulas:', error);
      setAulaError(error.message);
      setAlert({
        show: true,
        type: 'error',
        message: t('classroomAssignment.errorLoadingAulas', 'Error al cargar las aulas: ') + error.message
      });
    } finally {
      setLoadingAulas(false);
    }
  }, [t]);

  // Función para filtrar aulas por criterios
  const filterAulasByCriteria = useCallback(() => {
    try {
      let filteredAulas = aulasList.filter(aula => aula.estado === 'LIBRE');

      if (formValues.sede) {
        filteredAulas = filteredAulas.filter(aula => aula.sedeId === formValues.sede);
      }

      if (formValues.classType) {
        filteredAulas = filteredAulas.filter(aula => aula.tipo === formValues.classType);
      }

      const aulasFormatted = aulasService.formatAulasForDropdown(filteredAulas);
      setAulasOptions(aulasFormatted);

      if (formValues.classroom) {
        const isAulaStillAvailable = aulasFormatted.some(aula => aula.value === formValues.classroom);
        if (!isAulaStillAvailable) {
          setFormValues(prev => ({ ...prev, classroom: '' }));
          setSelectedAulaInfo(null);
        }
      }

    } catch (error) {
      console.error('Error filtering aulas:', error);
    }
  }, [aulasList, formValues.sede, formValues.classType, formValues.classroom]);

  // Valores iniciales del formulario
  const initialValues = useMemo(() => ({
    professor: '',
    capacity: '',
    sede: '',
    classroom: '',
    subject: '',
    classType: '',
    timeSlot: ''
  }), []);

  // Esquema de validación
  const validationSchema = useMemo(() => Yup.object({
    professor: Yup.string()
      .required(t('validation.professorRequired', 'El profesor es requerido'))
      .min(2, t('validation.professorMinLength', 'El nombre del profesor debe tener al menos 2 caracteres')),
    capacity: Yup.number()
      .required(t('validation.capacityRequired', 'La capacidad es requerida'))
      .positive(t('validation.capacityPositive', 'La capacidad debe ser un número positivo'))
      .integer(t('validation.capacityInteger', 'La capacidad debe ser un número entero'))
      .min(1, t('validation.capacityMin', 'La capacidad mínima es 1'))
      .max(500, t('validation.capacityMax', 'La capacidad máxima es 500'))
      .typeError(t('validation.capacityMustBeNumber', 'La capacidad debe ser un número')),
    sede: Yup.string().required(t('validation.sedeRequired', 'La sede es requerida')),
    classroom: Yup.string()
      .required(t('validation.classroomRequired', 'El aula es requerida'))
      .matches(/^AULA-\d{3}$/, t('validation.classroomFormat', 'El formato del aula debe ser AULA-XXX')),
    subject: Yup.string().required(t('validation.subjectRequired', 'La materia es requerida')),
    classType: Yup.string().required(t('validation.classTypeRequired', 'El tipo de clase es requerido')),
    timeSlot: Yup.string().required(t('validation.timeSlotRequired', 'El horario es requerido')),
  }), [t]);

  // Función para manejar el cambio de fecha
  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  // Función para agregar material TIC personalizado
  const addTicMaterial = useCallback(() => {
    const trimmedTask = newTask.trim();
    if (trimmedTask) {
      if (ticMaterials.customMaterials.includes(trimmedTask)) {
        setAlert({
          show: true,
          type: 'warning',
          message: t('classroomAssignment.materialAlreadyExists', 'Este material ya ha sido agregado')
        });
        return;
      }

      setTicMaterials(prev => ({
        ...prev,
        customMaterials: [...prev.customMaterials, trimmedTask]
      }));
      setNewTask('');
      
      setAlert({
        show: true,
        type: 'success',
        message: t('classroomAssignment.ticMaterialAdded', 'Material TIC agregado correctamente')
      });
    } else {
      setAlert({
        show: true,
        type: 'warning',
        message: t('classroomAssignment.enterValidTask', 'Por favor ingrese un material TIC válido')
      });
    }
  }, [newTask, ticMaterials.customMaterials, t]);

  // Función para eliminar material TIC personalizado
  const removeTicMaterial = useCallback((materialToRemove) => {
    setTicMaterials(prev => ({
      ...prev,
      customMaterials: prev.customMaterials.filter(material => material !== materialToRemove)
    }));
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    
    try {
      const requiredFields = [
        { field: 'professor', message: t('validation.professorRequired', 'El profesor es requerido') },
        { field: 'capacity', message: t('validation.capacityRequired', 'La capacidad es requerida') },
        { field: 'sede', message: t('validation.sedeRequired', 'La sede es requerida') },
        { field: 'classroom', message: t('validation.classroomRequired', 'El aula es requerida') },
        { field: 'subject', message: t('validation.subjectRequired', 'La materia es requerida') },
        { field: 'classType', message: t('validation.classTypeRequired', 'El tipo de clase es requerido') },
        { field: 'timeSlot', message: t('validation.timeSlotRequired', 'El horario es requerido') }
      ];

      const emptyFields = [];
      
      requiredFields.forEach(({ field, message }) => {
        if (!values[field] || values[field].toString().trim() === '') {
          emptyFields.push(message);
        }
      });

      const capacity = parseInt(values.capacity);
      if (values.capacity && (isNaN(capacity) || capacity <= 0)) {
        emptyFields.push(t('validation.capacityPositive', 'La capacidad debe ser un número positivo'));
      }

      if (selectedAulaInfo && capacity > selectedAulaInfo.capacidad) {
        emptyFields.push(t('validation.capacityExceedsAula', 
          `La capacidad solicitada (${capacity}) excede la capacidad del aula (${selectedAulaInfo.capacidad})`));
      }

      const hasSelectedResource = ticMaterials.videobeam || 
                                 ticMaterials.airConditioning || 
                                 ticMaterials.customMaterials.length > 0;
      if (!hasSelectedResource) {
        emptyFields.push(t('validation.ticResourceRequired', 'Debe seleccionar al menos un recurso TIC'));
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        emptyFields.push(t('validation.dateInPast', 'La fecha no puede ser en el pasado'));
      }

      if (emptyFields.length > 0) {
        setAlert({
          show: true,
          type: 'error',
          message: `${t('validation.missingFields', 'Errores de validación')}: ${emptyFields.join(', ')}`
        });
        return;
      }

      const assignmentData = {
        ...values,
        date: selectedDate.toISOString(),
        ticMaterials: {
          ...ticMaterials,
          customMaterials: ticMaterials.customMaterials
        },
        aulaInfo: selectedAulaInfo,
        timestamp: new Date().toISOString()
      };
      
      console.log('Assignment data to submit:', assignmentData);
      
      setAlert({
        show: true,
        type: 'success',
        message: t('classroomAssignment.assignmentCreated', 'Asignación de aula creada correctamente')
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({
        show: true,
        type: 'error',
        message: t('classroomAssignment.errorSubmitting', 'Error al crear la asignación: ') + error.message
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  }, [selectedDate, ticMaterials, selectedAulaInfo, t]);

  // Función para manejar cambios en el formulario
  const handleFormChange = useCallback((values) => {
    setFormValues(values);
    
    if (values.classroom && values.classroom !== formValues.classroom) {
      const selectedAula = aulasList.find(aula => aula.id === values.classroom);
      setSelectedAulaInfo(selectedAula);
    } else if (!values.classroom) {
      setSelectedAulaInfo(null);
    }
  }, [aulasList, formValues.classroom]);

  // Función para manejar cambios en materiales TIC
  const handleTicMaterialChange = useCallback((materialType, checked) => {
    setTicMaterials(prev => ({
      ...prev,
      [materialType]: checked
    }));
  }, []);

  // Función helper para obtener etiqueta por valor
  const getLabelByValue = useCallback((options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  }, []);

  // Función para cerrar la alerta
  const handleCloseAlert = useCallback(() => {
    setAlert({
      show: false,
      type: 'info',
      message: ''
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-12 pt-6">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 text-black_text mr-2 cursor-pointer hover:text-gray-600 transition-colors" 
          onClick={() => router.push("/aulas/visualizar")} />
          <h1 className="text-xl sm:text-2xl font-bold text-black_text">{t('classroomAssignment.title')}</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-12 py-6">
        {/* Formulario + Calendario */}
        <div className="flex-1 bg-principal_purple rounded-lg p-4 sm:p-6 shadow-lg order-2 lg:order-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            
            {/* Calendario - Contenedor ajustado */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm sm:text-base">{t('classroomAssignment.selectDate')}</h3>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="w-full max-w-[280px] mx-auto"> {/* Contenedor más pequeño */}
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  minDate={new Date()}
                  className="w-full"
                  calendarClassName="border-black_text bg-principal_purple rounded-lg react-datepicker--static scale-90 origin-top-left" /* Escala reducida */
                  dayClassName={() => "text-white_text hover:bg-principal_purple text-sm"}
                  monthClassName={() => "text-white_text"}
                  weekDayClassName={() => "text-indigo-300"}
                />
              </div>
            </div>

            {/* Resto del formulario */}
            <div className="lg:col-span-3">
              <FormContainer
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                onChange={handleFormChange}
              >
                {/* Primera fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Dropdown 
                    name="professor" 
                    label={t('classroomAssignment.professor')} 
                    options={professorsOptions} 
                    placeholderOption={t('classroomAssignment.professorPlaceholder')} 
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white [&>label]:text-white" 
                  />
                  <TextInput 
                    name="capacity" 
                    label={t('classroomAssignment.capacity')} 
                    placeholder={t('classroomAssignment.capacityPlaceholder')} 
                    inputClassName="w-full h-10 sm:h-12 bg-principal_container border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white [&>label]:text-white" 
                    type="number"
                    min="1"
                    max="500"
                  />
                </div>

                {/* Segunda fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Dropdown 
                    name="sede" 
                    label={t('classroomAssignment.sede')} 
                    options={sedesOptions} 
                    placeholderOption={t('classroomAssignment.sedePlaceholder')} 
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                  <Dropdown 
                    name="classType" 
                    label={t('classroomAssignment.classType')} 
                    options={classTypesOptions} 
                    placeholderOption={t('classroomAssignment.classTypePlaceholder')} 
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Tercera fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <TextInput
                      name="classroom"
                      label={t('classroomAssignment.classroom')}
                      placeholder="Ej: AULA-101"
                      inputClassName="w-full h-10 sm:h-12 bg-principal_container border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm"
                      className="w-full text-white [&>label]:text-white"
                      type="text"
                    />
                    {loadingAulas && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      </div>
                    )}
                    {aulaError && (
                      <div className="flex items-center mt-1 text-red-300 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        <span>Error al cargar aulas</span>
                      </div>
                    )}
                  </div>
                  <Dropdown
                    name="subject" 
                    label={t('classroomAssignment.subject')} 
                    options={subjectsOptions} 
                    placeholderOption={t('classroomAssignment.subjectPlaceholder')} 
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Cuarta fila */}
                <div className="mb-4">
                  <Dropdown
                    name="timeSlot" 
                    label={t('classroomAssignment.timeSlot')} 
                    options={timeSlotOptions} 
                    placeholderOption={t('classroomAssignment.timeSlotPlaceholder')} 
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Información del aula seleccionada */}
                {selectedAulaInfo && (
                  <div className="mb-4 p-3 sm:p-4 bg-indigo-800 rounded-lg border border-indigo-600">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      <h4 className="text-sm font-medium text-white">Información del Aula Seleccionada:</h4>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs text-indigo-200">
                      <span><strong>Nombre:</strong> {selectedAulaInfo.nombre}</span>
                      <span><strong>Capacidad:</strong> {selectedAulaInfo.capacidad} estudiantes</span>
                      <span><strong>Tipo:</strong> {selectedAulaInfo.tipo}</span>
                      <span><strong>Sede:</strong> {sedesMap[selectedAulaInfo.sedeId]}</span>
                      {selectedAulaInfo.descripcionEstado && (
                        <span className="xs:col-span-2"><strong>Estado:</strong> {selectedAulaInfo.descripcionEstado}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Material TIC */}
                <div className="mb-6">
                  <div className="bg-indigo-800 rounded-lg p-3 sm:p-4 border border-indigo-600">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm sm:text-base text-white">
                        {t('classroomAssignment.ticMaterial')}
                        <span className="text-red-400 ml-1">*</span>
                      </h4>
                      <button type="button" className="text-indigo-300 text-xs sm:text-sm hover:text-white underline transition-colors">
                        {t('classroomAssignment.view')}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <label className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        ticMaterials.videobeam ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-indigo-700 hover:bg-indigo-600'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.videobeam} 
                          onChange={(e) => handleTicMaterialChange('videobeam', e.target.checked)} 
                          className="mr-2 sm:mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded focus:ring-indigo-500" 
                        />
                        <Monitor className="w-4 h-4 mr-2 text-indigo-300" />
                        <span className="text-xs sm:text-sm font-medium text-white">{t('classroomAssignment.videobeam')}</span>
                      </label>
                      <label className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        ticMaterials.airConditioning ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-indigo-700 hover:bg-indigo-600'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.airConditioning} 
                          onChange={(e) => handleTicMaterialChange('airConditioning', e.target.checked)} 
                          className="mr-2 sm:mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded focus:ring-indigo-500" 
                        />
                        <Thermometer className="w-4 h-4 mr-2 text-indigo-300" />
                        <span className="text-xs sm:text-sm font-medium text-white">{t('classroomAssignment.airConditioning')}</span>
                      </label>
                    </div>

                    {ticMaterials.customMaterials.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-indigo-300 mb-2">Materiales personalizados:</p>
                        <div className="flex flex-wrap gap-2">
                          {ticMaterials.customMaterials.map((material, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white text-xs rounded-full"
                            >
                              {material}
                              <button
                                type="button"
                                onClick={() => removeTicMaterial(material)}
                                className="ml-1 text-indigo-300 hover:text-white"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        placeholder={t('classroomAssignment.enterNewTask')} 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        onKeyPress={(e) => e.key === 'Enter' && addTicMaterial()}
                        className="flex-1 h-10 px-3 py-2 border border-indigo-600 bg-indigo-700 text-white placeholder-indigo-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                        maxLength={50}
                      />
                      <button 
                        type="button" 
                        onClick={addTicMaterial} 
                        disabled={!newTask.trim()}
                        className="px-4 h-10 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {t('classroomAssignment.addItem')}
                      </button>
                    </div>
                  </div>
                </div>

                <CustomButton 
                  type="submit"
                  disabled={isSubmitting || loadingAulas}
                  className="w-full h-10 sm:h-12 bg-indigo-700 hover:bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('classroomAssignment.submitting', 'Enviando...')}
                    </>
                  ) : (
                    t('classroomAssignment.assignNewRoom')
                  )}
                </CustomButton>
              </FormContainer>
            </div>
          </div>
        </div>

        {/* Previsualización */}
        <div className="w-full lg:w-80 xl:w-96 bg-white p-4 sm:p-6 shadow-lg rounded-lg order-1 lg:order-2">
          <div className="bg-indigo-900 text-white p-3 sm:p-4 rounded-lg mb-4">
            <h3 className="font-medium text-sm sm:text-base mb-1">{t('classroomAssignment.classPreview')}</h3>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-800 text-sm sm:text-base">{t('classroomAssignment.mainClass')}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{formValues.timeSlot ? getLabelByValue(timeSlotOptions, formValues.timeSlot) : t('classroomAssignment.scheduleToAssign')}</p>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
                <Users className="w-4 h-4 mr-1" />
                <span>{formValues.professor ? getLabelByValue(professorsOptions, formValues.professor) : t('classroomAssignment.professorToAssign')}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{formValues.sede ? getLabelByValue(sedesOptions, formValues.sede) : t('classroomAssignment.sedeToAssign')}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {selectedAulaInfo ? selectedAulaInfo.nombre : t('classroomAssignment.classroomToAssign')}
                {selectedAulaInfo && ` (Cap: ${selectedAulaInfo.capacidad})`}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{formValues.subject ? getLabelByValue(subjectsOptions, formValues.subject) : t('classroomAssignment.subjectToAssign')}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{formValues.capacity ? `${t('classroomAssignment.capacity')}: ${formValues.capacity}` : t('classroomAssignment.capacityToDefine')}</p>
              <p className="text-xs sm:text-sm text-gray-600">{formValues.classType ? getLabelByValue(classTypesOptions, formValues.classType) : t('classroomAssignment.classTypeToDefine')}</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium text-gray-800 text-sm sm:text-base">{t('classroomAssignment.ticMaterial')}</span>
              </div>
              {ticMaterials.videobeam && (
                <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
                  <Monitor className="w-4 h-4 mr-2" />
                  <span>{t('classroomAssignment.videobeam')}</span>
                </div>
              )}
              {ticMaterials.airConditioning && (
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Thermometer className="w-4 h-4 mr-2" />
                  <span>{t('classroomAssignment.airConditioning')}</span>
                </div>
              )}
              {!ticMaterials.videobeam && !ticMaterials.airConditioning && (
                <p className="text-xs sm:text-sm text-gray-600">{t('classroomAssignment.noTicMaterial')}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onConfirm={handleCloseAlert}
        />
      )}

      {/* Estilos para el DatePicker */}
<style jsx global>{`
  .react-datepicker--static {
    position: relative !important;
    display: inline-block !important;
    width: 100% !important;
    transform-origin: top left;
  }
  .react-datepicker__month-container {
    width: 100% !important;
  }
  .react-datepicker {
    width: 100% !important;
    font-size: 0.9rem !important; /* Tamaño de fuente mantenido */
    border: none !important;
  }
  .react-datepicker__header {
    background-color: #4F46E5 !important;
    border-bottom: none !important;
    padding: 0.5rem !important; /* Padding reducido */
  }
  .react-datepicker__day {
    margin: 0.1rem !important; /* Espacio entre días reducido */
    width: 1.8rem !important; /* Tamaño de día reducido */
    line-height: 1.8rem !important;
  }
  .react-datepicker__current-month {
    font-size: 0.9rem !important; /* Tamaño de fuente mantenido */
  }
  .react-datepicker__day-name {
    width: 1.8rem !important; /* Tamaño de nombre de día reducido */
    margin: 0.1rem !important;
  }
`}</style>
    </div>
  );
};

export default ClassroomAssignmentForm;