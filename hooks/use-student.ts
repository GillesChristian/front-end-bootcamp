import { useState, useEffect } from 'react';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

const baseUrl = "http://127.0.0.1:9000";

export function useStudent(id: string) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch(`${baseUrl}/api/students/${id}`);
        if (!response.ok) throw new Error('Failed to fetch student');
        const data: Student = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  const updateStudent = async (updatedStudent: Student): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) throw new Error('Failed to update student');
      setStudent(updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  return { student, isLoading, updateStudent };
}
