// components/CrearForm.jsx

"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import Header from "@components/common/Navbar";
import FormContainer from "@components/common/FormContainer";
import CustomButton from "@components/common/CustomButton";
import Alert from "@components/common/alerts/Alert";

import Dropdown from "@components/common/inputs/Dropdown";
import TextInput from "@/app/components/common/inputs/TextInputFormik";

// Componentes modularizados
import DatePickerSection from "@components/ClassroomAssignment/DatePickerSection";
import ClassroomSelector from "@components/ClassroomAssignment/ClassroomSelector";
import SelectedAulaInfo from "@components/ClassroomAssignment/SelectedAulaInfo";
import TicMaterialSection from "@components/ClassroomAssignment/TicMaterialSection";
import ClassPreview from "@components/ClassroomAssignment/ClassPreview";

// Datos estáticos
import {
  professorsOptions,
  subjectsOptions,
  timeSlotOptions,
  sedesOptions,
  classTypesOptions,
  sedesMap,
} from "@data/staticData";

// Hook de lógica
import { useClassroomFormHandlers } from "@hooks/ClassroomFormHandlers";

const ClassroomAssignmentForm = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Estados generales del formulario
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    professor: '',
    capacity: '',
    sede: '',
    classroom: '',
    subject: '',
    classType: '',
    timeSlot: ''
  });
  const [ticMaterials, setTicMaterials] = useState({
    videobeam: false,
    airConditioning: false,
    customMaterials: []
  });
  const [newTask, setNewTask] = useState('');
  const [aulasList, setAulasList] = useState([]);
  const [aulasOptions, setAulasOptions] = useState([]);
  const [loadingAulas, setLoadingAulas] = useState(false);
  const [selectedAulaInfo, setSelectedAulaInfo] = useState(null);
  const [aulaError, setAulaError] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers centralizados
  const {
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
  } = useClassroomFormHandlers(
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
  );

  // Cargar aulas al iniciar
  useEffect(() => {
    loadAulas();
  }, []);

  // Filtrar aulas cuando cambian sede o tipo
  useEffect(() => {
    if (aulasList.length > 0) {
      filterAulasByCriteria();
    }
  }, [formValues.sede, formValues.classType, aulasList]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Encabezado del formulario */}
      <div className="px-4 sm:px-6 md:px-12 pt-6">
        <div className="flex items-center">
          <ChevronLeft
            className="w-6 h-6 text-black_text mr-2 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => router.push("/aula/view")}
          />
          <h1 className="text-xl sm:text-2xl font-bold text-black_text">
            {t("classroomAssignment.title")}
          </h1>
        </div>
      </div>

      {/* Contenido principal: formulario + preview */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-12 py-6">
        {/* Panel izquierdo */}
        <div className="flex-1 bg-principal_purple rounded-lg p-4 sm:p-6 shadow-lg order-2 lg:order-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Selector de fecha */}
            <DatePickerSection
              t={t}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />

            {/* Formulario */}
            <div className="lg:col-span-3">
              <FormContainer
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                onChange={handleFormChange}
              >
                {/* Fila 1: profesor + capacidad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Dropdown
                    name="professor"
                    label={t("classroomAssignment.professor")}
                    options={professorsOptions}
                    placeholderOption={t("classroomAssignment.professorPlaceholder")}
                    selectClassName="w-full h-10 sm:h-12 bg-principal_purple border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm"
                    className="w-full text-white [&>label]:text-white"
                  />
                  <TextInput
                    name="capacity"
                    label={t("classroomAssignment.capacity")}
                    placeholder={t("classroomAssignment.capacityPlaceholder")}
                    type="number"
                    min="1"
                    max="500"
                    inputClassName="w-full h-10 sm:h-12 bg-principal_container border-purple_border text-gray_input_text placeholder-gray_input_text focus:ring-indigo-500 px-3 py-1 text-sm"
                    className="w-full text-white [&>label]:text-white"
                  />
                </div>

                {/* Fila 2–4 y error/loading aula */}
                <ClassroomSelector
                  t={t}
                  formValues={formValues}
                  loadingAulas={loadingAulas}
                  aulaError={aulaError}
                  sedesOptions={sedesOptions}
                  classTypesOptions={classTypesOptions}
                  subjectsOptions={subjectsOptions}
                  timeSlotOptions={timeSlotOptions}
                />

                <SelectedAulaInfo
                  selectedAulaInfo={selectedAulaInfo}
                  sedesMap={sedesMap}
                />

                <TicMaterialSection
                  t={t}
                  ticMaterials={ticMaterials}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  handleTicMaterialChange={handleTicMaterialChange}
                  addTicMaterial={addTicMaterial}
                  removeTicMaterial={removeTicMaterial}
                />

                <CustomButton
                  type="submit"
                  disabled={isSubmitting || loadingAulas}
                  className="w-full h-10 sm:h-12 bg-indigo-700 hover:bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("classroomAssignment.submitting", "Enviando...")}
                    </>
                  ) : (
                    t("classroomAssignment.assignNewRoom")
                  )}
                </CustomButton>
              </FormContainer>
            </div>
          </div>
        </div>

        {/* Panel derecho: resumen */}
        <ClassPreview
          t={t}
          selectedDate={selectedDate}
          formValues={formValues}
          selectedAulaInfo={selectedAulaInfo}
          ticMaterials={ticMaterials}
          getLabelByValue={getLabelByValue}
          timeSlotOptions={timeSlotOptions}
          professorsOptions={professorsOptions}
          sedesOptions={sedesOptions}
          subjectsOptions={subjectsOptions}
          classTypesOptions={classTypesOptions}
        />
      </div>

      {/* Alerta final */}
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
