import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "School Management System",
  description: "A Next.js app for managing school data",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white text-foreground">
        {/* <div className="fixed top-0 z-10 flex h-screen w-fit flex-col md:flex-row">
          <Sidebar />
        </div> */}
        <main className="flex items-center justify-center h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
