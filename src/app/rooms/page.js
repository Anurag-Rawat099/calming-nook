import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import rooms from "@/data/rooms";

export default function RoomsPage() {
  return (
    <main>

      <Navbar />

      {/* Hero */}

      <section className="pt-26">

        <div className="container-custom text-center">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          text-3xl
          ">

            Our Rooms

          </p>

          <h1 className="
          heading-lg
          mt-5
          ">

            Stay In Comfort & Heritage

          </h1>

          <p className="
          text-muted
          mt-8
          max-w-3xl
          mx-auto
          ">

            Thoughtfully designed spaces with warmth,
            comfort and a peaceful atmosphere.

          </p>

        </div>

      </section>


      {/* Room Grid */}

      <section className="section pt-0">

        <div className="container-custom">

          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-8
          ">

            {rooms.map((room) => (

              <div
                key={room.id}
                className="
                theme-card
                overflow-hidden
                "
              >

                <div className="relative h-[280px]">

                  <Image
                    src={room.image}
                    fill
                    alt={room.title}
                    className="
                    object-cover
                    "
                  />

                </div>


                <div className="p-6">

                  <div className="
                  flex
                  justify-between
                  gap-3
                  items-start
                  ">

                    <h2 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    ">

                      {room.title}

                    </h2>

                    <span className="
                    text-[var(--primary)]
                    font-bold
                    whitespace-nowrap
                    ">

                      {room.price}/night

                    </span>

                  </div>


                  <p className="
                  text-muted
                  mt-5
                  ">

                    {room.desc}

                  </p>


                  <div className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                  ">

                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-[var(--paper-dark)]
                    text-sm
                    ">

                      Free Breakfast

                    </span>

                    <span className="
                    px-4
                    py-2
                    rounded-full
                    bg-[var(--paper-dark)]
                    text-sm
                    ">

                      Valley View

                    </span>

                  </div>


                  <button className="
                  primary-btn
                  mt-8
                  w-full
                  ">

                    Book This Room

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}