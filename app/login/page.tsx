"use client"; // Ensure this is present

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const { user, login, isAuthenticated } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError("");
    try {
      await login(data?.username, data?.password);
    } catch (error) {
      setLoginError("Login failed. Please check your credentials."); // You could improve this
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen">
        {/* Left side with logo and title */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-blue-900 text-white p-12">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="School Management System Logo"
              width={120}
              height={120}
              className="rounded-full bg-white p-2"
            />
          </div>
          <h1 className="text-3xl font-bold text-center">
            School Management System
          </h1>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Login to the system
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-md space-y-8"
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    rules={{ required: "Username is required" }} // Add validation rules
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} className="p-4 text-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: "Password is required" }} // Add validation rules
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="p-4 text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {loginError && <p className="text-red-500">{loginError}</p>}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
