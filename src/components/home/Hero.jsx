"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/uploads/hero.jpg"
          alt="Calming Nook Hero"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-center">

        <div className="max-w-4xl">

          <p
            className="
              uppercase
              tracking-[8px]
              text-white/80
              text-xl
              sm:text-2xl
              mb-6
            "
          >
            Welcome To Calming Nook
          </p>

          <h1
            className="
            text-primary
              font-bold
              leading-tight
              text-4xl
              sm:text-5xl
              lg:text-7xl
            "
          >
            Escape Into
            <br />
            Peace & Mountains
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              mx-auto
              text-white/90
              text-lg
              leading-8
            "
          >
            A boutique homestay experience in the
            heart of Uttarakhand where nature,
            comfort and calm come together.
          </p>

          <div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >
            <Link
              href="/booking"
              className="primary-btn"
            >
              Book Your Stay
            </Link>

            <Link
              href="/rooms"
              className="
               px-2
               py-1
               
               
                border
                border-white/30
                text-white
                backdrop-blur-md
                hover:bg-white/10
                transition-all
              "
            >
              Explore Rooms
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}