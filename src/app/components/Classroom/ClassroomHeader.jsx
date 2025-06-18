"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function ClassroomHeader({ searchQuery, setSearchQuery }) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      {/* Título y búsqueda */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto">
        <h2 className="text-2xl font-bold text-[var(--color-principal_purple)]">
          {t("classrooms.title")}
        </h2>
        <input
          type="text"
          placeholder="Buscar por número de aula..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="[&>label]:text-black mt-2 md:mt-0 w-full md:w-[300px] border border-gray-400 rounded-md px-4 py-2 text-sm shadow-sm bg-white text-black placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-principal_purple)]"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 justify-end">
        <button className="bg-[var(--color-blue_button_login)] hover:bg-[var(--color-blue_button_login_hover)] text-white text-sm px-4 py-2 rounded-md">
          {t("classrooms.create")}
        </button>

        <button
          className="bg-[var(--color-principal_purple)] hover:bg-purple-900 text-white text-sm px-4 py-2 rounded-md"
          onClick={() => router.push("/recursos")}
        >
          Recursos TIC
        </button>
        <button className="bg-[var(--color-principal_purple)] hover:bg-purple-900 text-white text-sm px-4 py-2 rounded-md">
          Auditoria
        </button>
      </div>
    </div>
  );
}