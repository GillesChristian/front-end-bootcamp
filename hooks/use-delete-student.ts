import { useState } from "react";

export const useDeleteStudent = (onSuccess: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStudent = async (userId: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:9000/api/students/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
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
