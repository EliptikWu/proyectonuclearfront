"use client";
import ClassroomHeader from "@components/Classroom/ClassroomHeader";
import ClassroomCard from "@components/Classroom/ClassroomCard";
import classrooms from "@data/classrooms"; 
import { useState } from "react";
import Header from "@components/common/Navbar"; 

export default function AulasVisualizar() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.room.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[var(--color-general_body)] flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <ClassroomHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredClassrooms.map((classroom) => (
            <ClassroomCard key={classroom.id} classroom={classroom} />
          ))}
        </div>
      </main>
    </div>
  );
}
