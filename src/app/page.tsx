"use client";

import Header from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
//import { metadata } from "./metadata"; // Import the metadata separately
import Features from "@/components/sections/Features";
import Integrations from "@/components/sections/Integrations";
import Testimonials from "@/components/sections/Testimonials"
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Support from "@/components/sections/Support";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Integrations />
      <Testimonials />
      <FAQ />
      <CTA />
      <Support />
      <Footer />
    </div>

  );
}