import { useCallback, useMemo } from 'react';
import aulasService from '@services/aulasService';
import { getClassroomValidationSchema } from '@schemas/schemasAulas';

export const useClassroomFormHandlers = (
  t,
  aulasList,
  setAulasList,
  setAulasOptions,
  setLoadingAulas,
  setAulaError,
  setAlert,
  formValues,
  setFormValues,
  selectedAulaInfo,
  setSelectedAulaInfo,
  ticMaterials,
  setTicMaterials,
  newTask,
  setNewTask,
  selectedDate,
  setSelectedDate,
  setIsSubmitting
) => {
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

  // Schema de validación
  const validationSchema = useMemo(() => getClassroomValidationSchema(t), [t]);

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
  }, [t, setLoadingAulas, setAulaError, setAulasList, setAulasOptions, setAlert]);

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
  }, [aulasList, formValues.sede, formValues.classType, formValues.classroom, setAulasOptions, setFormValues, setSelectedAulaInfo]);

  // Función para manejar el cambio de fecha
  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
  }, [setSelectedDate]);

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
  }, [newTask, ticMaterials.customMaterials, t, setTicMaterials, setNewTask, setAlert]);

  // Función para eliminar material TIC personalizado
  const removeTicMaterial = useCallback((materialToRemove) => {
    setTicMaterials(prev => ({
      ...prev,
      customMaterials: prev.customMaterials.filter(material => material !== materialToRemove)
    }));
  }, [setTicMaterials]);

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
  }, [selectedDate, ticMaterials, selectedAulaInfo, t, setIsSubmitting, setAlert]);

  // Función para manejar cambios en el formulario
  const handleFormChange = useCallback((values) => {
    setFormValues(values);
    
    if (values.classroom && values.classroom !== formValues.classroom) {
      const selectedAula = aulasList.find(aula => aula.id === values.classroom);
      setSelectedAulaInfo(selectedAula);
    } else if (!values.classroom) {
      setSelectedAulaInfo(null);
    }
  }, [aulasList, formValues.classroom, setFormValues, setSelectedAulaInfo]);

  // Función para manejar cambios en materiales TIC
  const handleTicMaterialChange = useCallback((materialType, checked) => {
    setTicMaterials(prev => ({
      ...prev,
      [materialType]: checked
    }));
  }, [setTicMaterials]);

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
  }, [setAlert]);

  return {
    initialValues,
    validationSchema,
    loadAulas,
    filterAulasByCriteria,
    handleDateChange,
    addTicMaterial,
    removeTicMaterial,
    handleSubmit,
    handleFormChange,
    handleTicMaterialChange,
    getLabelByValue,
    handleCloseAlert
  };
};