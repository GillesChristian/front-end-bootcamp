import { getToken } from "@/lib/auth";
import { useState } from "react";

export const useDeleteStudent = (onSuccess: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStudent = async (userId: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const token = getToken();
      const response = await fetch(`http://127.0.0.1:8000/students/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token here
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.detail || "Login failed for an unknown reason.";
        throw new Error(errorMessage);
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the student"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteStudent, isDeleting, error };
};
