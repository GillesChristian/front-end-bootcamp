import { getToken } from "@/lib/auth";
import { useState, useEffect, useCallback } from "react";

export type Instructor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
};

export const UseInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructor = useCallback(async () => {
    const token = getToken();
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Instructors");
      }
      const data = await response.json();
      console.log(data); // Log the entire response
      setInstructors(data); // Access the instructors array from the response
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setInstructors([]); // Reset to an empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstructor();
  }, [fetchInstructor]);

  return {
    instructors,
    setInstructors,
    loading,
    error,
    refetchInstructor: fetchInstructor,
  };
};
