"use client";

import { EditStudentForm } from "@/components/EditStudentForm";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";

function EditStudentPage() {
  const { id } = useParams();
  const studentId = Array.isArray(id) ? id[0] : id;
  return (
    <div className="container ml-[256px] w-full px-20 py-5 flex flex-col items-center justify-center gap-20 text-left">
      <h2 className="text-4xl font-semibold text-gray-400">Edit User</h2>
      <EditStudentForm params={{ id: studentId }} />
      <Toaster />
    </div>
  );
}

export default EditStudentPage;
