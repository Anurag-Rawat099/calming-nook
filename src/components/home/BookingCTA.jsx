"use client";

import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="section pt-0">

      <div className="container-custom">

        <div
          className="
          relative
          overflow-hidden
          theme-card

          p-8
          sm:p-10
          lg:p-16

          text-center
          rounded-[32px]
          "
        >

          {/* Background Glow */}

          <div
            className="
            absolute
            -top-20
            -left-20
            h-52
            w-52
            rounded-full
            bg-[var(--primary)]/10
            blur-3xl
            "
          />

          <div
            className="
            absolute
            -bottom-20
            -right-20
            h-52
            w-52
            rounded-full
            bg-black/5
            blur-3xl
            "
          />



          <div className="relative z-10 max-w-3xl mx-auto">

            <p
              className="
              uppercase
              tracking-[6px]
              text-[var(--primary)]
              text-sm
              "
            >
              Reserve Your Escape
            </p>


            <h2
              className="
              heading-lg
              mt-5
              "
            >
              Slow Down & Stay A Little Longer
            </h2>


            <p
              className="
              text-muted
              mt-6
              leading-8
              "
            >
              Experience warm hospitality,
              scenic trails, peaceful mornings,
              and memorable evenings at
              Calming Nook.
            </p>



            <div
              className="
              flex
              flex-wrap
              justify-center
              gap-4
              mt-10
              "
            >

              <Link
                href="/booking"
                className="primary-btn"
              >
                Book Your Stay
              </Link>


              <Link
                href="/contact"
                className="secondary-btn"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}