// export default function Subjects() {
//   return <h1>My Academic Courses !!!</h1>;
// }
"use client";

import React, { useState } from 'react';
import SubjectList from './SubjectList';
import SubjectInfo from './SubjectInfo';


interface Subject {
  id: number; 
    courseName: string; 
    teacherName: string; 
    grade: string; 
    lastTestScore: number; 
  };

// Mock data for subjects
const subjectsData: Subject[] = [
  { id: 1, courseName: 'Mathematics', teacherName: 'Mr. Smith', grade: 'A', lastTestScore: 95 },
  { id: 2, courseName: 'History', teacherName: 'Ms. Johnson', grade: 'B+', lastTestScore: 87 },
  { id: 3, courseName: 'Science', teacherName: 'Dr. Clark', grade: 'A-', lastTestScore: 90 },
  // Add more subjects as needed
];

const SubjectsApp: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleSubjectClick = (subject: { id: number; }) => {
    const selectedSubjectDetails = subjectsData.find(sub => sub.id === subject.id);
    if (selectedSubjectDetails) {
      setSelectedSubject(selectedSubjectDetails);
    } else {
      setSelectedSubject(null);
    }
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
      <SubjectInfo selectedSubject={selectedSubject} />
    </div>
  );
}

export default SubjectsApp;
