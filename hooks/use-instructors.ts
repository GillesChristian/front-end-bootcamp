import { useState, useEffect, useCallback } from "react";

export type Instructor = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  assigned_subject: string;
  date_of_birth?: string;
};

export const UseInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/instructors");
      if (!response.ok) {
        throw new Error("Failed to fetch Instructors");
      }
      const data = await response.json();
      console.log(data); // Log the entire response
      setInstructors(data.instructors); // Access the instructors array from the response
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
