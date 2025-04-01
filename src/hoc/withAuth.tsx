"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const withAuth = (WrappedComponent: React.FC) => {
  return function ProtectedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null; // Prevents flickering

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
