"use client";

import Image from "next/image";
import gallery from "@/data/gallery";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function GalleryPage() {
  return (
    <main>
    <Navbar/>
      {/* Hero */}

      <section className="relative h-[28vh] mt-10 min-h-[220px] overflow-hidden">
  
        <div className="relative z-10 h-full flex items-center justify-center text-center">

          <div>

            <p className="uppercase tracking-[4px] text-[var(--primary)] text-lg">
              Explore Memories
            </p>

            <h1 className="text-primary text-3xl sm:text-4xl font-bold mt-3">
              Gallery
            </h1>

          </div>

        </div>

      </section>



      {/* Stats */}




      {/* Compact Cards */}

      <section className="pb-16">

        <div className="container-custom">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {gallery.map((item) => (

              <div
                key={item.id}
                className="
                relative
                h-[150px]
                sm:h-[180px]

                overflow-hidden
                rounded-[24px]

                group
                cursor-pointer

                transition-all
                duration-700

                hover:scale-[1.08]
                hover:-translate-y-2
                hover:z-20
                hover:shadow-2xl
                "
              >

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                  object-cover
                  duration-700
                  group-hover:scale-110
                  "
                />



                {/* Overlay */}

                <div
                  className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-transparent

                  p-3

                  flex
                  flex-col
                  justify-end
                  "
                >

                  <span
                    className="
                    w-fit
                    px-2
                    py-1

                    rounded-full

                    bg-white/20
                    backdrop-blur

                    text-white
                    text-[10px]
                    "
                  >

                    {item.category}

                  </span>



                  <h3
                    className="
                    text-white
                    text-sm
                    font-semibold
                    mt-2
                    "
                  >

                    {item.title}

                  </h3>



                  <p
                    className="
                    text-white/80
                    text-[11px]

                    mt-1

                    opacity-0
                    max-h-0

                    overflow-hidden

                    group-hover:max-h-[60px]
                    group-hover:opacity-100

                    transition-all
                    duration-500
                    "
                  >

                    {item.desc}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
   <Footer/>
    </main>
  );
}



function Stat({
  number,
  text
}) {
  return (

    <div className="
    theme-card
    py-4
    rounded-[20px]
    text-center
    ">

      <h3 className="
      text-lg
      font-bold
      text-[var(--primary)]
      ">

        {number}

      </h3>

      <p className="
      text-xs
      text-muted
      mt-1
      ">

        {text}

      </p>

    </div>

  );
}