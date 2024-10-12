"use client";

import AddUserForm from "@/components/AddUserForm";
import { Toaster } from "@/components/ui/toaster";

export default function AddInstructor() {
  return (
    <div className="container ml-[256px] w-full px-20 py-5 flex flex-col items-center justify-center mx-auto gap-10 text-left">
      <h2 className="text-left text-4xl self-start ml-44 font-semibold text-gray-400">
        Add Instructor
      </h2>
      <AddUserForm status="instructor" />
      <Toaster />
    </div>
  );
}
