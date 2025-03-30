"use client";

import { motion } from "framer-motion";

const testimonials = [
    "Amazing tool! My team's efficiency skyrocketed!",
    "The AI features saved me hours of work.",
    "Best task manager I've ever used!",
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold">
                What Our Users Say
            </h2>
            <p className="text-gray-600 mt-3">
                See how our app has improved productivity
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
                { testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-white rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        <p className="text-gray-600 italic">"{testimonial}"</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};