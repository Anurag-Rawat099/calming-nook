"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden sm:h-[100vh]">

      {/* Background */}
      <Image
        src="/images/hero/hero.png"
        alt="Calming Nook Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center pt-24 sm:pt-28 lg:pt-0 px-6 text-center">

        <div className="max-w-4xl mx-auto">

          <p className="uppercase tracking-[8px] text-white/80 text-base sm:text-lg mb-5">
            Welcome To Calming Nook
          </p>

          <h1 className="text-yellow-300/80 font-bold leading-tight text-2xl sm:text-3xl lg:text-6xl">
            Escape Into
          
            Peace & Mountains
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-white/90 text-base sm:text-lg leading-8">
            A boutique homestay experience in the heart of Uttarakhand where
            nature, comfort and calm come together.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

           
            <Link
              href="/contact"
              className="px-7 py-1.5 border border-white/50 text-black bg-[var(--primary)] backdrop-blur-md hover:text-white hover:bg-white/10 transition-all"
            >
              Book Your Stay
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}