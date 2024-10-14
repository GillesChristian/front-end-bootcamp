import { getToken } from "@/lib/auth";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

const baseUrl = "http://127.0.0.1:8000";

export function useStudent(id: string) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();
  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await fetch(`${baseUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch student");
        const data: Student = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  const updateStudent = async (updatedStudent: Student): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/students/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: updatedStudent.firstName,
          lastName: updatedStudent.lastName,
          email: updatedStudent.email,
          dateOfBirth: updatedStudent.dateOfBirth,
        }),
      });
      if (!response.ok) throw new Error("Failed to update student");
      setStudent(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  };

  return { student, isLoading, updateStudent };
}
