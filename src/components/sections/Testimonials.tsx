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
        <section id="testimonials" className="py-20 bg-[#f3f4f6] text-center">
            <motion.h2 
              className="text-3xl font-bold text-[#000]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              
            >
                What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-[#4a5565] mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
                See how our app has improved productivity
            </motion.p>
            
            <Carousel className="w-[320px] sm:w-[346px] md:w-xl lg:w-2xl mx-auto mt-8 z-10">
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="p-4">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                            <Card 
                              style={{ boxShadow: '0 4px 6px -4px rgba(0, 0, 0, 0.1)' }}
                              className="shadow-lg rounded-xl p-6 bg-white border-l-0 border-t-0 border-r-2 border-b-0 border-[#05df72]">
                                <CardContent className="flex flex-col items-center">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                        <AvatarFallback className="font-bold">{testimonial.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-[#364153] text-lg mt-4">&quot;{testimonial.text}&quot;</p>
                                    <h3 className="font-semibold mt-4">{testimonial.name}</h3>
                                    <p className="text-[#6a7282]">{testimonial.role}</p>
                                </CardContent>
                            </Card>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
};