"use client";
import classrooms from "../../data/classrooms";
import ClassroomCard from "./ClassroomCard";
import { useTranslation } from "react-i18next";

export default function ClassroomList() {
  const { t } = useTranslation();

  return (
    <section className="p-4">
      {/* Contenedor del título y botón */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-principal_purple)]">
          {t("classrooms.title")}
        </h2>

        <button
          className="px-4 py-2 rounded-lg bg-[var(--color-blue_button_login)] text-white text-sm font-medium hover:bg-[var(--color-blue_button_login_hover)] transition"
        >
          {t("classrooms.create")}
        </button>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </section>
  );
}
