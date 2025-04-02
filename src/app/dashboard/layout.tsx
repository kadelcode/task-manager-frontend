"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        //const token = localStorage.getItem("token");

        if (!isAuthenticated) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <Loader2 size={36} className="text-green-400 animate-spin" />
        </div>
    ) // Prevent flash of content

    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed to the left) */}
            <Sidebar />
            
            {/* Main Content (Takes Remaining Space) */}
            <main className="w-full md:flex-1">
                <Navbar />
                {children}
            </main>
        </div>
    )
};