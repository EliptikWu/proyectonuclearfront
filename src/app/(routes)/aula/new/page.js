"use client";

import AulaForm from "@components/Classroom/AulaForm";
import Header from "@components/common/Navbar";

export default function CrearAulaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Crear nueva aula</h1>
        <AulaForm mode="create" />
      </main>
    </div>
  );
}
