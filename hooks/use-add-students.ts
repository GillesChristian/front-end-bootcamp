import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAddStudent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const addStudent = async (studentData: {
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
    role: string;
    date: Date;
  }) => {
    setIsSubmitting(true);
    setError(null); // Reset error state before new submission

    try {
      const response = await fetch("http://127.0.0.1:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student. Please try again.");
      }
      setTimeout(() => {
        router.push("/teachers/students-list");
      }, 500);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addStudent,
    isSubmitting,
  };
}
