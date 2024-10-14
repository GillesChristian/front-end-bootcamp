import { getToken } from "@/lib/auth";
import { useState, useEffect, useCallback } from "react";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  date_of_birth?: string;
};

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch("http://127.0.0.1:8000/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log(data); // Log the entire response
      setStudents(data); // Access the students array from the response
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setStudents([]); // Reset to an empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    setStudents,
    loading,
    error,
    refetchStudents: fetchStudents,
  };
};
