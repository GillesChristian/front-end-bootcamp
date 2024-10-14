import { useState, useEffect, useCallback } from "react";
export interface TopStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  average_mark: string;
}

export const useTopStudents = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/top-students");
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log("Top students: ", data); // Log the entire response
      setTopStudents(data); // Access the students array from the response
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
