"use client";
// import type { Metadata } from "next";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "School Management System",
//   description: "A Next.js app for managing school data",
// };

import { AuthProvider } from "@/context/AuthContext";
interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white text-foreground">
        <AuthProvider>
          <main className="flex items-center justify-center h-screen w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
