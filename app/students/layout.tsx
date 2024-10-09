"use client";

import { StudentSidebar } from "@/components/StudentSideBar";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: LayoutProps) {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role !== "student") {
    return <p> You don't have authorization for this route!!!</p>;
  }
  return (
    <>
      {isAuthenticated && user?.role === "student" && (
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
      )}
    </>
  );
}
