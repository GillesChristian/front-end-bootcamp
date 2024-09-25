"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useStudents } from "@/hooks/use-students";
import { useDeleteStudent } from "@/hooks/use-delete-student";
import { StudentInfo } from "@/components/student-info";
import { StudentTableSkeleton } from "@/components/StudentTableSkeleton";
import { toast } from "@/hooks/use-toast";

// Define the Student interface
interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
}

export default function StudentDashboard() {
  const { students, loading, error, setStudents, refetchStudents } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const onDeleteSuccess = () => {
    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== selectedStudent.id)
      );
      setSelectedStudent(null);
      toast({
        title: "Student deleted",
        description: "The student has been successfully removed from the system.",
      });
      refetchStudents();
    }
  };

  const {
    deleteStudent,
    isDeleting,
    error: deleteError,
  } = useDeleteStudent(onDeleteSuccess);

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  };

  if (loading) return <StudentTableSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(students) || students.length === 0) return <div>No students found.</div>;

  const formattedStudents: Student[] = students.map(student => ({
    ...student,
    date_of_birth: student.date_of_birth || "",
  }));

  return (
    <div className="container h-screen ml-[256px] px-20 py-5 flex flex-col gap-20">
      <Link href="/students/add">
        <Button
          size="lg"
          className="bg-[rgba(80,156,219,1)] hover:bg-[rgba(80,156,219,.8)]"
        >
          Add Student
        </Button>
      </Link>
      <div className="flex items-start justify-between">
        <Table className="w-[600px]">
          <TableHeader className="px-2 py-4">
            <TableRow className="text-gray-500 font-bold">
              <TableHead className="px-2 py-4">First Name</TableHead>
              <TableHead className="px-2 py-4">Last Name</TableHead>
              <TableHead className="px-2 py-4">Student ID</TableHead>
              <TableHead className="px-2 py-4">Email Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedStudents.map((student) => (
              <TableRow
                key={student.id}
                className={cn(
                  "transition-all ease-in-out duration-200 hover:bg-[#509CDB] hover:text-white px-2 py-4 text-gray-400",
                  selectedStudent?.id === student.id && "bg-[#509CDB] text-white"
                )}
                onClick={() => setSelectedStudent(student)}
              >
                <TableCell className="px-2 py-4">{student.first_name}</TableCell>
                <TableCell className="px-2 py-4">{student.last_name}</TableCell>
                <TableCell className="px-2 py-4">{student.id}</TableCell>
                <TableCell className="px-2 py-4">{student.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <StudentInfo
          student={selectedStudent}
          onDelete={handleDeleteStudent}
          isDeleting={isDeleting}
        />
      </div>
      {deleteError && (
        <div className="text-red-500 mt-2">
          Error deleting student: {deleteError}
        </div>
      )}
    </div>
  );
}
