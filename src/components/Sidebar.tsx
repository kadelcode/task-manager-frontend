"use client"

import { usePathname } from "next/navigation";
import { Home, ListChecks, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility for conditional class names
import { useState } from "react";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Tasks", href: "/dashboard/tasks", icon: ListChecks },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];


const Sidebar = () => {
    const pathname = usePathname(); // Get current route;
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            {/* Hamburger Button (Shown on Mobile ) */}
            
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden fixed p-3 top-4 left-52 z-50 bg-gray-800 text-white rounded-full"
            >
                {isOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
            </button>

            {/* Sidebar */}
            <aside
              className={`fixed md:static h-screen w-65 bg-gray-900 text-white p-4 flex flex-col transform transition-transform z-40
              ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <h2 className="text-xl font-bold mb-6">Task Manager</h2>
                <nav className="flex flex-col space-y-4">
                    {sidebarLinks.map(({ name, href, icon: Icon }) => (
                        <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition hover:bg-gray-800",
                            pathname === href ? "bg-green-500" : "hover: bg-gray-700"
                        )}
                        >
                            <Icon className="w-5 h-5" />
                            {name}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;