"use client";
import { Clock, User, FileText, ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";
import Navbar from "@components/common/Navbar";
import { useRouter } from "next/navigation";

export default function VisualizarAuditoria({ auditorias = [], handleCancel = () => {} }) {
  const router = useRouter(); 

  return (
    <div className="min-h-screen w-full bg-principal_container">
      <Navbar />

      {/* Encabezado con ícono y título */}
      <div className="flex items-center mb-6 px-12 py-8">
        <ChevronLeft
          className="w-6 h-6 text-black_text mr-2 cursor-pointer"
          onClick={() => router.push("/aula/view")} 
        />
        <h2 className="text-2xl font-bold text-gray-800">Historial de Auditoría</h2>
      </div>

      {auditorias.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-500 text-lg">No hay registros de auditoría disponibles.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {auditorias.map((auditoria) => (
            <li key={auditoria.id} className="border border-gray-300 rounded-xl bg-white shadow-sm">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-sm font-medium capitalize px-2 py-1 rounded-full ${
                      auditoria.accion === "creación"
                        ? "bg-green-100 text-green-700"
                        : auditoria.accion === "modificación"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {auditoria.accion}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    {new Date(auditoria.fecha).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                  <User size={16} /> <span className="font-medium">{auditoria.usuario}</span>
                </div>
                <div className="text-sm text-gray-800 flex items-start gap-2">
                  <FileText size={16} className="mt-1" /> {auditoria.detalles}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

VisualizarAuditoria.propTypes = {
  auditorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fecha: PropTypes.string.isRequired,
      accion: PropTypes.oneOf(["creación", "modificación", "eliminación"]).isRequired,
      usuario: PropTypes.string.isRequired,
      detalles: PropTypes.string.isRequired,
    })
  ),
  handleCancel: PropTypes.func,
};
