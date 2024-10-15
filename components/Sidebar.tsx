"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { House, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex h-screen flex-col gap-5 max-w-64 bg-blue-900 text-white">
      <div className="mb-6 md:mb-8 w-full flex items-center md:block p-4 md:p-6">
        <div className="w-full flex items-center justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Udemy Inter. school logo"
            width={65}
            height={65}
            className="mr-2 md:mr-0 md:mb-2"
          />
        </div>
        <h2 className="text-lg md:text-xl font-bold">Udemy Inter. school</h2>
      </div>
      <hr className="w-full" />
      <nav className="flex md:block p-4 md:p-6">
        <Link href="/">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mb-2 text-sm md:text-base gap-2 hover:bg-blue-500 hover:text-white !py-4",
              pathname === "/" && "bg-blue-500 text-white"
            )}
          >
            <House className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link href="/students">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mb-2 text-sm md:text-base gap-2 hover:bg-blue-500 hover:text-white !py-4",
              (pathname === "/students" || pathname.startsWith("/students/")) && "bg-blue-500 text-white"
            )}
          >
            <UsersIcon className="mr-2 h-4 w-4" /> Students
          </Button>
        </Link>
        <Link href="/students">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mb-2 text-sm md:text-base gap-2 hover:bg-blue-500 hover:text-white !py-4",
              (pathname === "students/academicReport" || pathname.startsWith("/students/academicReport")) && "bg-blue-500 text-white"
            )}
          >
            <UsersIcon className="mr-2 h-4 w-4" /> Academic Report
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
