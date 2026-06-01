import Image from "next/image";
import experiences from "@/data/experiences";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function ExperiencesPage() {
  return (
    <main>
   <Navbar/>
      {/* Hero */}

      <section className="relative h-[45vh] sm:h-[52vh] mt-[60px] overflow-hidden">

        <Image
          src="/images/experiences/hiking.png"
          alt="Experiences"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">

          <div className="max-w-2xl">

            <p
              className="
              uppercase
              tracking-[4px]
              text-white/80
              text-xs
              sm:text-sm
              "
            >
              Explore Beyond Stay
            </p>

            <h1
              className="
              text-white
              font-bold
              mt-3

              text-3xl
              sm:text-4xl
              lg:text-5xl
              "
            >
              Experiences
            </h1>

            <p
              className="
              text-white/90
              mt-4
              text-sm
              sm:text-base
              leading-7
              "
            >
              Hiking trails, mountain views,
              camping, riverside walks and
              peaceful local experiences.
            </p>

          </div>

        </div>

      </section>



      {/* Experience Cards */}

      <section className="py-10 sm:py-14">

        <div className="container-custom">

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            "
          >

            {experiences.map((item) => (

              <div
                key={item.id}
                className="
                theme-card
                overflow-hidden
                group
               

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-xl
                "
              >

                {/* image */}

                <div
                  className="
                  relative
                  h-[180px]
                  sm:h-[230px]
                  overflow-hidden
                  "
                >

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                    object-cover
                    duration-500
                    group-hover:scale-110
                    "
                  />

                </div>



                {/* content */}

                <div className="p-2 ">

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-1
                    mb-1
                   
                    "
                  >

                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-[var(--paper-dark)]
                      text-[11px]
                      "
                    >
                      {item.duration}
                    </span>

                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-[var(--primary)]/10
                      text-[11px]
                      "
                    >
                      {item.level}
                    </span>

                  </div>

                  <h3
                    className="
                    font-bold
                    text-base
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                    text-muted
                    text-sm
                    mt-1
                    line-clamp-3
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
    <Footer/>
    </main>
  );
}