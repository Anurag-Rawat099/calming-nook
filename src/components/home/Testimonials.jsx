import Image from "next/image";
import testimonials from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section">

      <div className="container-custom">

        <div className="text-center max-w-2xl mx-auto">

          <p className="
          uppercase
          tracking-[6px]
          text-[var(--primary)]
          ">

            Guest Stories

          </p>

          <h2 className="
          heading-lg
          mt-5
          ">

            Memories Shared By Our Guests

          </h2>

          <p className="
          text-muted
          mt-6
          ">

            Experiences and moments guests carried home with them.

          </p>

        </div>


        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        mt-16
        
        ">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="theme-card "
            >

              <div className="flex items-center gap-4">

                <Image
                  src={item.image}
                  width={70}
                  height={70}
                  alt={item.name}
                  className="
                  h-[70px]
                  w-[70px]
                  rounded-full
                  object-cover
                  "
                />

                <div>

                  <h3 className="font-bold text-lg sm:text-xl">
                    {item.name}
                  </h3>

                  <p className="text-sm text-muted">
                    {item.location}
                  </p>

                </div>

              </div>


              <span className="
              inline-block
              mt-6
              px-4
              py-2
              rounded-full
              bg-[var(--paper-dark)]
              text-sm
              ">

                {item.stay}

              </span>


              <p className="
              text-muted
              mt-6
              ">

                "{item.review}"

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}