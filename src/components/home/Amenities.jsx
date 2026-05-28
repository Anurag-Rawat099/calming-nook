import Image from "next/image";
import amenities from "@/data/amenities";

export default function Amenities() {
  return (
    <section className="section overflow-hidden">

      <div className="container-custom">

        {/* Heading */}

        <div className="text-center max-w-2xl mx-auto">

          <p className="uppercase tracking-[6px] text-[var(--primary)] text-sm">
            Experiences
          </p>

          <h2 className="heading-md mt-5">
            Explore Beyond Your Stay
          </h2>

        </div>

        {/* Expanding Gallery */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          gap-4
          mt-16
          h-auto
          lg:h-[500px]
          "
        >

          {amenities.map((item) => (

            <div
              key={item.id}
              className="
              group
              relative
              flex-1
              overflow-hidden
              transition-all
              duration-700
              ease-in-out
              hover:flex-[4]
              min-h-[300px]
              lg:min-h-full
              cursor-pointer
              "
            >

              {/* Image */}

              <Image
                src={item.image}
                fill
                alt={item.title}
                className="
                object-cover
                transition-transform
                duration-700
                ease-in-out
                group-hover:scale-110
                "
              />

              {/* Dark Overlay */}

              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-black/30
                to-black/10
                "
              />

              {/* Default Content */}

              <div
                className="
                absolute
                bottom-7
                left-6
                z-10
                transition-all
                duration-500
                group-hover:opacity-0
                group-hover:translate-y-8
                "
              >

                <p className="text-white/70 text-xs uppercase tracking-[4px]">
                  {item.duration}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {item.title}
                </h3>

              </div>

              {/* Hover Content */}

              <div
                className="
                absolute
                inset-0
                z-20
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-6
                opacity-0
                translate-y-10
                transition-all
                duration-700
                group-hover:opacity-100
                group-hover:translate-y-0
                "
              >

                <span
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/15
                  backdrop-blur-md
                  text-white
                  text-xs
                  tracking-[3px]
                  uppercase
                  "
                >
                  {item.level}
                </span>

                <h3 className="text-white text-4xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-white/80 text-sm leading-7 mt-5 max-w-[320px]">
                  {item.desc}
                </p>

                <div className="flex gap-3 mt-6">

                  <span
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    text-xs
                    "
                  >
                    {item.duration}
                  </span>

                  <span
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    text-white
                    text-xs
                    "
                  >
                    {item.level}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}