"use client";

import { useState } from "react";
import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
    const [search, setSearch] = useState("");

    return (
        <nav className="top-0 w-full bg-blue-600 shadow-md p-4 flex items-center justify-between z-40">
            <h2 className="text-xl font-bold">Task Manager</h2>
        </nav>
    )
}