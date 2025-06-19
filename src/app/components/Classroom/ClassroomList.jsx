"use client";
import classrooms from "@data/classrooms";
import ClassroomCard from "./ClassroomCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClassroomList() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.room.toString().includes(search)
  );

  return (
    <section className="p-6">
      {/* Cabecera con título, buscador y botones */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {/* Título y buscador */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-[var(--color-principal_purple)]">
            {t("classrooms.title")}
          </h2>
          <input
            type="text"
            placeholder="Buscar por número de aula..."
            className="text-gray_input_text border border-gray-300 rounded-lg px-4 py-2 text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue_button_login)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-2 justify-end w-full md:w-auto">
          <button
            className="px-4 py-2 rounded-lg bg-[var(--color-blue_button_login)] text-white text-sm font-medium hover:bg-[var(--color-blue_button_login_hover)] transition"
            onClick={() => router.push("/recursos")}
          >
            Recursos TIC
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[var(--color-blue_button_login)] text-white text-sm font-medium hover:bg-[var(--color-blue_button_login_hover)] transition"
            onClick={() => router.push("/aula/view")}
          >
            {t("classrooms.create")}
          </button>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredClassrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </section>
  );
}