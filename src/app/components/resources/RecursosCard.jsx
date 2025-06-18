"use client";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@components/common/alerts/Alert";

export default function RecursosCard({ recursos, onDelete }) {
  const { t } = useTranslation();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const router = useRouter();

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (onDelete) onDelete(recursos.id);
  };

  const handleEdit = () => {
    router.push(`/recursos/editar?id=${recursos.id}`);
  };

  const handleView = () => {
    router.push(`/recursos/ver?id=${recursos.id}`);
  };

const nombreRecurso = recursos.nombre || t("recursos.noName", "Recurso sin nombre");


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
              onClick={handleView}
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
        </div>
      </div>

      {/* Alerta de confirmación */}
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
    </>
  );
}
