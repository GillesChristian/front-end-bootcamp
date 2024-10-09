"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { House, LogOut, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TeacherSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
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
      <nav className="flex md:block p-4 md:p-6 ">
        <Link href="/teachers">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mb-2 text-sm md:text-base gap-2 hover:bg-blue-500 hover:text-white !py-4",
              pathname === "/teachers" && "bg-blue-500 text-white"
            )}
          >
            <House className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link href="/teachers/profile">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start mb-2 text-sm md:text-base gap-2 hover:bg-blue-500 hover:text-white !py-4",
              pathname === "/teachers/profile" && "bg-blue-500 text-white"
            )}
          >
            <UsersIcon className="mr-2 h-4 w-4" /> Profile
          </Button>
        </Link>
      </nav>
      <div className="p-4 flex">
        <Button
          variant="ghost"
          className=" justify-start w-full mt-48 text-sm md:text-base hover:text-white hover:bg-primary-foreground/10 rounded transition-colors"
          onClick={() => logout()}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
