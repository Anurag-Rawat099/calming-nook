"use client";

import Image from "next/image";
import Link from "next/link";

export default function PahadiCuisine() {
  return (
    <section className="section">

      <div className="container-custom">

        <div className="theme-card overflow-hidden">

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Image */}

            <div className="relative h-[280px] sm:h-[350px] lg:h-[450px]">

              <Image
                src="/images/about/pahadi-thali.png"
                alt="Pahadi Thali"
                fill
                className="object-cover"
              />

            </div>

            {/* Content */}

            <div className="p-6 lg:p-10">

              <p
                className="
                uppercase
                tracking-[5px]
                text-[var(--primary)]
                text-sm
                "
              >
                Local Cuisine
              </p>

              <h2
                className="
                text-3xl
                lg:text-5xl
                font-bold
                mt-4
                "
              >
                Authentic Pahadi Thali
              </h2>

              <p
                className="
                text-muted
                mt-6
                leading-8
                "
              >
                Experience the rich flavors of Uttarakhand
                through our traditional Pahadi Thali.
                Prepared using locally sourced ingredients,
                every meal reflects the culture, heritage,
                and warmth of mountain hospitality.
              </p>

              <div
                className="
                grid
                grid-cols-2
                gap-3
                mt-8
                "
              >

                <div className="theme-card p-4 text-center">
                  <h3 className="text-lg text-[var(--primary)]">
                    Mandua Roti
                  </h3>
                </div>

                <div className="theme-card p-4 text-center">
                  <h3 className="text-lg text-[var(--primary)]">
                    Rajma
                  </h3>
                </div>

                <div className="theme-card p-4 text-center">
                  <h3 className="text-lg text-[var(--primary)]">
                    Aloo Ke Gutke
                  </h3>
                </div>

                <div className="theme-card p-4 text-center">
                  <h3 className="text-lg text-[var(--primary)]">
                    Jhangora Kheer
                  </h3>
                </div>

              </div>

            

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}