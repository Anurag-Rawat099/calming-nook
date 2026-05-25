import Image from "next/image";
import amenities from "@/data/amenities";

export default function Amenities() {
  return (
    <section className="section">

      <div className="container-custom">

        {/* Heading */}

        <div
          className="
          text-center
          max-w-2xl
          mx-auto
          "
        >

          <p
            className="
            uppercase
            tracking-[6px]
            text-[var(--primary)]
            text-2xl
            "
          >
            Experiences
          </p>


          <h2
            className="
            heading-lg
            mt-5
            "
          >
            Explore Beyond Your Stay
          </h2>

        </div>



        {/* Cards */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          mt-14
          justify-items-center
          "
        >

          {amenities.map((item) => (

            <div
              key={item.id}
              className="
              theme-card
              overflow-hidden

              max-w-[300px]
              w-full

              transition-all
              duration-300
              hover:-translate-y-2
              "
            >

              <div
                className="
                relative
                h-[190px]
                mx-3
                mt-3
                rounded-[18px]
                overflow-hidden
                "
              >

                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="
                  object-cover
                  hover:scale-110
                  transition
                  duration-700
                  "
                />

              </div>



              <div className="p-5">

                <h3
                  className="
                  text-lg
                  font-bold
                  "
                >
                  {item.title}
                </h3>



                <div
                  className="
                  flex
                  flex-wrap
                  gap-2
                  mt-3
                  "
                >

                  <span
                    className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-[var(--paper-dark)]
                    text-xs
                    "
                  >
                    {item.duration}
                  </span>


                  <span
                    className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-[var(--paper-dark)]
                    text-xs
                    "
                  >
                    {item.level}
                  </span>

                </div>


                <p
                  className="
                  text-sm
                  text-muted
                  mt-4
                  leading-6
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
  );
}