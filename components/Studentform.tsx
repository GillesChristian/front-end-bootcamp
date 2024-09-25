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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function StudentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!firstName || !lastName || !email || !date) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:9000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName, // Changed from firstName to first_name
          last_name: lastName,   // Changed from lastName to last_name
          email,
          date_of_birth: format(date, "yyyy-MM-dd"), // Changed from dateOfBirth to date_of_birth
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create student");
      }

      toast({
        title: "Success",
        description: "Student added successfully",
      });

      // Redirect to the student list or dashboard
      router.push("/students");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="w-[350px]">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            className="!p-6"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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

      <Button
        type="submit"
        className="mt-20 bg-gray-50 hover:bg-gray-100 text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Student..." : "Add Student"}
      </Button>
    </form>
  );
}
