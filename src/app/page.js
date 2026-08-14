"use client";


import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AboutPreview from "@/components/home/AboutPreview";
import Amenities from "@/components/home/Amenities";
import Experiences from "@/components/home/Experiences";
import Hero from "@/components/home/Hero";
import PahadiCuisine from "@/components/home/PahadiCuisine";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <AboutPreview />

      <Amenities />

      <PahadiCuisine/>

      <Experiences/>

      <Testimonials />

      <Footer/>

  

    </main>
  );
}