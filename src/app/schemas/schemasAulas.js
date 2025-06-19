// src/app/schemas/schemasAula.js
import * as Yup from 'yup';

/**
 * Devuelve el esquema de validación de aulas con traducción
 * @param {Function} t - Función de traducción
 */
export const getClassroomValidationSchema = (t) => Yup.object({
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
});
