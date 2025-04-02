"use client";

// import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000); // Adjust delay as needed

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <Loader2 size={30} className="text-green-400 animate-spin"></Loader2>
    </div>
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Your settings code logic goes here</p>
      {/*<ThemeToggle />*/}
    </div>
  );
}
