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
import { TopStudent, useTopStudents } from "@/hooks/use-top-studens";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TopStudents() {
  const { topStudents, loading, error } = useTopStudents();
  const [selectedStudent, setSelectedStudent] = useState<TopStudent | null>(
    null
  );
  let count: number = 0;

  if (loading)
    return (
      <div className="container h-screen ml-[230px] px-20 py-5 flex flex-col gap-10">
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Top Student List
        </h2>
        <StudentTableSkeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(topStudents) || topStudents.length === 0)
    return <div>Grade has not been assigned to students yet.</div>;

  const formattedStudents: TopStudent[] = topStudents.map((student) => ({
    ...student,
    date_of_birth: student.dateOfBirth || "",
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
                <TableHead className="px-2 py-4 text-white">Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedStudents.map((student) => {
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
                    <TableCell className="px-2 py-4">
                      {student.firstName}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      {student.lastName}
                    </TableCell>
                    <TableCell className="px-2 py-4">{student.email}</TableCell>
                    <TableCell className="px-2 py-4">{++count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TopStudentInfo student={selectedStudent} />
        </div>
      </div>
    </>
  );
}
