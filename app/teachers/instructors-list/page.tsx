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
import { Instructor, UseInstructors } from "@/hooks/use-instructors";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function InstructorsList() {
  const { instructors, loading, error, setInstructors, refetchInstructor } =
    UseInstructors();
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  const onDeleteSuccess = () => {
    if (selectedInstructor) {
      setInstructors((prevStudents) =>
        prevStudents.filter(
          (instructor) => instructor.id !== selectedInstructor.id
        )
      );
      setSelectedInstructor(null);
      toast({
        title: "Student deleted",
        description:
          "The student has been successfully removed from the system.",
      });
      refetchInstructor();
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
  if (!Array.isArray(instructors) || instructors.length === 0)
    return <div>No students found.</div>;

  const formattedInstructors: Instructor[] = instructors.map((instructor) => ({
    ...instructor,
    dateOfBirth: instructor.dateOfBirth || "",
  }));

  return (
    <>
      <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
        <Link href="/teachers/add-instructors">
          <Button
            size="lg"
            className="bg-[rgba(80,156,219,1)] hover:bg-[rgba(80,156,219,.8)]"
          >
            Add Instructor
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <Table className="w-[620px]">
            <TableHeader className="px-2 py-4 bg-blue-950 hover:bg-blue-950 text-white">
              <TableRow className="text-gray-500 font-bold">
                <TableHead className="px-2 py-4 text-white">
                  Instructor ID
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
              {formattedInstructors.map((instructor) => {
                return (
                  <TableRow
                    key={instructor.id}
                    className={cn(
                      "transition-all ease-in-out duration-200 hover:bg-[#509CDB] hover:text-white px-2 py-4 text-gray-500 ",
                      selectedInstructor?.email === instructor.email
                        ? "bg-[#509CDB] text-white"
                        : "odd:bg-blue-50"
                    )}
                    onClick={() => setSelectedInstructor(instructor)}
                  >
                    <TableCell className="px-2 py-4">
                      {100 + instructor.id}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      {instructor.firstName}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      {instructor.lastName}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      {instructor.email}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <StudentInfo
            student={selectedInstructor}
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
