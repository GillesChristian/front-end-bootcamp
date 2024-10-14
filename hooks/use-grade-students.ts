import { getToken } from "@/lib/auth";
import { useState, useEffect, useCallback } from "react";

// Define the grade structure
interface Grade {
  pure_maths: number;
  biology: number;
  physics: number;
  chemistry: number;
  computer_science: number;
}

export const useGradeStudents = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch grades for a student
  const getGrades = async (studentId: string) => {
    setLoading(true);
    try {
      const token = getToken();
      const response = await fetch(
        `http://127.0.0.1:8000/grades/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }
      return await response.json();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update student grades
  const updateGrades = async (studentId: string, grades: Grade) => {
    setLoading(true);
    setError(null);
    try {
      console.log(grades, studentId);
      const token = getToken();
      const response = await fetch(
        `http://127.0.0.1:8000/grades/${studentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(grades),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      console.log("Grades updated successfully:", grades);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update grades");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateGrades,
    getGrades,
  };
};
