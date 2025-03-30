"use client";

import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
    {
      name: "John Doe",
      role: "CEO, StartupX",
      text: "This platform transformed our business! The UI is intuitive, and the features are top-notch.",
      image: "/carousel-images/uifaces-ci1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Marketing Director, TechCorp",
      text: "Absolutely love the seamless experience. Highly recommend!",
      image: "/carousel-images/uifaces-ci2.jpg",
    },
    {
      name: "Alice Brown",
      role: "Freelancer",
      text: "The best investment I've made for my workflow. Incredible support team!",
      image: "/carousel-images/uifaces-ci3.jpg",
    },
    {
      name: "Michael Johnson",
      role: "CTO, InnovateHub",
      text: "The level of innovation and ease of use is mind-blowing. This is the future!",
      image: "/carousel-images/uifaces-ci4.jpg",
    },
    {
      name: "Emily Davis",
      role: "Product Designer",
      text: "I love how intuitive and sleek the interface is. Game changer for designers!",
      image: "/carousel-images/uifaces-ci5.jpg",
    },
    {
      name: "David Wilson",
      role: "Software Engineer",
      text: "Coding has never been this efficient. The features here saved me hours of work!",
      image: "/carousel-images/uifaces-ci6.jpg",
    },
    {
      name: "Sophia Martinez",
      role: "Business Analyst",
      text: "Analytics and reporting are seamless. Highly recommended for any business!",
      image: "/carousel-images/uifaces-ci7.jpg",
    },
    {
      name: "Chris Anderson",
      role: "Tech Blogger",
      text: "Reviewed dozens of products, but this one stands out in every way!",
      image: "/carousel-images/uifaces-ci8.jpg",
    },
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
            
            <Carousel className="w-96 md:w-xl lg:w-2xl mx-auto mt-8">
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="p-4">
                            <Card className="shadow-lg rounded-xl p-6 bg-white border-l-0 border-t-0 border-r-2 border-b-0 border-green-400">
                                <CardContent className="flex flex-col items-center">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                        <AvatarFallback className="font-bold">{testimonial.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-gray-700 text-lg mt-4">"{testimonial.text}"</p>
                                    <h3 className="font-semibold mt-4">{testimonial.name}</h3>
                                    <p className="text-gray-500">{testimonial.role}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
};