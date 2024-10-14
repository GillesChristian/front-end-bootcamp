"use client";

import React, { useState } from 'react';
import StudentReport from './StudentReport';

// Mock data for a student's academic record
const studentData = {
  studentName: 'John Doe',
  courses: [
    { courseName: 'Mathematics', grade: 92 },
    { courseName: 'History', grade: 85 },
    { courseName: 'Science', grade: 88 },
    { courseName: 'English', grade: 94 },
  ],
  classPosition: 3
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateAverage = (courses: any[]) => {
  const totalGrades = courses.reduce((sum, course) => sum + course.grade, 0);
  return totalGrades / courses.length;
};

const StudentApp: React.FC = () => {
  const [student] = useState(studentData);

  // Calculate student's average grade
  const average = calculateAverage(student.courses);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <StudentReport 
        studentName={student.studentName}
        courses={student.courses}
        average={average}
        classPosition={student.classPosition}
      />
    </div>
  );
}

export default StudentApp;
