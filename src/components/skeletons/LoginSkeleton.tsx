// components/ui/RegisterSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="w-96 mx-auto p-5 border rounded space-y-3">
      <Skeleton className="h-8 w-1/6" /> {/* Title */}
      <Skeleton className="h-10 w-full" /> {/* Email Field */}
      <Skeleton className="h-10 w-full" /> {/* Password Field */}
      <Skeleton className="h-10 w-full bg-gray-400" /> {/* Button */}
      <div className="flex justify-center">
        <Skeleton className="h-4 w-1/6 bg-gray-200" /> {/* Forgot password */}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-6 w-2/3 bg-gray-300" /> {/* Don't have an account? */}
      </div>
    </div>
  );
}
