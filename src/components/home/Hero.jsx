"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full  h-fit p-4 pb-12 lg:pb-16 ">

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

      <div
        className="
  relative
  z-10
  h-full
  flex
  items-center
  justify-center

  pt-18
  sm:pt-22
  lg:pt-26

  px-4
  text-center
  "
      >

        <div className="max-w-4xl">

          <p
            className="
            uppercase
            tracking-[8px]
            text-white/80
            text-shadow-2xl
            text-3xl
            mb-6
            mt-[40px]
            "
          >
            Welcome To Calming Nook
          </p>

          <h1
            className="
            text-secondary
            font-bold
            leading-tight

            text-3xl
            sm:text-4xl
            lg:text-6xl
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
              px-8
              py-4
              rounded-full
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