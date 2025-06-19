"use client";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@components/common/alerts/Alert";

export default function RecursosCard({ recursos, onDelete, onToggleStatus }) {
  const { t } = useTranslation();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToggleAlert, setShowToggleAlert] = useState(false);
  const router = useRouter();

  const handleDeleteClick = () => setShowDeleteAlert(true);

  const confirmDelete = () => {
    if (onDelete) onDelete(recursos.id);
  };

  const handleEdit = () => {
    router.push(`/recursos/editar?id=${recursos.id}`);
  };

  const handleToggleStatusClick = () => {
    setShowToggleAlert(true);
  };

  const confirmToggleStatus = () => {
    if (onToggleStatus) {
      onToggleStatus(recursos.id);
    }
  };

  const nombreRecurso = recursos.nombre || t("recursos.noName", "Recurso sin nombre");
  const isDisponible = recursos.estado === "DISPONIBLE";

  return (
    <>
      <div className="relative rounded-2xl border border-purple-300 shadow-md bg-white p-6 hover:shadow-xl transition-all flex flex-col justify-between">
        {/* Título + CRUD */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-black">{nombreRecurso}</h3>
          <div className="flex gap-3 text-gray-600">
            <Pencil
              className="w-5 h-5 cursor-pointer hover:text-purple-700"
              onClick={handleEdit}
            />
            <Trash2
              className="w-5 h-5 cursor-pointer hover:text-red-600"
              onClick={handleDeleteClick}
            />
            <Eye
              className="w-5 h-5 cursor-pointer hover:text-blue-600"
              onClick={handleToggleStatusClick}
            />
          </div>
        </div>

        {/* Info del recurso */}
        <div className="space-y-4 text-sm text-black">
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              {recursos.descripcion || t("recursos.noDescription", "Sin descripción")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              {t("recursos.quantity", "Cantidad")}: {recursos.cantidad || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isDisponible ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <span className="font-semibold">
              {isDisponible
                ? t("classrooms.status.available", "Disponible")
                : t("classrooms.status.unavailable", "No disponible")}
            </span>
          </div>
        </div>
      </div>

      {/* Alerta de eliminación */}
      {showDeleteAlert && (
        <Alert
          type="warning"
          message={t("alerts.deleteRecurso", { nombre: nombreRecurso })}
          showCancel={true}
          confirmText={t("alerts.actions.confirmDelete", "Sí, eliminar")}
          cancelText={t("alerts.actions.cancel", "Cancelar")}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}

      {/* Alerta de cambio de estado */}
      {showToggleAlert && (
        <Alert
          type="warning"
          message={
            isDisponible
              ? t("alerts.toggleDisableRecurso", { nombre: nombreRecurso })
              : t("alerts.toggleEnableRecurso", { nombre: nombreRecurso })
          }
          showCancel={true}
          confirmText={t("alerts.actions.confirmToggle", "Sí, cambiar estado")}
          cancelText={t("alerts.actions.cancel", "Cancelar")}
          onConfirm={confirmToggleStatus}
          onCancel={() => setShowToggleAlert(false)}
        />
      )}
    </>
  );
}
