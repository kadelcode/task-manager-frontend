"use client";

import { motion } from "framer-motion";
import { Button } from "@headlessui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section 
          className="relative flex flex-col items-center justify-center text-center py-20 px-5 bg-gradient-to-b from-green-100 to-green-200"
        >   {/* Animated Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Simplify Your Workflow with <span className="text-green-400">TaskSpark</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
                Effortless task management for teams & individuals
            </motion.p>


            <Link href="/register">
              <Button className="bg-[#05df72] flex items-center text-[#fff] px-6 py-3 text-lg rounded-md shadow-md cursor-pointer z-50">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
        </section>
    )
}