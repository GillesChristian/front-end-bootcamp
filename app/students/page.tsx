"use client";

import { useState } from 'react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { SubjectTableSkeleton } from '@/components/SubjectTableSkeleton';
import { cn } from '@/lib/utils';

// Define the type for a subject
interface Subject {
  id: number;
  courseName: string;
  teacherName: string;
  grade: string;
  lastTestScore: number;
}

  // Mock data for subjects (could also come from an API)
  const subjectsData: Subject[] = [
    { id: 1, courseName: 'Mathematics', teacherName: 'Mr. Smith', grade: 'A', lastTestScore: 95 },
    { id: 2, courseName: 'History', teacherName: 'Ms. Johnson', grade: 'B+', lastTestScore: 87 },
    { id: 3, courseName: 'Science', teacherName: 'Dr. Clark', grade: 'A-', lastTestScore: 90 },
  ];

  // Define InfoItem component
  const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => {
    return (
      <div className="text-center">
        <h3 className="font-bold">{label}</h3>
        <p>{value}</p>
      </div>
    );
  };

  // Define the props for the SubjectInfo component
  interface SubjectInfoProps {
    selectedSubject: Subject | null;
    handleClose: () => void;  // New prop for closing the info pane
  }

  // SubjectInfo component
  const SubjectInfo: React.FC<SubjectInfoProps> = ({ selectedSubject, handleClose}) => {
    if (!selectedSubject) return;

    return (
      <div className="py-9 px-14 mt-14 sm:min-w-[350px] h-full rounded-2xl bg-[#509CDB] text-white flex flex-col items-center justify-center gap-4 flex-1">
        <h2 className="text-2xl font-bold">Subject Information</h2>
        <InfoItem label="Course Name" value={selectedSubject.courseName} />
        <InfoItem label="Teacher Name" value={selectedSubject.teacherName} />
        <InfoItem label="Grade" value={selectedSubject.grade} />
        <InfoItem label="Last Test Score" value={selectedSubject.lastTestScore} />

        {/* Close Button with similar format */}
        <div className="flex gap-4 mt-10">
          <button
            className="bg-white hover:bg-red/80 text-black w-[100px] flex place-content-center rounded-xl"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // SubjectList component
  interface SubjectListProps {
    subjects: { id: number; courseName: string }[];
    handleSubjectClick: (subject: { id: number; courseName: string }) => void;
    selectedSubject: Subject | null;
  }

const SubjectList: React.FC<SubjectListProps> = ({ subjects, handleSubjectClick, selectedSubject }) => {
  return (
    
    <div className="container h-screen ml-[230px] px-10 py-16 flex flex-col gap-6">
      <div className="flex items-start justify-between">
      <Table className="w-[1100px]">
        <TableHeader className="px-2 py-4 bg-blue-950 hover:bg-blue-950 text-white">
          <TableRow className="text-gray-500 font-bold">
            <TableHead className="px-2 py-4 text-white">
              S/N
            </TableHead>
            <TableHead className="px-2 py-4 text-white">
              Subject Code
            </TableHead>
            <TableHead className="px-2 py-4 text-white">
              Subject
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => {
            return (
            <TableRow
              key={subject.id}
              onClick={() => handleSubjectClick(subject)}
              className={cn(
                "transition-all ease-in-out duration-200 hover:bg-[#509CDB] hover:text-white px-2 py-4 text-gray-500 ",
                selectedSubject?.id === subject.id
                  ? "bg-[#509CDB] text-white"
                  : "odd:bg-blue-50"
              )}
              >
              {/* Column 1: Serial Number (S/N) */}
              <TableCell className="px-2 py-4">
                {index + 1} {/* Display row index as S/N starting from 1 */}
              </TableCell>

              {/* Column 2: Course Code (100 + subject.id + 5) */}
              <TableCell className="px-2 py-4">
                {200 + subject.id *2 + 5}
              </TableCell>

              {/* Column 3: Subject Name */}
              <TableCell className="px-2 py-4">
                {subject.courseName}
                </TableCell>
            </TableRow>
          );
          })}
        </TableBody>

      </Table>
      </div>
    </div>
  );
};

// Main component (combining SubjectList and SubjectInfo)
const SubjectsApp: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Handle the subject click
  const handleSubjectClick = (subject: { id: number; courseName: string }) => {
    const selectedSubjectDetails = subjectsData.find(sub => sub.id === subject.id);
    setSelectedSubject(selectedSubjectDetails || null);
  };

   // Handle closing of the subject info panel
   const handleClose = () => {
    setSelectedSubject(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Subject List */}
      <SubjectList 
        subjects={subjectsData.map(({ id, courseName }) => ({ id, courseName }))}
        handleSubjectClick={handleSubjectClick}
        selectedSubject={selectedSubject}
      />

      {/* Subject Info */}
      <SubjectInfo selectedSubject={selectedSubject} 
      handleClose={handleClose} // Pass the close function as a prop
      />
    </div>
  );
};

export default SubjectsApp;