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
import { useDeleteInstructor } from "@/hooks/use-delete-instructor";
import { Instructor, UseInstructors } from "@/hooks/use-instructors";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function page() {
  const { instructors, loading, error, setInstructors, refetchInstructor } =
    UseInstructors();
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  const { toast } = useToast();

  const onDeleteSuccess = () => {
    if (selectedInstructor) {
      setInstructors((prevInstructors) =>
        prevInstructors.filter(
          (instructor) => instructor.id !== selectedInstructor.id
        )
      );
      setSelectedInstructor(null);
      toast({
        title: "Instructor deleted",
        description:
          "The instructor has been successfully removed from the system.",
      });
      refetchInstructor();
    }
  };

  const {
    deleteInstructor,
    isDeleting,
    error: deleteError,
  } = useDeleteInstructor(onDeleteSuccess);

  const handleDeleteInstructor = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this Instructor?")) {
      await deleteInstructor(id);
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
    return <div>No instructor Found.</div>;

  const formattedInstructor: Instructor[] = instructors.map((instructor) => ({
    ...instructor,
    date_of_birth: instructor.date_of_birth || "",
  }));

  return (
    <>
      <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
        <Link href="/teachers/add-instructor">
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
                  Assign Subject
                </TableHead>
                <TableHead className="px-2 py-4 text-white">
                  Email Address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedInstructor.map((instructor) => (
                <TableRow
                  key={instructor.id}
                  className={cn(
                    "transition-all ease-in-out duration-200 hover:bg-[#509CDB] hover:text-white px-2 py-4 text-gray-500 ",
                    selectedInstructor?.id === instructor.id
                      ? "bg-[#509CDB] text-white"
                      : "odd:bg-blue-50"
                  )}
                  onClick={() => setSelectedInstructor(instructor)}
                >
                  <TableCell className="px-2 py-4">
                    {100 + instructor.id}
                  </TableCell>
                  <TableCell className="px-2 py-4">
                    {instructor.first_name}
                  </TableCell>
                  <TableCell className="px-2 py-4">
                    {instructor.last_name}
                  </TableCell>
                  <TableCell className="px-2 py-4">
                    {instructor.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <StudentInfo
            student={selectedInstructor}
            onDelete={handleDeleteInstructor}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </>
  );
}
