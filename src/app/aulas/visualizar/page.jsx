import ClassroomList from "@/components/Classroom/ClassroomList";
import Header from "@/components/common/Navbar";

export default function AulasPage() {
  return (
    <div className="min-h-screen bg-[var(--color-general_body)] flex flex-col">
      <Header />
      <main className="flex-1">
        <ClassroomList />
      </main>
    </div>
  );
}
