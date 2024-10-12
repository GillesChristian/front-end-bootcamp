import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ClientComponent } from "@/components/ClientComponent";

export const metadata: Metadata = {
  title: "School Management System",
  description: "A Next.js app for managing school data",
  icons: {
    icon: "/logo.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white text-foreground">
        <AuthProvider>
          <main className="flex items-center justify-center h-screen w-full">
            <ClientComponent>{children}</ClientComponent>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
