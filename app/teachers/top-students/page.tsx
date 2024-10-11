"use client";
import { StudentTableSkeleton } from "@/components/StudentTableSkeleton";
import { TopStudentInfo } from "@/components/TopStudentInfo";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTopStudents } from "@/hooks/use-top-studens";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
}

export default function page() {
  const { topStudents, loading, error } = useTopStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (loading)
    return (
      <div className="container h-screen ml-[230px] px-20 py-5 flex flex-col gap-20">
        <StudentTableSkeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(topStudents) || topStudents.length === 0)
    return <div>Grade have not be assigned to students yet.</div>;

  const formattedStudents: Student[] = topStudents.map((student) => ({
    ...student,
    date_of_birth: student.date_of_birth || "",
  }));

  return (
    <>
      <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Top Student List
        </h2>
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
              {formattedStudents.map((student) => (
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
                  <TableCell className="px-2 py-4">
                    {student.first_name}
                  </TableCell>
                  <TableCell className="px-2 py-4">
                    {student.last_name}
                  </TableCell>
                  <TableCell className="px-2 py-4">{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TopStudentInfo student={selectedStudent} />
        </div>
      </div>
    </>
  );
}
