"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { hashPassword } from "@/lib/auth";
import { registrationSchema } from "@/lib/zodValidation";
import { concatUsername } from "@/lib/utils";
import { useAddUser } from "@/hooks/use-add-users";
interface Status {
  status: "student" | "instructor";
}
export default function AddUserForm(status: Status) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [role] = useState(status.status);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { addUser, isSubmitting } = useAddUser();
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      date,
    };
    try {
      // Zod validation
      await registrationSchema.parseAsync(formData);

      const hashedPassword: string = await hashPassword(password);
      const username = concatUsername(firstName, lastName);

      // Add student data after validation
      await addUser({
        username,
        email,
        hashedPassword,
        role,
        date: date || new Date(),
      });

      toast({
        title: `${status.status} added`,
        description: `${firstName} ${lastName} has been added successfully!`,
      });
      console.log("Form submitted successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);

        // Show error toast
        toast({
          title: "Validation Error",
          description: "Please fill in all fields correctly and try again.",
          variant: "destructive",
        });
      } else {
        // Show a general error toast if anything else goes wrong
        toast({
          title: "Submission Failed",
          description:
            "There was an error submitting the form. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form className="w-full max-w-2xl space-y-8" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="w-[350px]">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            className="!p-6"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              handleChange("firstName", e.target.value);
            }}
          />
          {errors.firstName && (
            <p className="absolute text-red-400 text-sm mt-1">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="w-[350px]">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            className="!p-6"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              handleChange("lastName", e.target.value);
            }}
          />
          {errors.lastName && (
            <p className="absolute text-red-400 text-sm mt-1">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            className="!p-6"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange("email", e.target.value);
            }}
          />
          {errors.email && (
            <p className="absolute text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-between text-left font-normal !p-6 ${
                  !date && "text-muted-foreground"
                }`}
              >
                {date ? format(date, "PPP") : <span>Date of Birth</span>}
                <ChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            className="!p-6"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange("password", e.target.value);
            }}
          />
          {errors.password && (
            <p className="absolute text-red-400 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="!p-6"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleChange("confirmPassword", e.target.value);
            }}
          />
          {errors.confirmPassword && (
            <p className="absolute text-red-400 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="mt-40 bg-gray-50 hover:bg-gray-100 text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? `Adding ${status.status}...` : `Add ${status.status}`}
      </Button>
    </form>
  );
}
