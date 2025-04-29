"use client"

import { usePathname } from "next/navigation";
import { Home, ListChecks, Settings, Menu, X, Book } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility for conditional class names
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import { useMediaQuery } from 'react-responsive';

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Tasks", href: "/dashboard/tasks", icon: ListChecks },
    { name: "Task Board", href: "/dashboard/board", icon: Book },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];


const Sidebar = () => {
    const pathname = usePathname(); // Get current route;
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuthStore();
    
    const isMediumScreen = useMediaQuery({ minWidth: 768 });
    // const isSmallScreen = useMediaQuery({ maxWidth: 768 });

    const getTranslateX = () => {
        if (isMediumScreen) {
            return "0%"; // always visible on md+
        }

        /*if (isSmallScreen) {
            return "-100%";
        }*/

        return isOpen ? "0%" : "-100%" // slide in/out on small screens
     }

    // const translateValue = `transform: ${isOpen} ? 'translateX(0)' : 'translateX(-100%)'`;

    // const translateValue = isOpen  ? 'translateX(0)' : 'translateX(-100)';

    // ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0


    return (
        <>
            {/* Hamburger Button (Shown on Mobile ) */}
            
            <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ boxShadow: '0 2px 4px -2px rgb(0, 0, 0, 0.5)'}}
            className="md:hidden fixed p-3 top-3 left-2.5 z-50 text-[#364153] hover:bg-[#99a1af] rounded-full transition cursor-pointer"
            >
                {isOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
            </button>

            {/* Overlay when menu is open */}
            {isOpen && <div className="fixed inset-0 bg-[#fff]/50 z-40" onClick={() => setIsOpen(false)}></div>}

            {/* Sidebar */}
            <aside
              style={{ transform: `translateX(${getTranslateX()})`, transition: "transform 0.3s ease" }}
              className={`fixed md:fixed h-screen w-65 bg-[#e5e7eb] text-white p-4 flex flex-col z-40 transition-transform
              `}>
                <h2 className="text-xl text-[#05df72] font-bold  mb-6 ml-10 md:ml-0">TaskSpark</h2>
                <nav className="flex flex-col space-y-4">
                    {sidebarLinks.map(({ name, href, icon: Icon }) => (
                        <Link
                        key={href}
                        href={href}
                        onClick={() => {setIsOpen(false)}}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition bg-[#e5e7eb] text-[#1e2939] hover:bg-[#e5e7eb]",
                            pathname === href ? "bg-[#00c951] hover:bg-[#05df72] text-[#f3f4f6]" : "hover: bg-[#d1d5dc]"
                        )}
                        >
                            <Icon className="w-5 h-5" />
                            {name}
                        </Link>
                    ))}
                    <button 
                      onClick={logout} 
                      className="bg-[#101828] hover:bg-[#1e2939] cursor-pointer text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;