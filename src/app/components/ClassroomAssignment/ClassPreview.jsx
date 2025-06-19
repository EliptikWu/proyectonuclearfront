import React from 'react';
import { Calendar, Users, Monitor, Thermometer } from 'lucide-react';

const ClassPreview = ({
  t,
  selectedDate,
  formValues,
  selectedAulaInfo,
  ticMaterials,
  getLabelByValue,
  timeSlotOptions,
  professorsOptions,
  sedesOptions,
  subjectsOptions,
  classTypesOptions
}) => {
  return (
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

          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {formValues.timeSlot
              ? getLabelByValue(timeSlotOptions, formValues.timeSlot)
              : t('classroomAssignment.scheduleToAssign')}
          </p>

          <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {selectedDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
            <Users className="w-4 h-4 mr-1" />
            <span>
              {formValues.professor
                ? getLabelByValue(professorsOptions, formValues.professor)
                : t('classroomAssignment.professorToAssign')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {formValues.sede
              ? getLabelByValue(sedesOptions, formValues.sede)
              : t('classroomAssignment.sedeToAssign')}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {selectedAulaInfo
              ? `${selectedAulaInfo.nombre} (Cap: ${selectedAulaInfo.capacidad})`
              : t('classroomAssignment.classroomToAssign')}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {formValues.subject
              ? getLabelByValue(subjectsOptions, formValues.subject)
              : t('classroomAssignment.subjectToAssign')}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            {formValues.capacity
              ? `${t('classroomAssignment.capacity')}: ${formValues.capacity}`
              : t('classroomAssignment.capacityToDefine')}
          </p>

          <p className="text-xs sm:text-sm text-gray-600">
            {formValues.classType
              ? getLabelByValue(classTypesOptions, formValues.classType)
              : t('classroomAssignment.classTypeToDefine')}
          </p>
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
  );
};

export default ClassPreview;
