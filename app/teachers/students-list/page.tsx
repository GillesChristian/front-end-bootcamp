"use client";
import { StudentTableSkeleton } from "@/components/StudentTableSkeleton";
import { StudentInfo } from "@/components/student-info";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteStudent } from "@/hooks/use-delete-student";
import { useStudents } from "@/hooks/use-students";
import { toast } from "@/hooks/use-toast";
import { cn, splitUsername } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
interface Student {
  id: string;
  username: string;
  email: string;
  date_of_birth?: string;
}

export default function StudentsList() {
  const { students, loading, error, setStudents, refetchStudents } =
    useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const onDeleteSuccess = () => {
    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== selectedStudent.id)
      );
      setSelectedStudent(null);
      toast({
        title: "Student deleted",
        description:
          "The student has been successfully removed from the system.",
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

  if (loading)
    return (
      <div className="container h-screen ml-[230px] px-20 py-5 flex flex-col gap-20">
        <StudentTableSkeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(students) || students.length === 0)
    return <div>No students found.</div>;

  const formattedStudents: Student[] = students.map((student) => ({
    ...student,
    date_of_birth: student.date_of_birth || "",
  }));

  return (
    <>
      <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
        <Link href="/teachers/add-students">
          <Button
            size="lg"
            className="bg-[rgba(80,156,219,1)] hover:bg-[rgba(80,156,219,.8)]"
          >
            Add Student
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <Table className="w-[620px]">
            <TableHeader className="px-2 py-4 bg-blue-950 hover:bg-blue-950 text-white">
              <TableRow className="text-gray-500 font-bold">
                <TableHead className="px-2 py-4 text-white">
                  Student ID
                </TableHead>
                <TableHead className="px-2 py-4 text-white">
                  First Name
                </TableHead>
                <TableHead className="px-2 py-4 text-white">
                  Last Name
                </TableHead>
                <TableHead className="px-2 py-4 text-white">
                  Email Address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedStudents.map((student) => {
                const { firstName, lastName } = splitUsername(student.username);
                return (
                  <TableRow
                    key={student.id}
                    className={cn(
                      "transition-all ease-in-out duration-200 hover:bg-[#509CDB] hover:text-white px-2 py-4 text-gray-500 ",
                      selectedStudent?.id === student.id
                        ? "bg-[#509CDB] text-white"
                        : "odd:bg-blue-50"
                    )}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <TableCell className="px-2 py-4">
                      {100 + student.id}
                    </TableCell>
                    <TableCell className="px-2 py-4">{firstName}</TableCell>
                    <TableCell className="px-2 py-4">{lastName}</TableCell>
                    <TableCell className="px-2 py-4">{student.email}</TableCell>
                  </TableRow>
                );
              })}
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
    </>
  );
}
