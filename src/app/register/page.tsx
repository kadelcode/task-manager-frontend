"use client";

import { useRouter, usePathname } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/authStore";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";
import zxcvbn from "zxcvbn"; // Import password strength checker
import RegisterSkeleton from "@/components/skeletons/RegisterSkeleton";
//import { useNavigationStore } from "@/store/useNavigationStore";

interface RegisterFormInputs {
    name: string;
    email: string;
    password: string;
}

// Define form schema using Zod
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must have an uppercase letter")
      .regex(/\d/, "Must have a number")
      .regex(/[@$!%*?&#]/, "Must have a special character (@, $, !, %, *, ?, &, #)"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Targets the confirmPassword field
});

// Define TypeScript types for the form data
type RegisterFormData = z.infer<typeof registerSchema>;

// Function to check password strength
/*const checkPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    if (strength === 4) return { level: "Strong", color: "bg-green-500" };
    if (strength === 3) return { level: "Medium", color: "bg-yellow-500" };
    return { level: "Weak", color: "bg-red-500" };
};*/

export default function RegisterPage() {
    const { register: registerUser } = useAuthStore();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPending] = useTransition();
    //const isNavigating = useNavigationStore((state) => state.isNavigating);

    const pathname = usePathname();
    const [lastPath, setLastPath] = useState(pathname);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            const success = await registerUser(data.name, data.email, data.password);
            // login(data.email, data.password); // Call the login function with email and password
            if (success) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    // Watch password input for real-time strength checking
    const passwordValue = watch("password", "");
    const passwordStrengthResult = zxcvbn(passwordValue);
    /*const passwordStrength = checkPasswordStrength(password);*/

    // Simulate loading
    useEffect(() => {
        if (pathname !== lastPath) {
            if (isPending) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        }
        setLastPath(pathname);
    }, [pathname, isPending, lastPath]);

    // Update password strength state
    useEffect(() => {
        setPasswordStrength(passwordStrengthResult.score);
        setPasswordFeedback(passwordStrengthResult.feedback.suggestions.join(" "));
    }, [passwordValue, passwordStrengthResult]);

    // Password strength labels
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#3498db", "#2ecc71"];

    return (
        <section className="flex items-center h-screen">
            { loading ? (
                <RegisterSkeleton />
            ) : (
                <div
                  style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid black' }} 
                  className="w-96 px-6 mx-auto p-5 border rounded">
                    <h2 className="text-xl font-bold">Register</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="">
                            <input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            style={{ border: `${errors.name ? '1px solid red' : '1px solid black'}`}}
                            className="border p-2 w-full mt-4 rounded-md focus:outline-0"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            style={{ border: `${errors.email ? '1px solid red' : '1px solid black'}`}}
                            className="border focus:outline-0 p-2 w-full mt-3 rounded-md"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <input
                            type={ showPassword ? "text" : "password" }
                            placeholder="Password"
                            {...register("password")}
                            style={{ border: `${errors.password ? '1px solid red' : '1px solid black'}`}}
                            className="border focus:outline-0 p-2 w-full mt-3 rounded-md"
                            />
                            <button
                            type="button"
                            className="absolute right-3 top-6 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Password Strength Meter */}
                        {passwordValue && (
                            <div className="mt-2">
                                <div
                                className="h-1 rounded-full"
                                style={{
                                    width: `${(passwordStrength + 1) * 20}%`,
                                    backgroundColor: strengthColors[passwordStrength],
                                }}
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Strength:{" "}
                                    <span style={{ color: strengthColors[passwordStrength] }}>
                                        {strengthLabels[passwordStrength]}
                                    </span>
                                </p>
                                {passwordFeedback && <p className="text-xs text-gray-500">{passwordFeedback}</p>}
                            </div>
                        )}

                        <div className="relative">
                            <input
                            type={ showConfirmPassword ? "text" : "password" }
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                            style={{ border: `${errors.confirmPassword ? '1px solid red' : '1px solid black'}`}}
                            className="border p-2 w-full mt-3 rounded-md focus:outline-0"
                            />
                            <button
                            type="button"
                            className="absolute right-3 top-6 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </div>

                        <button type="submit"
                        className={`bg-[#05df72] hover:bg-[#00c951] text-[#fff] px-4 py-2 w-full mt-5 rounded-md ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={isSubmitting}
                        >
                            {isSubmitting ? 
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin mr-2" />Registering...
                            </div> : 
                            "Register" 
                            }
                        </button>
                    </form>

                    {/* Link to Login */}
                    <div className="text-center mt-5">
                        <span>Already have an account? <Link className="text-[#2b7fff] hover:underline" href="/login">Login</Link></span>
                    </div>
                </div>
            )}
        
        </section>
        
    )
}