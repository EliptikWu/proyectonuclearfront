"use client";
import { useTranslation } from "react-i18next";

export default function ClassroomCard({ classroom }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-purple-200 shadow-md bg-[var(--color-principal_container)] p-4 flex flex-col justify-between hover:shadow-lg transition">
      <h3 className="font-bold text-xl text-[var(--color-principal_purple)] mb-2">
        {t(`classrooms.sites.${classroom.site}`)}
      </h3>

      <div className="flex flex-col gap-2 text-[var(--color-black_text)] text-sm mb-4">
        <span>
          {t("classrooms.capacity", { count: classroom.capacity })}
        </span>
        <span>
          {t("classrooms.room", { room: classroom.room })}
        </span>
        <span>{t(`classrooms.resources.${classroom.resources}`)}</span>
      </div>

      <button
        className="mt-auto text-white font-semibold py-2 px-4 rounded-lg bg-[var(--color-blue_button_login)] hover:bg-[var(--color-blue_button_login_hover)]"
      >
        {t("classrooms.details")}
      </button>
    </div>
  );
}
