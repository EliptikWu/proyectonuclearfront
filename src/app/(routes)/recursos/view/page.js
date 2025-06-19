"use client";
import { useEffect, useState } from "react";
import Header from "@components/common/Navbar";
import RecursosHeader from "@components/Recursos/RecursosHeader";
import RecursosCard from "@components/Recursos/RecursosCard";
import { getRecursos, deleteRecurso, toggleEstadoRecurso } from "@services/recursosService";

export default function RecursosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecursos();
        setRecursos(data);
      } catch (error) {
        console.error("Error al cargar recursos desde la API:", error);
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
    } catch (error) {
      console.error("Error al eliminar recurso:", error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleEstadoRecurso(id);
      setRecursos((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: updated.estado } : r))
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const filteredRecursos = recursos.filter((recurso) =>
    recurso.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-general_body)] flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <RecursosHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {loading ? (
          <p className="text-center py-10">Cargando recursos...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredRecursos.map((recurso) => (
              <RecursosCard
                key={recurso.id}
                recursos={recurso}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
