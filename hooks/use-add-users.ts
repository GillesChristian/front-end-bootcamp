import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export function useAddUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setError] = useState<string | null>(null);
  const router = useRouter();
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    dateOfBirth: string;
  }

  const addUser = async (userData: User) => {
    setIsSubmitting(true);
    setError(null); // Reset error state before new submission

    try {
      const token = getToken();
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }

      if (userData.role === "student") router.push("/teachers/students-list");
      else router.push("/teachers/instructors-list");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.log(addError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    addUser,
    isSubmitting,
    addError,
  };
}
