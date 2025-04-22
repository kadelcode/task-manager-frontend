"use client";

import { useForm, SubmitHandler } from "react-hook-form"; // Hook for managing form state and validation
import { z } from "zod"; // Library for schema definition and validation
import { zodResolver } from "@hookform/resolvers/zod"; // Integration between react-hook-form and Zod
import useAuthStore from "@/store/authStore"; // Custom hook for authentication state management
import { useRouter } from "next/navigation"; // Hook for navigation in Next.js
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

import LoginSkeleton from "@/components/skeletons/LoginSkeleton";


interface LoginFormInputs {
  email: string;
  password: string;
}

// Define Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validate email format
  password: z.string().min(6, "Password must be at least 6 characters"), // Validate password length
});

// Define the LoginPage component
export default function LoginPage() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter(); // Initialize the router for navigation
  const [showPassword, setShowPassword] = useState(false);
  const [loading, isLoading] = useState(true);

  // Use react-hook-form with Zod validation
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors, isSubmitting }, // Form state including errors and submission status
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod resolver for validation
  });


  // Define the onSubmit function for form submission
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data.email, data.password); // Call the login function with email and password
    //router.push("/dashboard"); // Navigate to the dashboard page after successful login
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [isAuthenticated, router]);

  // Simulate loading time
  useEffect(() => {
    setTimeout(() => isLoading(false), 1500)
  }, []);

  // Render the login form
  return (
    <section className="flex items-center h-screen">
        { loading ? (
            <LoginSkeleton />
        ) : (
            <div className="w-96 mx-auto p-5 border rounded">
            <h2 className="text-xl font-bold">Login To Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                    type="email"
                    placeholder="Email"
                    {...register("email")} // Register the email input field
                    className={`bg-white focus:outline-0 focus:border-[#05df72] border rounded-md p-2 w-full mt-5 transition-colors 0.3 ${errors.email ? " border-red-500 focus:outline-0 focus:border-red-500" : ""}`}
                    />
                    {/* Display email error message */}
                    {errors.email && <small className="text-[#fb2c36]">{errors.email.message}</small>}
                </div>

                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")} // Register the password input field
                    className={`bg-white focus:outline-0 focus:border-[#05df72] border rounded-md p-2 w-full mt-5 transition-colors 0.3 ${errors.password ? "focus:outline-0 border-red-500 focus:border-red-500": ""}`}
                    />
                    <button
                    type="button" // Prevents triggering validation/submission
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-[#6a7282]"
                    >
                        {showPassword ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />}
                    </button>
                    {/* Display password error message */}
                    {errors.password && (
                    <small className="text-[#fb2c36]">{errors.password.message}</small>
                    )}
                </div>
                

                <button
                type="submit"
                className={`bg-[#05df72] hover:bg-[#00c951] text-white px-4 py-2 mt-5 w-full rounded-md 
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                disabled={isSubmitting} // Disable button during submission
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
                <a href="/forgot-password" className="text-[#2b7fff] hover:underline">
                Forgot Password?
                </a>
            </div>

            {/* Link to Register Div */}
            <div className="text-center mt-5">
                    <span>Don&apos;t have an account? <Link className="text-[#2b7fff] hover:underline" href="/register">Register</Link></span>
            </div>
        </div>
        )}
    </section>
  );
}
