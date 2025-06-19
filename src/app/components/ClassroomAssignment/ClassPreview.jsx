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
import TextInput from "@components/common/inputs/TextInput";

import DatePickerSection from "@components/ClassroomAssignment/DatePickerSection";
import ClassroomSelector from "@components/ClassroomAssignment/ClassroomSelector";
import SelectedAulaInfo from "@components/ClassroomAssignment/SelectedAulaInfo";
import TicMaterialSection from "@components/ClassroomAssignment/TicMaterialSection";
import ClassPreview from "@components/ClassroomAssignment/ClassPreview";

import {
  professorsOptions,
  subjectsOptions,
  timeSlotOptions,
  sedesOptions,
  classTypesOptions,
  sedesMap,
} from "@data/staticData";

import {
  getAulas,
  createAula,
} from "@services/aulasService";

const ClassroomAssignmentForm = () => {
  const { t } = useTranslation();
  const router = useRouter();

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
  const [loadingAulas, setLoadingAulas] = useState(false);
  const [selectedAulaInfo, setSelectedAulaInfo] = useState(null);
  const [aulaError, setAulaError] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAulas = async () => {
    setLoadingAulas(true);
    try {
      const data = await getAulas();
      setAulasList(data);
    } catch (error) {
      console.error("Error cargando aulas:", error);
      setAulaError("Error al cargar aulas");
    } finally {
      setLoadingAulas(false);
    }
  };

  useEffect(() => {
    loadAulas();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const aulaPayload = {
        nombre: formValues.classroom,
        capacidad: parseInt(formValues.capacity),
        sedeId: formValues.sede,
        tipo: formValues.classType,
        estado: "LIBRE",
        recursos: [],
        configuracion: null,
        descripcionEstado: "Libre",
      };

      await createAula(aulaPayload);

      setAlert({
        show: true,
        type: 'success',
        message: 'Aula creada correctamente',
      });

      setTimeout(() => router.push('/aula/view'), 1500);
    } catch (error) {
      console.error("Error al crear aula:", error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Error al crear el aula',
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-12 py-6">
        <div className="flex-1 bg-principal_purple rounded-lg p-4 sm:p-6 shadow-lg order-2 lg:order-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <DatePickerSection t={t} selectedDate={selectedDate} handleDateChange={setSelectedDate} />

            <div className="lg:col-span-3">
              <FormContainer
                initialValues={formValues}
                onSubmit={handleSubmit}
                onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
              >
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

                <SelectedAulaInfo selectedAulaInfo={selectedAulaInfo} sedesMap={sedesMap} />

                <TicMaterialSection
                  t={t}
                  ticMaterials={ticMaterials}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  handleTicMaterialChange={(name, checked) => setTicMaterials({ ...ticMaterials, [name]: checked })}
                  addTicMaterial={() => {
                    if (newTask.trim() !== '') {
                      setTicMaterials({
                        ...ticMaterials,
                        customMaterials: [...ticMaterials.customMaterials, newTask],
                      });
                      setNewTask('');
                    }
                  }}
                  removeTicMaterial={(material) => {
                    const updated = ticMaterials.customMaterials.filter((item) => item !== material);
                    setTicMaterials({ ...ticMaterials, customMaterials: updated });
                  }}
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

        <ClassPreview
          t={t}
          selectedDate={selectedDate}
          formValues={formValues}
          selectedAulaInfo={selectedAulaInfo}
          ticMaterials={ticMaterials}
          timeSlotOptions={timeSlotOptions}
          professorsOptions={professorsOptions}
          sedesOptions={sedesOptions}
          subjectsOptions={subjectsOptions}
          classTypesOptions={classTypesOptions}
          getLabelByValue={(options, value) => options.find((o) => o.value === value)?.label || ''}
        />
      </div>

      {alert.show && (
        <Alert type={alert.type} message={alert.message} onConfirm={() => setAlert({ ...alert, show: false })} />
      )}
    </div>
  );
};

export default ClassroomAssignmentForm;
