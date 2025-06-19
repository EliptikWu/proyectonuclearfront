"use client";
import {
  Pencil,
  Trash2,
  Eye,
  Users,
  MapPin,
  Hash,
  Presentation,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@components/common/alerts/Alert";

export default function ClassroomCard({ classroom, onDelete, onToggle, onEdit }) {
  const { t } = useTranslation();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToggleStatusAlert, setShowToggleStatusAlert] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      if (onDelete) await onDelete(classroom._id);
    } catch (error) {
      console.error("Error eliminando aula:", error);
    } finally {
      setShowDeleteAlert(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(classroom._id); // Usar función externa (preferido)
    } else {
      router.push(`/aula/edit?id=${classroom._id}`); // fallback
    }
  };

  const handleToggleStatus = () => {
    setShowToggleStatusAlert(true);
  };

  const confirmToggleStatus = async () => {
    try {
      if (onToggle) await onToggle(classroom._id);
    } catch (error) {
      console.error("Error cambiando estado del aula:", error);
    } finally {
      setShowToggleStatusAlert(false);
    }
  };

  return (
    <div className="relative rounded-2xl border border-purple-300 shadow-md bg-white p-6 hover:shadow-xl transition-all flex flex-col justify-between">
      {/* Header con acciones */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-black">
          {t(`classrooms.sites.${classroom.site}`)}
        </h3>
        <div className="flex gap-3 text-gray-600">
          <Pencil
            className="w-5 h-5 cursor-pointer hover:text-purple-700"
            onClick={handleEdit}
          />
          <Trash2
            className="w-5 h-5 cursor-pointer hover:text-red-600"
            onClick={handleDelete}
          />
          <Eye
            className="w-5 h-5 cursor-pointer hover:text-blue-600"
            onClick={handleToggleStatus}
          />
        </div>
      </div>

      {/* Detalles del aula */}
      <div className="space-y-4 text-sm text-black">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">{classroom.capacity} estudiantes</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">
            {t(`classrooms.sites.${classroom.site}`)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Hash size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">{classroom.room}</span>
        </div>
        <div className="flex items-center gap-3">
          <Presentation size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">
            {t(`classrooms.resources.${classroom.resources}`)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`w-3 h-3 rounded-full ${
              classroom.estado === "DISPONIBLE" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="font-semibold">
            {classroom.estado === "DISPONIBLE"
              ? t("classrooms.status.available", "Disponible")
              : t("classrooms.status.unavailable", "No disponible")}
          </span>
        </div>
      </div>

      {/* Alerta eliminar */}
      {showDeleteAlert && (
        <Alert
          type="warning"
          message={t("alerts.deleteClassroom", { room: classroom.room })}
          showCancel
          confirmText={t("alerts.actions.confirmDelete", "Sí, eliminar")}
          cancelText={t("alerts.actions.cancel", "Cancelar")}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}

      {/* Alerta cambiar estado */}
      {showToggleStatusAlert && (
        <Alert
          type="warning"
          message={
            classroom.estado === "DISPONIBLE"
              ? t("alerts.toggleDisableClassroom", { room: classroom.room })
              : t("alerts.toggleEnableClassroom", { room: classroom.room })
          }
          showCancel
          confirmText={t("alerts.actions.confirmToggle", "Sí, cambiar estado")}
          cancelText={t("alerts.actions.cancel", "Cancelar")}
          onConfirm={confirmToggleStatus}
          onCancel={() => setShowToggleStatusAlert(false)}
        />
      )}
    </div>
  );
}
