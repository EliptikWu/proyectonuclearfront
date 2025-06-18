"use client";
import { Pencil, Trash2, Eye, Users, MapPin, Hash, Presentation } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RecursosCard({ recursos }) {
  const { t } = useTranslation();

  return (
    <div className="relative rounded-2xl border border-purple-300 shadow-md bg-white p-6 hover:shadow-xl transition-all flex flex-col justify-between">
      {/* Título + CRUD */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-black">
          {recursos.nombre || t(`recursos.sites.${recursos.site}`)}
        </h3>
        <div className="flex gap-3 text-gray-600">
          <Pencil className="w-5 h-5 cursor-pointer hover:text-purple-700" />
          <Trash2 className="w-5 h-5 cursor-pointer hover:text-red-600" />
          <Eye className="w-5 h-5 cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Info del recurso */}
      <div className="space-y-4 text-sm text-black">
        <div className="flex items-center gap-3">
          <span className="font-semibold">{recursos.descripcion || "Sin descripción"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold">Cantidad: {recursos.cantidad || 0}</span>
        </div>
      </div>
    </div>
  );
}