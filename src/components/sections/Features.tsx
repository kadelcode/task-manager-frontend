"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ReactNode } from "react";

// An interface
interface Feature {
    title: string;
    description: string;
    icon: ReactNode;
}

const features: Feature[] = [
    {
        title: "Intuitive Task Lists",
        description: "Create and manage tasks with ease using our user-friendly interface.",
        icon: <LucideIcons.ListTodo />
    },
    {
        title: "Prioritization & Deadlines",
        description: "Set priorities and deadlines to stay on top of your most important tasks.",
        icon: <LucideIcons.CalendarDaysIcon />
    },
    {
        title: "Drag & Drop Tasks",
        description: "Easily organize your workflow",
        icon: <LucideIcons.Move />
    },
]

export default function Features() {
    return (
        <section id="features" className="py-20 px-6 bg-gray-100">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Powerful Features
                </h2>
                <p className="text-gray-600 mt-3">Everything you need to stay productive.</p>

                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <span className="text-4xl">{feature.icon}</span>
                            <h3 className="text-xl font-semibold mt-3 text-green-400">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}