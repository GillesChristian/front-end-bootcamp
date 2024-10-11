import { z } from "zod";

export const registrationSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    date: z
      .date({
        required_error: "Date of birth is required.",
        invalid_type_error: "Invalid date.",
      })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // This ensures the error is shown on the correct field
  });
