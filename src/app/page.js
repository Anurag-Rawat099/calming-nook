"use client";


import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AboutPreview from "@/components/home/AboutPreview";
import Amenities from "@/components/home/Amenities";
import BookingCTA from "@/components/home/BookingCTA";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <AboutPreview />

      <FeaturedRooms />

      <Amenities />

      <Testimonials />

      <BookingCTA />

      <Footer/>

  

    </main>
  );
}