import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen">
      {/* Left side with logo and title */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-blue-900 text-white p-12">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="School Management System Logo"
            width={80}
            height={80}
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
          <form className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <Button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
