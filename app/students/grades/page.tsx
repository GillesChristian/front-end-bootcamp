"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { StudentTableSkeleton } from "@/components/StudentTableSkeleton";
import { useGradeStudents } from "@/hooks/use-grade-students";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { decode } from "jsonwebtoken";
import { Grade } from "@/hooks/use-grades";

const StudentGrades = () => {
  const { loading, error, getGrades } = useGradeStudents();
  const [grades, setGrades] = useState<Grade>(null);
  const [studentInfo, setStudentInfo] = useState<{
    id: string;
    email: string;
  } | null>(null);

  // Fetch grades for the authenticated student when the component mounts
  useEffect(() => {
    const token = getToken();
    const decodeToken: { id: string; email: string } | null = decode(token);

    const fetchGrades = async () => {
      if (decodeToken && decodeToken.id) {
        const fetchedGrades = await getGrades(decodeToken?.id);
        if (fetchedGrades) {
          setGrades(fetchedGrades);
          setStudentInfo({
            id: decodeToken?.id,
            email: decodeToken?.email || "Unknown",
          });
        }
      }
    };

    fetchGrades();
  }, []);

  if (loading) {
    return (
      <div className="container h-screen w-full ml-[230px] px-20 py-5 flex flex-col gap-20">
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Academic Performances
        </h2>
        <StudentTableSkeleton />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const averageGrade = () => {
    if (!grades) return null;

    const numericGrades = Object.entries(grades)
      .filter(([subject]) => subject !== "student_id")
      .map(([, grade]) => (typeof grade === "number" ? grade : 0)); // Convert grades to numbers, replace non-numeric with 0

    const total = numericGrades.reduce((sum, grade) => sum + grade, 0);
    const count = numericGrades.length;

    return count > 0 ? (total / count).toFixed(2) : null;
  };

  return (
    <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
      <div>
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Academic Performances
        </h2>
        <h3 className=" text-xl font-semibold text-gray-500 mt-6">
          Student ID: {studentInfo?.id}
        </h3>
        <h3 className=" text-xl font-semibold text-gray-500 mt-2">
          Email: {studentInfo?.email}
        </h3>
        <h3 className=" text-xl font-semibold text-gray-500 mt-2">
          Average Grade: {averageGrade() !== null ? averageGrade() : "N/A"}
        </h3>
      </div>
      <div className="flex items-start justify-between">
        <Table className="w-[620px]">
          <TableHeader className="px-2 py-4 bg-blue-950 hover:bg-blue-950 text-white">
            <TableRow className="text-gray-500 font-bold">
              <TableHead className="px-2 py-4 text-white">Subject</TableHead>
              <TableHead className="px-2 py-4 text-white">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades ? (
              Object.entries(grades).map(
                ([subject, grade]) =>
                  subject !== "student_id" && ( // Only render if subject is not 'student_id'
                    <TableRow key={subject} className="odd:bg-blue-50">
                      <TableCell className="px-2 py-4">
                        {subject.replace("_", " ").toUpperCase()}
                      </TableCell>
                      <TableCell className="px-2 py-4">{grade}</TableCell>
                    </TableRow>
                  )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No grades available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentGrades;
