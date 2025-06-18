"use client";
import { Pencil, Trash2, Eye, Users, MapPin, Hash, Presentation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@components/common/alerts/Alert";

export default function ClassroomCard({ classroom, onDelete }) {
  const { t } = useTranslation();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (onDelete) onDelete(classroom.id);
  };

  const handleEdit = () => {
    router.push(`/aulas/editar`);
  };

  return (
    <div className="relative rounded-2xl border border-purple-300 shadow-md bg-white p-6 hover:shadow-xl transition-all flex flex-col justify-between">
      {/* Título + CRUD */}
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
          <Eye className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Info del aula */}
      <div className="space-y-4 text-sm text-black">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">{classroom.capacity} estudiantes</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-[var(--color-principal_purple)]" />
          <span className="font-semibold">{t(`classrooms.sites.${classroom.site}`)}</span>
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
      </div>

      {/* Alerta de confirmación */}
      {showDeleteAlert && (
        <Alert
          type="warning"
          message={t("alerts.deleteClassroom", { room: classroom.room })}
          showCancel={true}
          confirmText={t("alerts.actions.confirmDelete", "Sí, eliminar")}
          cancelText={t("alerts.actions.cancel", "Cancelar")}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
}
