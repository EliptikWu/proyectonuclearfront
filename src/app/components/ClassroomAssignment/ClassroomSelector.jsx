import React from 'react';
import Dropdown from '@/app/components/common/inputs/Dropdown';
import TextInput from '@components/common/inputs/TextInput';
import { AlertCircle } from 'lucide-react';

const ClassroomSelector = ({
  t,
  formValues,
  loadingAulas,
  aulaError,
  sedesOptions,
  classTypesOptions,
  subjectsOptions,
  timeSlotOptions,
  handleFormChange
}) => {
  return (
    <>
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
    </>
  );
};

export default ClassroomSelector;
