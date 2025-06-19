"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import RecursosCard from "./RecursosCard";
import { getRecursos, deleteRecurso } from "@/services/recursosService";

export default function RecursosList() {
  const { t } = useTranslation();
  const [recursos, setRecursos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecursos();
        setRecursos(data);
      } catch (error) {
        console.error("Error cargando recursos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este recurso?");
    if (!confirm) return;
    try {
      await deleteRecurso(id);
      setRecursos((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error al eliminar recurso:", err);
    }
  };

  const filteredRecursos = recursos.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.nombre?.toLowerCase().includes(searchLower) ||
      item.cantidad?.toString().includes(searchLower) ||
      item.descripcion?.toLowerCase().includes(searchLower) ||
      item.id?.includes(searchLower)
    );
  });

  if (loading) {
    return <p className="text-center py-10">Cargando recursos...</p>;
  }

  return (
    <section className="p-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {/* Título y buscador */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-[var(--color-principal_purple)]">
            {t("recursos.title")}
          </h2>
          <input
            type="text"
            placeholder="Buscar por nombre, descripción, ID o cantidad..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue_button_login)] bg-white text-black placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-2 justify-end w-full md:w-auto">
          <button
            className="px-4 py-2 rounded-lg bg-[var(--color-principal_purple)] text-white text-sm font-medium hover:bg-purple-900 transition"
            onClick={() => router.push("/aulas/visualizar")}
          >
            Aulas
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[var(--color-blue_button_login)] text-white text-sm font-medium hover:bg-[var(--color-blue_button_login_hover)] transition"
            onClick={() => router.push("/recursos")}
          >
            {t("recursos.create")}
          </button>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredRecursos.map((item) => (
          <RecursosCard
            key={item.id}
            recursos={item}
            onDelete={handleDelete}
            onToggleStatus={() => {}} // Puedes conectar esto luego si tu API lo soporta
          />
        ))}
      </div>
    </section>
  );
}
