// SubjectInfo.tsx
"use client";

import React from 'react';

// Define the props type for passing the selected subject details
interface SubjectInfoProps {
  selectedSubject: { 
    id: number; 
    courseName: string; 
    teacherName: string; 
    grade: string; 
    lastTestScore: number; 
  } | null; //make selectedSubject nullable
}

const SubjectInfo: React.FC<SubjectInfoProps> = ({ selectedSubject }) => {
  //fall back message if no subject is selected
  if (!selectedSubject){
    return <p>Please select a subject to view details.</p>;
  }
  //when subject is selected
  return (
    <div style={{ width: '70%', padding: '10px' }}>
      {selectedSubject ? (
        <div className="subject-info">
          <h3>Subject Info</h3>
          <p><strong>Course Name:</strong> {selectedSubject.courseName}</p>
          <p><strong>Teachers Name:</strong> {selectedSubject.teacherName}</p>
          <p><strong>Grade:</strong> {selectedSubject.grade}</p>
          <p><strong>Last Test Score:</strong> {selectedSubject.lastTestScore}</p>
        </div>
      ) : (
        <p>Please select a subject to see the details.</p>
      )}
    </div>
  );
};

export default SubjectInfo;

