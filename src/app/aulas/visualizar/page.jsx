import ClassroomList from "@/components/Classroom/ClassroomList";
import Header from "@/components/common/Navbar";

export default function AulasPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-1 p-4">
                <ClassroomList />
            </main>
        </div>
    );
}
