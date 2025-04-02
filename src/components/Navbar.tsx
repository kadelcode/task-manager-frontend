"use client";

import { FormEvent, useState } from "react";
import { Bell, Plus, Search, UserCircle, X, Loader2 } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useAuthStore from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
    const [search, setSearch] = useState("");
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, isAuthenticated, logout } = useAuthStore();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target as HTMLFormElement;
        const formData = {
            title: (form.elements.namedItem('title') as HTMLInputElement).value,
            description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
            priority: (form.elements.namedItem('priority') as HTMLSelectElement).value,
            dueDate: (form.elements.namedItem('dueDate') as HTMLInputElement).value,
        };

        try {
            const response = await axios.post(API_URL + "/tasks", formData);
            toast.success('Task added successfully!');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Error adding task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <nav className="top-0 w-full bg-gray-400 shadow-md h-16 px-4 flex items-center justify-between z-40">
            {/* Logo */}
            <h2 className="text-xl font-bold ml-10 md:hidden">Task Manager</h2>

            {/* Search Bar */}
            {/*<div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                />
            </div>*/}

            {/* Icons & Profile */}
            <div className="flex items-center gap-4">
                {/* Add Task Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                </button>

                {/* Notification Icon */}
                <button className="relative p-2 rounded-full hover:bg-gray-200">
                    <Bell className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile Avatar */}
                <button className="flex items-center gap-2">
                    <UserCircle className="w-6 h-6 text-gray-700" />
                    { isAuthenticated && 
                    <span className="hidden md:inline font-medium">{user?.email}</span>
                    }
                </button>
            </div>
        </nav>

        {/* Add Task Modal */}
        <Dialog open={isModelOpen} onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
        >
            <div className="bg-gray-200/25 fixed inset-0" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8}}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                {/* Task Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Task Title"
                      name="title"
                      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required 
                    />
                    <textarea placeholder="Task Description"
                      name="description"
                      className="p-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    {/* Priority & Due Date */}
                    <div className="flex gap-4">
                        <select name="priority" className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <input type="date" name="dueDate"
                          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        { isLoading ?
                        <div className="flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin" />
                            <span>Adding...</span>
                        </div> :
                        'Add Task'
}
                    </button>
                </form>

                {/* Close Button */}
                <button onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X />
                </button>
            </motion.div>
        </Dialog>

        {/* Toast Container */}
        <ToastContainer
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={true} 
          newestOnTop={false} 
          closeOnClick rtl={false} 
          pauseOnFocusLoss draggable pauseOnHover 
        />
        </>
    )
}