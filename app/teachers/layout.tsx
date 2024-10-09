"use client";

import { TeacherSidebar } from "@/components/ui/TeacherSideBar";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: LayoutProps) {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role !== "teacher") {
    return <p> You don't have authorization for this route!!!</p>;
  }
  return (
    <>
      {isAuthenticated && user?.role === "teacher" && (
        <div className="teacher-layout w-screen">
          {/* Teacher Navigation */}
          <div className="fixed top-0 z-10 flex h-screen w-fit flex-col md:flex-row">
            <TeacherSidebar />
          </div>

          {/* Main Content */}
          <main className="flex items-center justify-center h-screen w-full">
            {children}
          </main>
        </div>
      )}
    </>
  );
}
