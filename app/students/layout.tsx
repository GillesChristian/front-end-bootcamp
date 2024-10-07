// app/students/layout.tsx
import { StudentSidebar } from "@/components/StudentSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: LayoutProps) {
  return (
    <div className="student-layout w-screen">
      {/* Student Navigation */}
      <div className="fixed top-0 z-10 flex h-screen w-fit flex-col md:flex-row">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center h-screen w-full">
        {children}
      </main>
    </div>
  );
}
