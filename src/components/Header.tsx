/**
 * Navigation Header for Landing Page
 */

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-green-400">
                    TaskManager
                </Link>
                <div className="hidden md:flex space-x-6">
                    <Link href="#features" className="hover:text-green-500">Features</Link>
                    <Link href="#integrations" className="hover:text-green-500">Integrations</Link>
                    <Link href="#testimonials" className="hover:text-green-500">Testimonials</Link>
                    <Link href="#faq" className="hover:text-green-500">FAQ</Link>
                </div>
                <Link href="/register">
                 <Button className="hidden md:block text-white cursor-pointer">Get Started</Button>
                </Link>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Overlay when menu is open */}
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}></div>}

            {isOpen && (
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md py-4 z-50"
                >
                    <div className="flex flex-col space-y-4 items-center">
                        <Link href="#features" className="hover:text-[#05df72]" onClick={() => setIsOpen(false)}>Features</Link>
                        <Link href="#integrations" className="hover:text-[#05df72]" onClick={() => setIsOpen(false)}>Integrations</Link>
                        <Link href="#testimonials" className="hover:text-[#05df72]" onClick={() => setIsOpen(false)}>Testimonials</Link>
                        <Link href="#faq" className="hover:text-[#05df72]" onClick={() => setIsOpen(false)}>FAQ</Link>
                        
                        <Link href="/register">
                            <Button className="bg-[#05df72] hover:bg-green-500 text-white cursor-pointer">Get Started</Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}