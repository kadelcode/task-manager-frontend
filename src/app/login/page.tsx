"use client";

import { useForm } from "react-hook-form"; // Hook for managing form state and validation
import { z } from "zod"; // Library for schema definition and validation
import { zodResolver } from "@hookform/resolvers/zod"; // Integration between react-hook-form and Zod
import { useAuthStore } from "@/store/authStore"; // Custom hook for authentication state management
import { useRouter } from "next/navigation"; // Hook for navigation in Next.js
import { useState } from "react";

import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Define Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validate email format
  password: z.string().min(6, "Password must be at least 6 characters"), // Validate password length
});

// Define the LoginPage component
export default function LoginPage() {
  const { login } = useAuthStore(); // Get the login function from the auth store
  const router = useRouter(); // Initialize the router for navigation
  const [showPassword, setShowPassword] = useState(false);

  // Use react-hook-form with Zod validation
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors, isSubmitting }, // Form state including errors and submission status
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod resolver for validation
  });


  // Define the onSubmit function for form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    await login(data.email, data.password); // Call the login function with email and password
    router.push("/dashboard"); // Navigate to the dashboard page after successful login
  };

  // Render the login form
  return (
    <section className="flex items-center h-screen">
    <div className="min-w-md mx-auto p-5 border rounded">
      <h2 className="text-xl font-bold">Login To Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input
            type="email"
            placeholder="Email"
            {...register("email")} // Register the email input field
            className={`bg-white focus:outline-0 focus:border-green-400 border rounded-md p-2 w-full mt-5 transition-colors 0.3 ${errors.email ? " border-red-500 focus:outline-0 focus:border-red-500" : ""}`}
            />
            {/* Display email error message */}
            {errors.email && <small className="text-red-500">{errors.email.message}</small>}
        </div>

        <div className="relative">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")} // Register the password input field
            className={`bg-white focus:outline-0 focus:border-green-400 border rounded-md p-2 w-full mt-5 transition-colors 0.3 ${errors.password ? "focus:outline-0 border-red-500 focus:border-red-500": ""}`}
            />
            <button
              type="button" // Prevents triggering validation/submission
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500"
            >
                {showPassword ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />}
            </button>
            {/* Display password error message */}
            {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
            )}
        </div>
        

        <button
          type="submit"
          disabled={isSubmitting} // Disable button during submission
          className="bg-green-400 hover:bg-green-500 cursor-pointer text-white px-4 py-2 mt-5 w-full rounded-md"
        >
          {/* Display loading text during submission */}
          {isSubmitting ? 
            <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" />
                Logging in...
            </div> : 
            "Login"
          }
        </button>
      </form>

      {/* Forgot Password Link */}
      <div className="mt-3 text-center">
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Link to Register Div */}
      <div className="text-center mt-5">
            <span>Don't have an account? <Link className="text-blue-500 hover:underline" href="/register">Register</Link></span>
      </div>
    </div>
    </section>
  );
}
