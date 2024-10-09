"use client";

import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role !== "admin") {
    return <p> You don't have authorization for this route!!!</p>;
  }
  return (
    <>
      {isAuthenticated && user?.role === "admin" && (
        <div className="admin-layout w-screen">
          {/* Admin Navigation */}
          <div className="fixed top-0 z-10 flex h-screen w-fit flex-col md:flex-row">
            {/* <AdminSidebar /> */}
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
