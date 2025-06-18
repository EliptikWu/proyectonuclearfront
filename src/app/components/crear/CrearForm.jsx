import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Users, Monitor, Thermometer, Plus } from 'lucide-react';
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

  // Estados para las aulas desde la API
  const [aulasList, setAulasList] = useState([]);
  const [aulasOptions, setAulasOptions] = useState([]);
  const [loadingAulas, setLoadingAulas] = useState(false);
  const [selectedAulaInfo, setSelectedAulaInfo] = useState(null);

  // Estados para las alertas
  const [alert, setAlert] = useState({
    show: false,
    type: 'info',
    message: ''
  });

  // Cargar aulas al montar el componente
  useEffect(() => {
    loadAulas();
  }, []);

  // Cargar aulas filtradas cuando cambia la sede o tipo de clase
  useEffect(() => {
    if (formValues.sede || formValues.classType) {
      filterAulasByCriteria();
    }
  }, [formValues.sede, formValues.classType, aulasList]);

  const loadAulas = async () => {
    setLoadingAulas(true);
    try {
      const aulas = await aulasService.getAllAulas();
      setAulasList(aulas);
      const aulasFormatted = aulasService.formatAulasForDropdown(aulas);
      setAulasOptions(aulasFormatted);
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: t('classroomAssignment.errorLoadingAulas', 'Error al cargar las aulas')
      });
    } finally {
      setLoadingAulas(false);
    }
  };

  const filterAulasByCriteria = async () => {
    try {
      let filteredAulas = aulasList.filter(aula => aula.estado === 'LIBRE');

      // Filtrar por sede si está seleccionada
      if (formValues.sede) {
        filteredAulas = filteredAulas.filter(aula => aula.sedeId === formValues.sede);
      }

      // Filtrar por tipo de clase si está seleccionado
      if (formValues.classType) {
        filteredAulas = filteredAulas.filter(aula => aula.tipo === formValues.classType);
      }

      const aulasFormatted = aulasService.formatAulasForDropdown(filteredAulas);
      setAulasOptions(aulasFormatted);

      // Limpiar selección de aula si ya no está disponible
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
  };

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
      .typeError(t('validation.capacityMustBeNumber'))
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
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Validar campos usando 'values' de Formik
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

    // Validar capacidad como número positivo
    if (values.capacity && (isNaN(values.capacity) || parseInt(values.capacity) <= 0)) {
      emptyFields.push(t('validation.capacityPositive', 'La capacidad debe ser un número positivo'));
    }

    // Validar capacidad contra la capacidad del aula seleccionada
    if (selectedAulaInfo && values.capacity && parseInt(values.capacity) > selectedAulaInfo.capacidad) {
      emptyFields.push(t('validation.capacityExceedsAula', `La capacidad solicitada (${values.capacity}) excede la capacidad del aula (${selectedAulaInfo.capacidad})`));
    }

    // Validar que al menos un recurso TIC esté seleccionado
    const hasSelectedResource = ticMaterials.videobeam || ticMaterials.airConditioning;
    if (!hasSelectedResource) {
      emptyFields.push(t('validation.ticResourceRequired', 'Debe seleccionar al menos un recurso TIC'));
    }

    if (emptyFields.length > 0) {
      setAlert({
        show: true,
        type: 'error',
        message: `${t('validation.missingFields', 'Faltan campos por rellenar')}: ${emptyFields.join(', ')}`
      });
      setSubmitting(false);
      return;
    }

    // Si todos los campos están completos, proceder con el envío
    const assignmentData = {
      ...values,
      date: selectedDate,
      ticMaterials,
      newTask,
      aulaInfo: selectedAulaInfo
    };
    
    console.log('Assignment data:', assignmentData);
    
    setAlert({
      show: true,
      type: 'success',
      message: t('classroomAssignment.assignmentCreated', 'Asignación de aula creada correctamente')
    });
    
    setSubmitting(false);
  };

  const handleFormChange = (values) => {
    setFormValues(values);
    
    // Actualizar información del aula seleccionada
    if (values.classroom) {
      const selectedAula = aulasList.find(aula => aula.id === values.classroom);
      setSelectedAulaInfo(selectedAula);
    } else {
      setSelectedAulaInfo(null);
    }
  };

  const getLabelByValue = (options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  // Función para cerrar la alerta
  const handleCloseAlert = () => {
    setAlert({
      show: false,
      type: 'info',
      message: ''
    });
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
                  <Dropdown 
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
                  <Dropdown 
                    name="sede" 
                    label={t('classroomAssignment.sede')} 
                    options={sedesOptions} 
                    placeholderOption={t('classroomAssignment.sedePlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                  <Dropdown 
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
                  <Dropdown 
                    name="classroom" 
                    label={t('classroomAssignment.classroom')} 
                    options={aulasOptions}
                    placeholderOption={loadingAulas ? 'Cargando aulas...' : t('classroomAssignment.classroomPlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                    disabled={loadingAulas}
                  />
                  <Dropdown
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
                  <Dropdown
                    name="timeSlot" 
                    label={t('classroomAssignment.timeSlot')} 
                    options={timeSlotOptions} 
                    placeholderOption={t('classroomAssignment.timeSlotPlaceholder')} 
                    selectClassName="w-full h-12 bg-principal_purple border-purple_border text-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm" 
                    className="w-full text-white" 
                  />
                </div>

                {/* Información del aula seleccionada */}
                {selectedAulaInfo && (
                  <div className="mb-4 p-3 bg-indigo-800 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">Información del Aula:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-indigo-200">
                      <span>Capacidad: {selectedAulaInfo.capacidad} estudiantes</span>
                      <span>Tipo: {selectedAulaInfo.tipo}</span>
                      <span>Sede: {sedesMap[selectedAulaInfo.sedeId]}</span>
                      <span>Estado: {selectedAulaInfo.descripcionEstado}</span>
                    </div>
                  </div>
                )}

                {/* Material TIC */}
                <div className="mb-6">
                  <div className="bg-indigo-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-base">
                        {t('classroomAssignment.ticMaterial')}
                        <span className="text-red-400 ml-1">*</span>
                      </h4>
                      <button type="button" className="text-indigo-300 text-sm hover:text-white underline">
                        {t('classroomAssignment.view')}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <label className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                        ticMaterials.videobeam ? 'bg-indigo-600' : 'bg-indigo-700 hover:bg-indigo-600'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={ticMaterials.videobeam} 
                          onChange={(e) => setTicMaterials({ ...ticMaterials, videobeam: e.target.checked })} 
                          className="mr-2 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded" 
                        />
                        <Monitor className="w-4 h-4 mr-2 text-indigo-300" />
                        <span className="text-sm font-medium">{t('classroomAssignment.videobeam')}</span>
                      </label>
                      <label className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                        ticMaterials.airConditioning ? 'bg-indigo-600' : 'bg-indigo-700 hover:bg-indigo-600'
                      }`}>
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
                <p className="text-sm text-gray-600 mb-1">
                  {selectedAulaInfo ? selectedAulaInfo.nombre : t('classroomAssignment.classroomToAssign')}
                  {selectedAulaInfo && ` (Cap: ${selectedAulaInfo.capacidad})`}
                </p>
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

      {/* Componente Alert */}
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onConfirm={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default ClassroomAssignmentForm;