import Image from "next/image";
import rooms from "@/data/rooms";

export default function FeaturedRooms() {
  return (
    <section className="section">

      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          ">

            Featured Rooms

          </p>


          <h2 className="
          heading-lg
          mt-5
          ">

            Designed For Comfort

          </h2>

        </div>


        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-8
        mt-16
        ">

          {rooms.map((room)=>(

            <div
            key={room.id}
            className="
            theme-card
            overflow-hidden
            "
            >

              <div className="p-3">

                <Image
                  src={room.image}
                  width={500}
                  height={400}
                  alt={room.title}
                  className="
                  h-[280px]
                  w-full
                  rounded-[24px]
                  object-cover
                  "
                />

              </div>


              <div className="p-6">

                <div className="
                flex
                justify-between
                items-center
                gap-4
                ">

                  <h3 className="
                  text-xl
                  font-bold
                  ">

                    {room.title}

                  </h3>


                  <span className="
                  text-[var(--primary)]
                  font-bold
                  ">

                    {room.price}

                  </span>

                </div>


                <p className="
                text-muted
                mt-4
                ">

                  {room.desc}

                </p>


                <button className="
                primary-btn
                mt-6
                ">

                  View Room

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}