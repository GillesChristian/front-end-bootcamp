// app/students/layout.tsx
import { TeacherSidebar } from "@/components/ui/TeacherSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: LayoutProps) {
  return (
    <div className="student-layout w-screen">
      {/* Teacher Navigation */}
      <div className="fixed top-0 z-10 flex h-screen w-fit flex-col md:flex-row">
        <TeacherSidebar />
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center h-screen w-full">
        {children}
      </main>
    </div>
  );
}
