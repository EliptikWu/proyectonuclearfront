"use client";

import { useEffect, useState } from "react";
import Header from "@components/common/Navbar";
import ClassroomHeader from "@components/Classroom/ClassroomHeader";
import ClassroomCard from "@components/Classroom/ClassroomCard";
import {
  getAllAulas,
  deleteAula,
  updateAula,
} from "@services/aulasService";

export default function AulasVisualizar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Cargar aulas desde el backend
  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const data = await getAllAulas();
        const transformed = data.map((aula) => ({
          _id: aula.id,
          room: aula.nombre,
          capacity: aula.capacidad,
          estado: aula.estado === "LIBRE" ? "DISPONIBLE" : "NO_DISPONIBLE",
          site: "sede1", // puedes adaptar este campo si tienes sedeId
          resources:
            aula.recursos?.map((r) => r.nombre).join(", ") || "Sin recursos",
        }));
        setAulas(transformed);
      } catch (error) {
        console.error("❌ Error al obtener aulas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAulas();
  }, []);

  // ✅ Eliminar aula
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta aula?");
    if (!confirm) return;

    try {
      await deleteAula(id);
      setAulas((prev) => prev.filter((aula) => aula._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar aula:", error.message);
    }
  };

  // ✅ Editar aula (redirección)
  const handleEdit = (id) => {
    window.location.href = `/aula/edit/${id}`;
  };

  // ✅ Cambiar estado del aula (LIBRE ↔ INHABILITADA)
  const handleToggle = async (id) => {
    try {
      const aula = aulas.find((a) => a._id === id);

      const newEstadoBackend =
        aula.estado === "DISPONIBLE" ? "INHABILITADA" : "LIBRE";

      const updatedAula = {
        nombre: aula.room,
        capacidad: aula.capacity,
        estado: newEstadoBackend,
        sedeId: "1",
        tipo: "TEORICA", // puedes cambiar si es dinámica
        recursos: [],
        configuracion: null,
        descripcionEstado:
          newEstadoBackend === "LIBRE" ? "Libre" : "no habilitada",
      };

      await updateAula(id, updatedAula);

      // Actualizar en UI
      setAulas((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                estado:
                  newEstadoBackend === "LIBRE"
                    ? "DISPONIBLE"
                    : "NO_DISPONIBLE",
              }
            : a
        )
      );
    } catch (error) {
      console.error("❌ Error al cambiar estado del aula:", error.message);
    }
  };

  // ✅ Filtro de búsqueda
  const filteredAulas = aulas.filter((aula) =>
    aula.room?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-general_body)] flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <ClassroomHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {loading ? (
          <p className="text-center py-10">Cargando aulas...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredAulas.map((classroom) => (
              <ClassroomCard
                key={classroom._id}
                classroom={classroom}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
