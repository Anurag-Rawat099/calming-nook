import Image from "next/image";
import rooms from "@/data/rooms";

export default function FeaturedRooms() {
  return (
    <section className="section">

      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto">

          <p
            className="
            uppercase
            tracking-[6px]
            text-[var(--primary)]
            text-2xl
            "
          >
            Featured Rooms
          </p>

          <h2
            className="
            heading-md
            mt-4
            "
          >
            Designed For Comfort
          </h2>

        </div>



        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
          mt-14
          justify-items-center
          "
        >

          {rooms.map((room) => (

            <div
              key={room.id}
              className="
              theme-card
              overflow-hidden

              max-w-[320px]
              w-full

              transition-all
              duration-300
              hover:-translate-y-2
              "
            >

              <div className="p-3">

                <Image
                  src={room.image}
                  width={500}
                  height={400}
                  alt={room.title}
                  className="
                  h-[200px]
                  w-full
                  rounded-[18px]
                  object-cover
                  "
                />

              </div>


              <div className="p-5 ">

                <div
                  className="
                  flex
                  justify-between
                  items-start
                  gap-3
                  "
                >

                  <h3
                    className="
                    text-lg
                    font-bold
                    "
                  >
                    {room.title}
                  </h3>

                  <span
                    className="
                    text-sm
                    text-[var(--primary)]
                    font-bold
                    "
                  >
                    {room.price}
                  </span>

                </div>


                <p
                  className="
                  text-sm
                  text-muted
                  mt-3
                  leading-6
                  "
                >
                  {room.desc}
                </p>


                <div className="flex justify-center mt-5">
  <button
    className="
      primary-btn
      text-sm
      px-5
      py-3
    "
  >
    View Room
  </button>
</div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}