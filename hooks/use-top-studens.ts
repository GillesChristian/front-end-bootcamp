import { useState, useEffect, useCallback } from "react";

export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: string;
};

export const useTopStudents = () => {
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      console.log("Top students: ", data); // Log the entire response
      setTopStudents(data.students); // Access the students array from the response
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setTopStudents([]); // Reset to an empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    topStudents,
    loading,
    error,
  };
};
