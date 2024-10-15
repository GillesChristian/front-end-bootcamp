import { getToken } from "@/lib/auth";
import { useState, useEffect } from "react";

// Define the grade structure
export interface Grade {
  student_id: number;
  pure_maths: number;
  biology: number;
  physics: number;
  chemistry: number;
  computer_science: number;
}

export const useGrades = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<Grade | null>(null);

  // Fetch grades when the component mounts
  useEffect(() => {
    const fetchGrades = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        const response = await fetch("http://127.0.0.1:8000/grades", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching grades: ${response.statusText}`);
        }

        const data: Grade = await response.json();
        setGrades(data);
        console.log(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return { loading, error, grades };
};
