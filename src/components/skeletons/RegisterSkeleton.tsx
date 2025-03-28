// components/ui/RegisterSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterSkeleton() {
  return (
    <div className="w-96 mx-auto p-5 border rounded space-y-3">
      <Skeleton className="h-8 w-1/4" /> {/* Title */}
      <Skeleton className="h-10 w-full" /> {/* Name Field */}
      <Skeleton className="h-10 w-full" /> {/* Email Field */}
      <Skeleton className="h-10 w-full" /> {/* Password Field */}
      <Skeleton className="h-10 w-full" /> {/* Confirm Password */}
      <Skeleton className="h-10 w-full bg-gray-400" /> {/* Button */}
      <div className="flex justify-center">
        <Skeleton className="h-6 w-2/3 bg-gray-300" /> {/* Already have an account? */}
      </div>
    </div>
  );
}
