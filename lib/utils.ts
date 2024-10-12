import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function concatUsername(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
export function splitUsername(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const nameParts = fullName.split(" ");

  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
  };
}
