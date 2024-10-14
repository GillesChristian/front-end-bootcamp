"use client";
import { useEffect, useState } from "react";
import { StudentTableSkeleton } from "@/components/StudentTableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student, User } from "@/hooks/use-students";
import { useStudents } from "@/hooks/use-students";
import { cn, splitUsername } from "@/lib/utils";
import { useGradeStudents } from "@/hooks/use-grade-students";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";

interface Grade {
  pure_maths: number;
  biology: number;
  physics: number;
  chemistry: number;
  computer_science: number;
}

export default function GradeStudents() {
  const { error, updateGrades, getGrades } = useGradeStudents();
  const { students, loading } = useStudents();
  const [grades, setGrades] = useState<{ [key: string]: Grade }>({});
  const { toast } = useToast();

  if (loading)
    return (
      <div className="container h-screen w-full ml-[230px] px-20 py-5 flex flex-col gap-20">
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Grade Students
        </h2>
        <StudentTableSkeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!Array.isArray(students) || students.length === 0)
    return <div>Grade has not been assigned to students yet.</div>;

  const formattedStudents: Student[] = students.map((student) => ({
    ...student,
    date_of_birth: student.dateOfBirth || "",
  }));

  // Handle input change for grades
  const handleGradeChange = (
    studentId: string,
    field: keyof Grade,
    value: number
  ) => {
    const parsedValue = isNaN(value) ? 0 : value;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [field]: parsedValue,
      },
    }));
  };

  // Handle the form submission to update a single student's grades
  const handleUpdateGrades = async (studentId: string) => {
    const studentGrades = grades[studentId];
    await updateGrades(studentId, grades[studentId]);
    toast({
      title: `Grade update`,
      description: `Student grade has been updated successfully!`,
    });
  };

  // Handle the form submission to update all students' grades
  const handleUpdateAllGrades = async () => {
    formattedStudents.forEach((student) => {
      const studentGrades = grades[student.id];
      // Only update if grades are defined and not empty
      if (
        studentGrades &&
        Object.values(studentGrades).some((grade) => grade !== 0)
      ) {
        updateGrades(student.id, studentGrades);
      }
    });
  };

  return (
    <>
      <div className="container h-screen ml-[230px] px-20 py-16 flex flex-col gap-10">
        <h2 className="text-left text-4xl font-semibold text-gray-400">
          Grade Students
        </h2>
        <div className="flex items-start justify-between">
          <Table className="w-[900px]">
            <TableHeader className="px-2 py-6 bg-blue-950 hover:bg-blue-950 text-white">
              <TableRow className="text-gray-500 font-bold">
                <TableHead className="px-2 py-4 text-white whitespace-nowrap w-[100px]">
                  Student ID
                </TableHead>
                <TableHead className="px-2 py-4 text-white whitespace-nowrap">
                  Student Name
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Pure Maths
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Biology
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Physics
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Chemistry
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Computer Sc
                </TableHead>
                <TableHead className="px-2 py-4 text-white w-[120px]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedStudents.map((student) => {
                const studentGrades = grades[student.id] || {
                  pure_maths: 0,
                  biology: 0,
                  physics: 0,
                  chemistry: 0,
                  computer_science: 0,
                };

                return (
                  <TableRow
                    key={student.id}
                    className={cn(" px-2 py-4 text-gray-500 odd:bg-blue-50")}
                  >
                    <TableCell className="px-2 py-4">
                      {100 + student.id}
                    </TableCell>
                    <TableCell className="px-2 py-4 whitespace-nowrap">{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell className="px-2 py-4">
                      <Input
                        type="number"
                        value={studentGrades.pure_maths}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            "pure_maths",
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        max={20}
                        className="px-2 py-1 appearance-none outline-0 border-0 shadow-none"
                      />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <Input
                        type="number"
                        value={studentGrades.biology}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            "biology",
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        max={20}
                        className="px-2 py-1 appearance-none outline-0 border-0 shadow-none"
                      />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <Input
                        type="number"
                        value={studentGrades.physics}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            "physics",
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        max={20}
                        className="px-2 py-1 appearance-none outline-0 border-0 shadow-none"
                      />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <Input
                        type="number"
                        value={studentGrades.chemistry}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            "chemistry",
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        max={20}
                        className="px-2 py-1 appearance-none outline-0 border-0 shadow-none"
                      />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <Input
                        type="number"
                        value={studentGrades.computer_science}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            "computer_science",
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        max={20}
                        className="px-2 py-1 appearance-none outline-0 border-0 shadow-none"
                      />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <button
                        onClick={() => handleUpdateGrades(student.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* Button to update all students' grades */}
        <button
          onClick={handleUpdateAllGrades}
          className="bg-blue-500 text-white px-6 py-3 mt-4 rounded hover:bg-blue-600 self-start"
        >
          Update All Grades
        </button>
      </div>
      {/* <Toast /> */}
    </>
  );
}
