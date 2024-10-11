"use client";

import AddStudentForm from "@/components/AddStudentForm";
import { Toaster } from "@/components/ui/toaster";

const AddStudent = () => {
  return (
    <div className="container ml-[256px] w-full px-20 py-5 flex flex-col items-center justify-center gap-20 text-left">
      <h2 className="text-left text-4xl font-semibold text-gray-400">
        Add Student
      </h2>
      <AddStudentForm />
      <Toaster />
    </div>
  );
};

export default AddStudent;
