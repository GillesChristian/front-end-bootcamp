"use client";

import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStudent } from "@/hooks/use-student";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from 'react';
import { DateSelector } from "@/components/DateSelector";
import { EditStudentFormSkeleton } from "@/components/EditStudentFormSkeleton"; // Import the new component

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters."),
  last_name: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  date_of_birth: z.date()
});

type FormValues = z.infer<typeof formSchema>;

interface EditStudentFormProps {
  params: { id: string };
}

export function EditStudentForm({ params }: EditStudentFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { student, isLoading, updateStudent } = useStudent(params.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: new Date(),
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        date_of_birth: new Date(student.date_of_birth),
      });
    }
  }, [student, form]);

  async function onSubmit(values: FormValues) {
    if (!student) return;

    try {
      const updatedStudent: Student = {
        ...student,
        ...values,
        date_of_birth: format(values.date_of_birth, 'yyyy-MM-dd')
      };
      await updateStudent(updatedStudent);
      toast({
        title: "Success",
        description: "Student information updated successfully.",
      });
      router.push('/students');
    } catch (error) {
      console.error('Failed to update student:', error);
      toast({
        title: "Error",
        description: "Failed to update student information.",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return <EditStudentFormSkeleton />;
  }

  if (!student) return <div>No student data found</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center md:flex-row gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-[350px]">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="p-6 text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full md:w-[350px]">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="p-6" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="p-6" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelector field={field} label="Date of Birth" />
            )}
          />
        </div>
        <Button type="submit" className="mt-20 bg-gray-50 hover:bg-gray-100 text-black">
          Update Student
        </Button>
      </form>
    </Form>
  );
}
