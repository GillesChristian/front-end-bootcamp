// SubjectList.tsx
"use client";
import React from 'react';

// Define the props type for passing the subject click handler and selected subject
interface SubjectListProps {
  subjects: Array<{
    id: number;
    courseName: string;
  }>;
  handleSubjectClick: (subject: { id: number; courseName: string }) => void;
  selectedSubject: { id: number; courseName: string } | null;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, handleSubjectClick, selectedSubject }) => {
  return (
    <div style={{ width: '30%', padding: '10px' }}>
      <h2>Subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <li 
            key={subject.id} 
            onClick={() => handleSubjectClick(subject)} 
            style={{ cursor: 'pointer', padding: '8px', background: selectedSubject?.id === subject.id ? '#d3d3d3' : 'white' }}
          >
            {subject.courseName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;

