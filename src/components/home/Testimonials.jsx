import Image from "next/image";
import testimonials from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-12">

      <div className="container-custom">

        <div className="text-center mb-8">

          <p className="uppercase tracking-[3px] text-[var(--primary)] text-md">
            Guest Stories
          </p>

          <h2 className="heading-md mt-2">
            Guest Reviews
          </h2>

        </div>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-3
          "
        >

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="
              theme-card-2
              p-3
              hover:shadow-lg
              transition-all
              duration-300
              "
            >

              <div className="flex items-center gap-2">

                <Image
                  src={item.image}
                  width={40}
                  height={40}
                  alt={item.name}
                  className="
                  w-10
                  h-10
                  rounded-full
                  object-cover
                  "
                />

                <div className="min-w-0">

                  <h3 className="font-semibold  text-white text-sm truncate">
                    {item.name}
                  </h3>

                  <p className="text-[10px]  text-white truncate">
                    {item.location}
                  </p>

                </div>

              </div>

              <p
                className="
                text-xs
                text-white  
                leading-5
                mt-2
                line-clamp-2
                "
              >
                "{item.review}"
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}