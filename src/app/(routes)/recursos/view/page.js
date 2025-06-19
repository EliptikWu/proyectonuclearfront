"use client";
import RecursosHeader from "@components/Recursos/RecursosHeader.jsx";
import RecursosCard from "@components/Recursos/RecursosCard.jsx";
import recursos from "@data/recursos.js";
import { useState } from "react";
import Header from "@components/common/Navbar";

export default function RecursosPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecursos = recursos.filter((recurso) =>
    recurso.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-general_body)] flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <RecursosHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredRecursos.map((recurso) => (
            <RecursosCard key={recurso.id} recursos={recurso} />
          ))}
        </div>
      </main>
    </div>
  );
}