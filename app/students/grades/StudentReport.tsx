// StudentReport.tsx
"use client";

import React from 'react';

// Define the props for student report
interface StudentReportProps {
  studentName: string;
  courses: Array<{
    courseName: string;
    grade: number;
  }>;
  average: number;
  classPosition: number;
}

const StudentReport: React.FC<StudentReportProps> = ({ studentName, courses, average, classPosition }) => {
  return (
    <div style={{ width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{studentName} Academic Report</h2>
      
      {/* Courses and Grades Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #000', padding: '10px' }}>Course Name</th>
            <th style={{ borderBottom: '2px solid #000', padding: '10px' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{course.courseName}</td>
              <td style={{ borderBottom: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{course.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Average and Class Position */}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p><strong>Average Grade:</strong> {average.toFixed(2)}</p>
        <p><strong>Class Position:</strong> {classPosition}</p>
      </div>
    </div>
  );
}

export default StudentReport;

